import { Link } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { SiteLayout } from "../components/SiteLayout";
import { homeLinks, routes } from "../lib/site";

export function ShuttlePage() {
  return (
    <SiteLayout
      homeTo={routes.home}
      servicesTo={homeLinks.services}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#"
    >
      <main>
        <section className="hero hero--compact">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="hero__kicker">Shared shuttle service</p>
              <h1 className="hero__title">Comfortable shared routes between Costa Rica's main destinations</h1>
              <p className="hero__subtitle">
                Shuttles are ideal when you want a reliable and more affordable transfer between airports, hotels and major tourist areas.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#shuttle-details">See shuttle details</a>
                <a className="btn btn--ghost" href="#contact">Request shuttle</a>
              </div>
            </div>

            <div className="transport-highlight">
              <div className="transport-highlight__card">
                <p className="transport-highlight__eyebrow">Best for</p>
                <h3>Travelers on popular routes</h3>
                <p className="muted">A practical solution for common destinations like beaches, city hotels and airport connections.</p>
              </div>
              <div className="transport-highlight__card">
                <p className="transport-highlight__eyebrow">Main advantage</p>
                <h3>Better value for shared travel</h3>
                <p className="muted">You save on transport while still traveling in a comfortable tourist shuttle environment.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="shuttle-details">
          <div className="container">
            <div className="transport-grid transport-grid--single">
              <article className="transport-card">
                <span className="transport-card__tag">How it works</span>
                <h3>Scheduled shared transport</h3>
                <p className="muted">Shuttle service usually operates on common travel routes and may include coordinated pickup windows depending on the area.</p>
                <ul className="transport-list">
                  <li>Good for solo travelers, couples and small parties</li>
                  <li>Useful between high-demand destinations</li>
                  <li>Can be paired with hotels and tours</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="transport-grid">
              <article className="transport-card">
                <span className="transport-card__tag">Why choose shuttle</span>
                <h3>Best when your route is common and your schedule is flexible</h3>
                <p className="muted">Choose shuttle if you want a lower-cost ride and are traveling between destinations that already have regular shared service demand.</p>
                <ul className="transport-list">
                  <li>Good value for standard tourist routes</li>
                  <li>Useful for airport to hotel and hotel to hotel transfers</li>
                  <li>Works well when you do not need custom stops</li>
                </ul>
              </article>
              <article className="transport-card">
                <span className="transport-card__tag">Need more flexibility?</span>
                <h3>Private transport may fit better</h3>
                <p className="muted">If you are carrying more luggage, need a direct ride or want personalized pickup times, private transport is usually the better option.</p>
                <Link className="btn btn--ghost" to={routes.privateTransport}>Compare with private transport</Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <div className="benefit-grid">
              <article className="benefit-card">
                <h3>Lower transport cost</h3>
                <p className="muted">Shared rides usually cost less than booking a full private vehicle.</p>
              </article>
              <article className="benefit-card">
                <h3>Common destinations</h3>
                <p className="muted">A great option when moving between airports, San Jose, Jaco, beaches and other popular stops.</p>
              </article>
              <article className="benefit-card">
                <h3>Good for light planning</h3>
                <p className="muted">If your route is already clear, shuttle service can be a straightforward transport solution.</p>
              </article>
              <article className="benefit-card">
                <h3>Easy to combine</h3>
                <p className="muted">Use it together with tours, hotels and later private transfers if needed.</p>
              </article>
            </div>
          </div>
        </section>

        <ContactForm
          title="Request a shuttle quote"
          text="Send your pickup area, destination, travel date and number of travelers."
          placeholder="Example: We need a shuttle from San Jose to La Fortuna for 2 adults on June 14."
          buttonLabel="Send request"
        />
      </main>
    </SiteLayout>
  );
}
