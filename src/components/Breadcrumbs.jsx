import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { findTourBySlug, routes } from "../lib/site";

const routeLabels = {
  [routes.shuttle]: "Shuttle",
  [routes.privateTransport]: "Private Transport",
  [routes.tours]: "Tours",
  [routes.hotels]: "Hotels",
  [routes.rentACar]: "Rent a Car",
  [routes.privacy]: "Privacy Policy",
  [routes.thankYou]: "Thank you"
};

function getCrumbs(pathname) {
  if (pathname === routes.home) return [];

  if (pathname.startsWith(`${routes.tours}/`)) {
    const slug = pathname.slice(`${routes.tours}/`.length);
    const tour = findTourBySlug(slug);
    return [
      { label: "Tours", to: routes.tours },
      { label: tour?.title || "Tour details" }
    ];
  }

  return [{ label: routeLabels[pathname] || "Page not found" }];
}

export function Breadcrumbs({ items }) {
  const location = useLocation();
  const { t } = useLanguage();
  const crumbs = items || getCrumbs(location.pathname);

  if (!crumbs.length) return null;

  return (
    <nav className="breadcrumbs" aria-label={t("Breadcrumbs")}>
      <div className="container breadcrumbs__inner">
        <Link to={routes.home}>{t("Home")}</Link>
        {crumbs.map((item) => (
          <span className="breadcrumbs__item" key={`${item.to || ""}-${item.label}`}>
            <span aria-hidden="true">/</span>
            {item.to ? <Link to={item.to}>{t(item.label)}</Link> : <span aria-current="page">{t(item.label)}</span>}
          </span>
        ))}
      </div>
    </nav>
  );
}
