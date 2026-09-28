import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { applySeo, getRouteSeo } from "./lib/seo";
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
const ThankYouPage = lazy(() => import("./pages/ThankYouPage").then((module) => ({ default: module.ThankYouPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));
const DestinationLandingPage = lazy(() => import("./pages/DestinationLandingPage").then((module) => ({ default: module.DestinationLandingPage })));
const TravelGuidePage = lazy(() => import("./pages/TravelGuidePage").then((module) => ({ default: module.TravelGuidePage })));


function ScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectedPath = params.get("p");
    if (redirectedPath) {
      const normalized = `/${redirectedPath}`
        .replace(/\\+/g, "/")
        .replace(/\/index\.html$/i, "")
        .replace(/\/{2,}/g, "/");
      const pathname = normalized || "/";
      const hash = params.get("h");
      navigate({ pathname, hash: hash ? `#${hash}` : "" }, { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    applySeo(getRouteSeo(location.pathname, language));
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

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [location.pathname, location.hash]);

  return null;
}
function LegacyTourRedirect() {
  const { tourSlug } = useParams();
  return <Navigate replace to={`${routes.tours}/${tourSlug}`} />;
}

export function App() {
  return (
    <Suspense fallback={null}>
      <ScrollManager />
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path="/inicio" element={<Navigate replace to={routes.home} />} />
        <Route path={routes.shuttle} element={<ShuttlePage />} />
        <Route path={routes.privateTransport} element={<PrivateTransportPage />} />
        <Route path={routes.rentACar} element={<RentACarPage />} />
        <Route path={routes.tours} element={<ToursPage />} />
        <Route path={`${routes.tours}/:tourSlug`} element={<TourDetailPage />} />
        <Route path={routes.hotels} element={<HotelsPage />} />
        <Route path={routes.privacy} element={<PrivacyPolicyPage />} />
        <Route path={routes.thankYou} element={<ThankYouPage />} />
        <Route path={routes.toursSanJose} element={<DestinationLandingPage />} />
        <Route path={routes.toursJaco} element={<DestinationLandingPage />} />
        <Route path={routes.manuelAntonioDestination} element={<DestinationLandingPage />} />
        <Route path={routes.arenalDestination} element={<DestinationLandingPage />} />
        <Route path={routes.privateTransferGuide} element={<TravelGuidePage />} />
        <Route path={routes.sjoAirportGuide} element={<TravelGuidePage />} />

        <Route path="/es" element={<HomePage />} />
        <Route path="/fr" element={<HomePage />} />
        <Route path="/es/shuttle" element={<ShuttlePage />} />
        <Route path="/fr/shuttle" element={<ShuttlePage />} />
        <Route path="/es/private-transport" element={<PrivateTransportPage />} />
        <Route path="/fr/private-transport" element={<PrivateTransportPage />} />
        <Route path="/es/rent-a-car" element={<RentACarPage />} />
        <Route path="/fr/rent-a-car" element={<RentACarPage />} />
        <Route path="/es/hotels" element={<HotelsPage />} />
        <Route path="/fr/hotels" element={<HotelsPage />} />
        <Route path="/es/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/fr/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/es/thank-you" element={<ThankYouPage />} />
        <Route path="/fr/thank-you" element={<ThankYouPage />} />
        <Route path="/es/tours" element={<ToursPage />} />
        <Route path="/fr/tours" element={<ToursPage />} />
        <Route path="/es/tours/san-jose" element={<DestinationLandingPage />} />
        <Route path="/fr/tours/san-jose" element={<DestinationLandingPage />} />
        <Route path="/es/tours/jaco" element={<DestinationLandingPage />} />
        <Route path="/fr/tours/jaco" element={<DestinationLandingPage />} />
        <Route path="/es/destinations/manuel-antonio" element={<DestinationLandingPage />} />
        <Route path="/fr/destinations/manuel-antonio" element={<DestinationLandingPage />} />
        <Route path="/es/destinations/arenal" element={<DestinationLandingPage />} />
        <Route path="/fr/destinations/arenal" element={<DestinationLandingPage />} />
        <Route path="/es/guides/costa-rica-private-transfers" element={<TravelGuidePage />} />
        <Route path="/fr/guides/costa-rica-private-transfers" element={<TravelGuidePage />} />
        <Route path="/es/guides/sjo-airport-transportation" element={<TravelGuidePage />} />
        <Route path="/fr/guides/sjo-airport-transportation" element={<TravelGuidePage />} />
        <Route path="/es/tours/:tourSlug" element={<TourDetailPage />} />
        <Route path="/fr/tours/:tourSlug" element={<TourDetailPage />} />

        <Route path="/index.html" element={<Navigate replace to={routes.home} />} />
        <Route path="/trip/:tourSlug" element={<LegacyTourRedirect />} />
        <Route path="/transport" element={<Navigate replace to={routes.privateTransport} />} />
        <Route path="/transporte" element={<Navigate replace to={routes.privateTransport} />} />
        <Route path="/Rent-A-Car/*" element={<Navigate replace to={routes.rentACar} />} />
        <Route path="/transport/shuttle.html" element={<Navigate replace to={routes.shuttle} />} />
        <Route path="/transport/private-transport.html" element={<Navigate replace to={routes.privateTransport} />} />
        <Route path="/tours/SanJose/*" element={<Navigate replace to={`${routes.tours}#from-san-jose`} />} />
        <Route path="/tours/Jaco/*" element={<Navigate replace to={`${routes.tours}#from-jaco`} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
