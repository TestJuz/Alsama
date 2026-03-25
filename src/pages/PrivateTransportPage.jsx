import { Link } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { SiteLayout } from "../components/SiteLayout";
import { homeLinks, routes } from "../lib/site";

export function PrivateTransportPage() {
  return (
    <SiteLayout
      homeTo={routes.home}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#"
    >
      <main>
        <section className="hero hero--compact">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="hero__kicker">Private transportation</p>
              <h1 className="hero__title">Direct transport for families, groups and custom itineraries</h1>
              <p className="hero__subtitle">
                Private transport gives you more flexibility with pickup times, direct routes, extra stops and a more personalized travel experience.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#private-details">See private transport details</a>
                <a className="btn btn--ghost" href="#contact">Request private transport</a>
              </div>
            </div>

            <div className="transport-highlight">
              <div className="transport-highlight__card">
                <p className="transport-highlight__eyebrow">Best for</p>
                <h3>Families and groups</h3>
                <p className="muted">Especially useful when you have children, more luggage or want a more direct and comfortable transfer.</p>
              </div>
              <div className="transport-highlight__card">
                <p className="transport-highlight__eyebrow">Main advantage</p>
                <h3>Flexible timing and route</h3>
                <p className="muted">You choose the pickup details and travel in a dedicated vehicle without sharing space with other passengers.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="private-details">
          <div className="container">
            <div className="transport-grid transport-grid--single">
              <article className="transport-card">
                <span className="transport-card__tag">How it works</span>
                <h3>Custom point-to-point service</h3>
                <p className="muted">Private transportation is arranged around your itinerary and is ideal for airport pickups, hotel transfers and multi-stop routes.</p>
                <ul className="transport-list">
                  <li>Flexible pickup time and location</li>
                  <li>Direct route or customized stops</li>
                  <li>More private and comfortable experience</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="transport-grid">
              <article className="transport-card">
                <span className="transport-card__tag">Why choose private</span>
                <h3>Best when you want direct service and more control</h3>
                <p className="muted">Private transport is ideal when you need custom pickup times, more comfort, extra luggage space or multi-stop routing.</p>
                <ul className="transport-list">
                  <li>Great for families, groups and custom itineraries</li>
                  <li>Useful when arrival times do not fit shuttle schedules</li>
                  <li>Recommended for travelers who want a direct ride</li>
                </ul>
              </article>
              <article className="transport-card">
                <span className="transport-card__tag">Need a lower-cost option?</span>
                <h3>Shuttle may fit better</h3>
                <p className="muted">If you are traveling light on a common route and prefer a more budget-friendly transfer, shared shuttle service can be the better match.</p>
                <Link className="btn btn--ghost" to={routes.shuttle}>Compare with shuttle</Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <div className="benefit-grid">
              <article className="benefit-card">
                <h3>Direct service</h3>
                <p className="muted">Travel directly to your destination without waiting for other stops or shared scheduling.</p>
              </article>
              <article className="benefit-card">
                <h3>Great for custom routes</h3>
                <p className="muted">Perfect when your trip includes several hotels, attractions or personalized arrival times.</p>
              </article>
              <article className="benefit-card">
                <h3>Better for more luggage</h3>
                <p className="muted">A more practical option for families, long vacations and travelers carrying extra bags.</p>
              </article>
              <article className="benefit-card">
                <h3>Easy to bundle</h3>
                <p className="muted">Private transport can be combined with tours, hotels, rent a car and full vacation planning.</p>
              </article>
            </div>
          </div>
        </section>

        <ContactForm
          title="Request private transport"
          text="Tell us your route, dates, group size and any extra stops you want to include."
          placeholder="Example: We need private transport from Liberia airport to Tamarindo with one grocery stop for 6 passengers."
          buttonLabel="Send request"
        />
      </main>
    </SiteLayout>
  );
}
