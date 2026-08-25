import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { getPageTitle } from "./lib/nativeI18n";
import { routes } from "./lib/site";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const ShuttlePage = lazy(() => import("./pages/ShuttlePage").then((module) => ({ default: module.ShuttlePage })));
const PrivateTransportPage = lazy(() =>
  import("./pages/PrivateTransportPage").then((module) => ({ default: module.PrivateTransportPage }))
);
const RentACarPage = lazy(() => import("./pages/RentACarPage").then((module) => ({ default: module.RentACarPage })));
const ToursPage = lazy(() => import("./pages/ToursPage").then((module) => ({ default: module.ToursPage })));
const TourDetailPage = lazy(() => import("./pages/TourDetailPage").then((module) => ({ default: module.TourDetailPage })));
const HotelsPage = lazy(() => import("./pages/HotelsPage").then((module) => ({ default: module.HotelsPage })));
const PrivacyPolicyPage = lazy(() =>
  import("./pages/PrivacyPolicyPage").then((module) => ({ default: module.PrivacyPolicyPage }))
);

const routeTitles = [
  { path: routes.home, key: "home" },
  { path: routes.shuttle, key: "shuttle" },
  { path: routes.privateTransport, key: "privateTransport" },
  { path: routes.rentACar, key: "rentACar" },
  { path: routes.tours, key: "tours" },
  { path: `${routes.tours}/:tourSlug`, key: "tourDetail" },
  { path: routes.hotels, key: "hotels" },
  { path: routes.privacy, key: "privacy" }
];

function ScrollManager() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const titleKey = routeTitles.find((item) => item.path === location.pathname)?.key;
    if (titleKey) {
      document.title = getPageTitle(titleKey, language);
    }
  }, [language, location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const elementId = decodeURIComponent(location.hash.slice(1));
      window.setTimeout(() => {
        const target = document.getElementById(elementId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname, location.hash]);

  return null;
}
export function App() {
  return (
    <Suspense fallback={null}>
      <ScrollManager />
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.shuttle} element={<ShuttlePage />} />
        <Route path={routes.privateTransport} element={<PrivateTransportPage />} />
        <Route path={routes.rentACar} element={<RentACarPage />} />
        <Route path={routes.tours} element={<ToursPage />} />
        <Route path={`${routes.tours}/:tourSlug`} element={<TourDetailPage />} />
        <Route path={routes.hotels} element={<HotelsPage />} />
        <Route path={routes.privacy} element={<PrivacyPolicyPage />} />
        <Route path={routes.toursSanJose} element={<Navigate replace to={`${routes.tours}#from-san-jose`} />} />
        <Route path={routes.toursJaco} element={<Navigate replace to={`${routes.tours}#from-jaco`} />} />

        <Route path="/index.html" element={<Navigate replace to={routes.home} />} />
        <Route path="/Rent-A-Car/*" element={<Navigate replace to={routes.rentACar} />} />
        <Route path="/transport/shuttle.html" element={<Navigate replace to={routes.shuttle} />} />
        <Route path="/transport/private-transport.html" element={<Navigate replace to={routes.privateTransport} />} />
        <Route path="/tours/SanJose/*" element={<Navigate replace to={`${routes.tours}#from-san-jose`} />} />
        <Route path="/tours/Jaco/*" element={<Navigate replace to={`${routes.tours}#from-jaco`} />} />
        <Route path="*" element={<Navigate replace to={routes.home} />} />
      </Routes>
    </Suspense>
  );
}

