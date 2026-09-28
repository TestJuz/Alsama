import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { findTourBySlug, routes, stripLanguagePrefix } from "../lib/site";

const routeLabels = {
  [routes.shuttle]: "Shuttle",
  [routes.privateTransport]: "Private Transport",
  [routes.tours]: "Tours",
  [routes.hotels]: "Hotels",
  [routes.rentACar]: "Rent a Car",
  [routes.privacy]: "Privacy Policy",
  [routes.thankYou]: "Thank you",
  [routes.toursSanJose]: "Tours from San Jose",
  [routes.toursJaco]: "Tours from Jaco",
  [routes.manuelAntonioDestination]: "Manuel Antonio",
  [routes.arenalDestination]: "Arenal"
};

function getCrumbs(pathname) {
  const basePath = stripLanguagePrefix(pathname);
  if (basePath === routes.home) return [];

  if (basePath.startsWith(`${routes.tours}/`) && ![routes.toursSanJose, routes.toursJaco].includes(basePath)) {
    const slug = basePath.slice(`${routes.tours}/`.length);
    const tour = findTourBySlug(slug);
    return [
      { label: "Tours", to: routes.tours },
      { label: tour?.title || "Tour details" }
    ];
  }

  return [{ label: routeLabels[basePath] || "Page not found" }];
}

export function Breadcrumbs({ items }) {
  const location = useLocation();
  const { t, localize } = useLanguage();
  const crumbs = items || getCrumbs(location.pathname);

  if (!crumbs.length) return null;

  return (
    <nav className="breadcrumbs" aria-label={t("Breadcrumbs")}>
      <div className="container breadcrumbs__inner">
        <Link to={localize(routes.home)}>{t("Home")}</Link>
        {crumbs.map((item) => (
          <span className="breadcrumbs__item" key={`${item.to || ""}-${item.label}`}>
            <span aria-hidden="true">/</span>
            {item.to ? <Link to={localize(item.to)}>{t(item.label)}</Link> : <span aria-current="page">{t(item.label)}</span>}
          </span>
        ))}
      </div>
    </nav>
  );
}
