import { Link } from "react-router-dom";
import { ArrowRight, Compass, Home, MessageCircle } from "lucide-react";
import { SiteLayout } from "../components/SiteLayout";
import { asset, homeLinks, routes } from "../lib/site";

const helpfulLinks = [
  { label: "Tours", text: "Compare day tours from San Jose and Jaco.", to: routes.tours },
  { label: "Private Transport", text: "Plan direct airport, hotel and beach transfers.", to: routes.privateTransport },
  { label: "Hotels", text: "Browse lodging by Costa Rica travel zone.", to: routes.hotels }
];

export function NotFoundPage() {
  return (
    <SiteLayout
      homeTo={homeLinks.home}
      contactTo={homeLinks.contact}
      brandTo={routes.home}
      footerBackToTop="#not-found-top"
    >
      <main className="not-found-page" id="not-found-top">
        <section className="not-found-hero" style={{ "--not-found-image": `url(${asset("img/hero/2.webp")})` }}>
          <div className="container not-found-hero__inner">
            <span className="not-found-hero__code">404</span>
            <h1>This route wandered off.</h1>
            <p>
              The page you opened is not available, but we can still help you find tours, transport,
              hotels or a custom Costa Rica route.
            </p>
            <div className="not-found-hero__actions">
              <Link className="btn btn--primary" to={routes.home}>
                <Home size={17} aria-hidden="true" /> Back home
              </Link>
              <Link className="btn btn--ghost" to={routes.tours}>
                <Compass size={17} aria-hidden="true" /> Explore tours
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container not-found-links">
            {helpfulLinks.map((item) => (
              <Link className="not-found-card" key={item.to} to={item.to}>
                <strong>{item.label}</strong>
                <span>{item.text}</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="section section--alt">
          <div className="container not-found-cta">
            <div>
              <span>Need a quick answer?</span>
              <h2>Send us your route and we will point you the right way.</h2>
            </div>
            <Link className="btn btn--primary" to={homeLinks.contact}>
              Contact Alsama <MessageCircle size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
