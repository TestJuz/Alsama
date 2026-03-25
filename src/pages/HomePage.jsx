import { Link } from "react-router-dom";
import { useState } from "react";
import { ContactForm } from "../components/ContactForm";
import { FeaturedToursSection } from "../components/FeaturedToursSection";
import { SiteLayout } from "../components/SiteLayout";
import {
  homeLinks,
  homeGalleryImages,
  homeHeroImages,
  jacoFeaturedTours,
  routes,
  sanJoseFeaturedTours,
} from "../lib/site";

function GalleryLightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="lightbox" aria-hidden="false" onClick={onClose}>
      <button className="lightbox__close" type="button" aria-label="Close" onClick={onClose}>x</button>
      <img className="lightbox__img" src={image} alt="" onClick={(event) => event.stopPropagation()} />
    </div>
  );
}

export function HomePage() {
  const [lightboxImage, setLightboxImage] = useState("");

  return (
    <SiteLayout
      homeTo={homeLinks.home}
      servicesTo="#services"
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#home"
    >
      <main id="home">
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="hero__kicker">Costa Rica travel services</p>
              <h1 className="hero__title">Discover the best of our country</h1>
              <p className="hero__subtitle">
                Tours, hotels, shuttles, transfers and more - build your itinerary in minutes.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#services">Explore services</a>
                <a className="btn btn--ghost" href="#contact">Get a quote</a>
              </div>
            </div>

            <div className="hero__media" aria-hidden="true">
              <div className="hero__card">
                <img src={homeHeroImages[0]} className="hero__img" alt="Costa Rica transport service" />
                <img src={homeHeroImages[1]} className="hero__img hero__img--2" alt="Costa Rica hotel and shuttle service" />
                <img src={homeHeroImages[2]} className="hero__img hero__img--3" alt="Costa Rica tours and travel planning" />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container intro-strip">
            <p className="muted">
              We coordinate the key parts of your trip so you can move easily between destinations and book everything with one local company.
            </p>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container split">
            <div>
              <h2>Experience Costa Rica your way</h2>
              <p className="muted">
                From family vacations to private transfers and multi-day itineraries, we build travel plans around how you want to experience the country.
              </p>
            </div>
            <div className="mini-gallery" aria-hidden="true">
              {homeGalleryImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  onClick={() => setLightboxImage(image)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>Travel support beyond day tours</h2>
            <p className="muted">Flexible logistics, trusted partners and one point of contact for your trip.</p>

            <div className="features">
              <article className="feature">
                <div className="feature__icon" aria-hidden="true">Local</div>
                <h3>Local coordination</h3>
                <p className="muted">We help organize transportation, lodging and activities in one itinerary.</p>
              </article>

              <article className="feature">
                <div className="feature__icon" aria-hidden="true">Flex</div>
                <h3>Flexible service mix</h3>
                <p className="muted">Book only what you need, from an airport pickup to a complete vacation package.</p>
              </article>

              <article className="feature">
                <div className="feature__icon" aria-hidden="true">Care</div>
                <h3>Reliable assistance</h3>
                <p className="muted">Clear communication before arrival, during transfers and throughout your stay.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--alt" id="services">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Our travel services</h2>
                <p className="muted">Designed for travelers who want more than a single excursion.</p>
              </div>
            </div>

            <div className="services-grid">
              <article className="service-card">
                <h3>Private transportation</h3>
                <p className="muted">Point-to-point transfers between airports, hotels, beaches and national parks.</p>
                <Link className="service-card__link" to={routes.privateTransport}>View private transport</Link>
              </article>
              <article className="service-card">
                <h3>Shared shuttles</h3>
                <p className="muted">Comfortable scheduled routes for travelers moving between the most popular destinations.</p>
                <Link className="service-card__link" to={routes.shuttle}>View shuttle service</Link>
              </article>
              <article className="service-card" id="rent">
                <h3>Rent a car</h3>
                <p className="muted">Vehicle options for independent travel with support on delivery and trip planning.</p>
                <Link className="service-card__link" to={routes.rentACar}>View rent a car options</Link>
              </article>
              <article className="service-card">
                <h3>Vacation packages</h3>
                <p className="muted">Combine hotels, transportation and experiences into one organized itinerary.</p>
              </article>
              <article className="service-card">
                <h3>Hotels and stays</h3>
                <p className="muted">Lodging recommendations and reservations matched to your route and budget.</p>
              </article>
              <article className="service-card">
                <h3>Day tours</h3>
                <p className="muted">Curated activities departing from San Jose, Jaco and other key areas.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Transport in Costa Rica</h2>
                <p className="muted">Compare shared shuttles and private transportation before choosing the best fit for your itinerary.</p>
              </div>
            </div>

            <div className="transport-grid">
              <article className="transport-card">
                <span className="transport-card__tag">Shuttle</span>
                <h3>Shared destination-to-destination service</h3>
                <p className="muted">A practical option for travelers using common tourist routes and looking for a more affordable transfer.</p>
                <ul className="transport-list">
                  <li>Popular routes</li>
                  <li>Comfortable shared ride</li>
                  <li>Good value for simple transfers</li>
                </ul>
                <Link className="btn btn--ghost" to={routes.shuttle}>See shuttle details</Link>
              </article>
              <article className="transport-card">
                <span className="transport-card__tag">Private Transport</span>
                <h3>Direct pickup with more flexibility</h3>
                <p className="muted">Recommended for families, groups, airport arrivals, custom schedules and multi-stop routes.</p>
                <ul className="transport-list">
                  <li>Custom pickup time</li>
                  <li>Direct service</li>
                  <li>Better for groups and luggage</li>
                </ul>
                <Link className="btn btn--ghost" to={routes.privateTransport}>See private transport</Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="rent-preview">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Rent a Car in Costa Rica</h2>
                <p className="muted">Choose the vehicle type that fits your route, group size and travel style.</p>
              </div>
              <Link className="btn btn--ghost" to={routes.rentACar}>Full rent a car page</Link>
            </div>

            <div className="rent-grid">
              <article className="rent-card">
                <span className="rent-card__tag">Economy</span>
                <h3>Compact city option</h3>
                <p className="muted">Ideal for couples or solo travelers moving between San Jose, beaches and nearby towns.</p>
                <ul className="rent-list">
                  <li>Fuel efficient</li>
                  <li>Easy parking</li>
                  <li>Best for paved routes</li>
                </ul>
              </article>
              <article className="rent-card">
                <span className="rent-card__tag">SUV</span>
                <h3>More space and comfort</h3>
                <p className="muted">Recommended for families, luggage-heavy itineraries and longer transfers between destinations.</p>
                <ul className="rent-list">
                  <li>More room for luggage</li>
                  <li>Comfort for long drives</li>
                  <li>Good all-around choice</li>
                </ul>
              </article>
              <article className="rent-card">
                <span className="rent-card__tag">4x4</span>
                <h3>Adventure-ready vehicle</h3>
                <p className="muted">For routes that demand extra confidence during mountain, rain-season or rural travel.</p>
                <ul className="rent-list">
                  <li>Better road clearance</li>
                  <li>Useful for remote areas</li>
                  <li>Great for flexible routes</li>
                </ul>
              </article>
              <article className="rent-card">
                <span className="rent-card__tag">Van</span>
                <h3>Group transportation</h3>
                <p className="muted">A practical option for large families, private groups and vacation packages with extra luggage.</p>
                <ul className="rent-list">
                  <li>More passenger capacity</li>
                  <li>Better for group trips</li>
                  <li>Fits shared itineraries</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <FeaturedToursSection
          sanJoseTours={sanJoseFeaturedTours}
          jacoTours={jacoFeaturedTours}
          sanJoseHref={routes.toursSanJose}
          jacoHref={routes.toursJaco}
        />

        <ContactForm
          text="Tell us your travel dates, destinations and which services you need."
          placeholder="Tell us if you need tours, transportation, hotels, rent a car or a complete package."
        />

        <GalleryLightbox image={lightboxImage} onClose={() => setLightboxImage("")} />
      </main>
    </SiteLayout>
  );
}
