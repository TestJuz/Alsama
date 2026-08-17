import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
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

const routeTitles = [
  {
    path: routes.home,
    title: {
      en: "Alsama Tours | Travel Services in Costa Rica",
      es: "Alsama Tours | Servicios de viaje en Costa Rica",
      fr: "Alsama Tours | Services de voyage au Costa Rica"
    }
  },
  {
    path: routes.shuttle,
    title: {
      en: "Shuttle Service | Alsama Tours",
      es: "Servicio de shuttle | Alsama Tours",
      fr: "Service de navette | Alsama Tours"
    }
  },
  {
    path: routes.privateTransport,
    title: {
      en: "Private Transport | Alsama Tours",
      es: "Transporte privado | Alsama Tours",
      fr: "Transport prive | Alsama Tours"
    }
  },
  {
    path: routes.rentACar,
    title: {
      en: "Rent a Car | Alsama Tours",
      es: "Alquiler de autos | Alsama Tours",
      fr: "Location de voiture | Alsama Tours"
    }
  },
  {
    path: routes.tours,
    title: {
      en: "Tours | Alsama Tours",
      es: "Tours | Alsama Tours",
      fr: "Excursions | Alsama Tours"
    }
  },
  {
    path: `${routes.tours}/:tourSlug`,
    title: {
      en: "Tour Detail | Alsama Tours",
      es: "Detalle del tour | Alsama Tours",
      fr: "Detail de l'excursion | Alsama Tours"
    }
  },
  {
    path: routes.hotels,
    title: {
      en: "Hotels | Alsama Tours",
      es: "Hoteles | Alsama Tours",
      fr: "Hotels | Alsama Tours"
    }
  }
];

function ScrollManager() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const nextTitle = routeTitles.find((item) => item.path === location.pathname)?.title?.[language];
    if (nextTitle) {
      document.title = nextTitle;
    }

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
  }, [language, location.pathname, location.hash]);

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
