import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { CartWidget } from "./CartWidget";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TravelAssistant } from "./TravelAssistant";
import { asset, homeLinks, routes, safetyPdf, serviceMenu } from "../lib/site";


function SmartLink({ to, className, children, ...props }) {
  if (typeof to === "string" && to.startsWith("#")) {
    return <a className={className} href={to} {...props}>{children}</a>;
  }

  return <Link className={className} to={to} {...props}>{children}</Link>;
}

function Navigation({ homeTo, safetyHref, contactTo, brandTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      const clickedToggle = toggleRef.current?.contains(event.target);
      const clickedMenu = menuRef.current?.contains(event.target);
      if (!clickedToggle && !clickedMenu) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" to={brandTo}>
          <span className="brand__logo" aria-hidden="true">
            <img src={asset("img/tortuga.png")} alt="Alsama Tours logo" className="brand__logo-img" />
          </span>
          <span className="brand__text">Alsama Tours</span>
        </Link>

        <button
          ref={toggleRef}
          className="nav__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="navMenu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          Menu
        </button>

        <nav ref={menuRef} className="nav__menu" id="navMenu" data-open={menuOpen ? "true" : "false"}>
          <SmartLink to={homeTo} className="nav__link">Home</SmartLink>

          <div ref={dropdownRef} className="nav__dropdown" data-dropdown data-open={dropdownOpen ? "true" : undefined}>
            <button
              className="nav__link nav__dropdownBtn"
              type="button"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((value) => !value)}
            >
              Services <span aria-hidden="true">+</span>
            </button>
            <div className="nav__dropdownMenu" role="menu">
              {serviceMenu.map((item) => (
                <Link key={item.to} role="menuitem" to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <a className="nav__link" href={safetyHref} target="_blank" rel="noreferrer">Safety</a>
          <div className="nav__mobileActions">
            <SmartLink to={contactTo} className="nav__link nav__cta">Contact</SmartLink>
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="nav__actions">
          <SmartLink to={contactTo} className="nav__link nav__cta">Contact</SmartLink>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export function SiteLayout({
  children,
  homeTo = homeLinks.home,
  safetyHref = safetyPdf,
  contactTo = "#contact",
  brandTo = routes.home,
  footerBackToTop = "#",
  footerLabel = "Copyright",
  showBreadcrumbs = true
}) {
  return (
    <>
      <Navigation
        homeTo={homeTo}
        safetyHref={safetyHref}
        contactTo={contactTo}
        brandTo={brandTo}
      />
      <TravelAssistant />
      <CartWidget />
      {showBreadcrumbs ? <Breadcrumbs /> : null}
      {children}
      <footer className="footer">
        <div className="container footer__grid">
          <p className="muted">{footerLabel} {new Date().getFullYear()} Alsama Tours. All rights reserved.</p>
          <nav className="footer__links" aria-label="Footer">
            <Link className="muted" to={routes.privacy}>Privacy Policy</Link>
            <a className="muted" href={footerBackToTop}>Back to top</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
