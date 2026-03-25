import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./lib/site";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const ShuttlePage = lazy(() => import("./pages/ShuttlePage").then((module) => ({ default: module.ShuttlePage })));
const PrivateTransportPage = lazy(() =>
  import("./pages/PrivateTransportPage").then((module) => ({ default: module.PrivateTransportPage }))
);
const RentACarPage = lazy(() => import("./pages/RentACarPage").then((module) => ({ default: module.RentACarPage })));
const SanJoseToursPage = lazy(() =>
  import("./pages/SanJoseToursPage").then((module) => ({ default: module.SanJoseToursPage }))
);
const JacoToursPage = lazy(() => import("./pages/JacoToursPage").then((module) => ({ default: module.JacoToursPage })));

const routeTitles = [
  { path: routes.home, title: "Alsama Tours | Travel Services in Costa Rica" },
  { path: routes.shuttle, title: "Shuttle Service | Alsama Tours" },
  { path: routes.privateTransport, title: "Private Transport | Alsama Tours" },
  { path: routes.rentACar, title: "Rent a Car | Alsama Tours" },
  { path: routes.toursSanJose, title: "San Jose Travel Services | Alsama Tours" },
  { path: routes.toursJaco, title: "Jaco Travel Services | Alsama Tours" }
];

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const nextTitle = routeTitles.find((item) => item.path === location.pathname)?.title;
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
        <Route path={routes.toursSanJose} element={<SanJoseToursPage />} />
        <Route path={routes.toursJaco} element={<JacoToursPage />} />

        <Route path="/index.html" element={<Navigate replace to={routes.home} />} />
        <Route path="/Rent-A-Car/*" element={<Navigate replace to={routes.rentACar} />} />
        <Route path="/transport/shuttle.html" element={<Navigate replace to={routes.shuttle} />} />
        <Route path="/transport/private-transport.html" element={<Navigate replace to={routes.privateTransport} />} />
        <Route path="/tours/SanJose/*" element={<Navigate replace to={routes.toursSanJose} />} />
        <Route path="/tours/Jaco/*" element={<Navigate replace to={routes.toursJaco} />} />
        <Route path="*" element={<Navigate replace to={routes.home} />} />
      </Routes>
    </Suspense>
  );
}
