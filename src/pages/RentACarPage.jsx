import { ContactForm } from "../components/ContactForm";
import { RentACarRates } from "../components/RentACarRates";
import { SiteLayout } from "../components/SiteLayout";
import { routes } from "../lib/site";

export function RentACarPage() {
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
              <p className="hero__kicker">Independent travel support</p>
              <h1 className="hero__title">Rent a car with local guidance for your Costa Rica route</h1>
              <p className="hero__subtitle">
                We help you choose the right vehicle for beaches, cities, mountain routes or multi-destination itineraries, with support on planning and delivery coordination.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#fleet">See vehicle categories</a>
                <a className="btn btn--ghost" href="#rates">Compare rates</a>
                <a className="btn btn--ghost" href="#contact">Request a quote</a>
              </div>
            </div>

            <div className="rent-highlight">
              <div className="rent-highlight__card">
                <p className="rent-highlight__eyebrow">Best for</p>
                <h3>Flexible travelers</h3>
                <p className="muted">Perfect if you want to move at your own pace between hotels, beaches, parks and tours.</p>
              </div>
              <div className="rent-highlight__card">
                <p className="rent-highlight__eyebrow">Helpful add-ons</p>
                <h3>Delivery, route advice and trip support</h3>
                <p className="muted">Ask for car options that match your destinations, passengers and luggage.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="fleet">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Vehicle categories</h2>
                <p className="muted">Examples of the type of vehicle you can request according to your trip needs.</p>
              </div>
            </div>

            <div className="rent-grid">
              <article className="rent-card">
                <span className="rent-card__tag">Economy</span>
                <h3>Compact and efficient</h3>
                <p className="muted">Good for city stays, couples and travelers following mostly paved routes.</p>
                <ul className="rent-list">
                  <li>Easy handling</li>
                  <li>Lower fuel consumption</li>
                  <li>Ideal for light luggage</li>
                </ul>
              </article>
              <article className="rent-card">
                <span className="rent-card__tag">SUV</span>
                <h3>Extra comfort and luggage space</h3>
                <p className="muted">Recommended for families and longer routes between several destinations.</p>
                <ul className="rent-list">
                  <li>Comfortable for road trips</li>
                  <li>More luggage capacity</li>
                  <li>Versatile for mixed routes</li>
                </ul>
              </article>
              <article className="rent-card">
                <span className="rent-card__tag">4x4</span>
                <h3>More confidence for remote routes</h3>
                <p className="muted">Useful for travelers heading to rural areas or wanting more flexibility in changing conditions.</p>
                <ul className="rent-list">
                  <li>Better for uneven roads</li>
                  <li>Useful in rainy season</li>
                  <li>Popular for adventure itineraries</li>
                </ul>
              </article>
              <article className="rent-card">
                <span className="rent-card__tag">Van</span>
                <h3>Groups and shared itineraries</h3>
                <p className="muted">Practical for family groups, airport arrivals with luggage and multi-stop vacations.</p>
                <ul className="rent-list">
                  <li>More passenger capacity</li>
                  <li>Group-friendly option</li>
                  <li>Good for complete vacation packages</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <RentACarRates />

        <section className="section section--alt">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>What we help you coordinate</h2>
                <p className="muted">The car is one part of the trip. We can also help with the rest.</p>
              </div>
            </div>

            <div className="benefit-grid">
              <article className="benefit-card">
                <h3>Delivery coordination</h3>
                <p className="muted">Ask about airport, hotel or agreed pickup locations depending on your route.</p>
              </article>
              <article className="benefit-card">
                <h3>Trip matching</h3>
                <p className="muted">We help align the vehicle type with beaches, volcanoes, mountain roads and family travel.</p>
              </article>
              <article className="benefit-card">
                <h3>Combined services</h3>
                <p className="muted">Pair your rental with hotels, private transfers, shuttles or tours before and after the drive.</p>
              </article>
              <article className="benefit-card">
                <h3>Clear planning</h3>
                <p className="muted">Share your route, number of travelers and luggage so we can guide you to the best option.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container rent-requirements">
            <div>
              <h2>Before requesting your quote</h2>
              <p className="muted">Send these details so we can respond faster and with a better recommendation.</p>
            </div>
            <div className="requirement-box">
              <ul className="rent-list">
                <li>Pickup and return dates</li>
                <li>Arrival area or hotel</li>
                <li>Number of passengers and luggage</li>
                <li>Main destinations you plan to visit</li>
                <li>Preferred vehicle type if you already know it</li>
              </ul>
            </div>
          </div>
        </section>

        <ContactForm
          title="Request your rent a car quote"
          text="Tell us your dates, route and vehicle needs. We can also add hotels, transfers or tours."
          placeholder="Example: We need an SUV from San Jose airport for 6 days, 4 passengers, visiting La Fortuna and Manuel Antonio."
          buttonLabel="Send request"
        />
      </main>
    </SiteLayout>
  );
}
