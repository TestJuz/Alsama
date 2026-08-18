import { Link } from "react-router-dom";
import { useState } from "react";
import { ContactForm } from "../components/ContactForm";
import { FeaturedToursSection } from "../components/FeaturedToursSection";
import { SiteLayout } from "../components/SiteLayout";
import {
  asset,
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

const travelSupportHighlights = [
  {
    tag: "Local",
    title: "One local team",
    text: "Hotels, transfers and activities coordinated as one easy trip."
  },
  {
    tag: "Flex",
    title: "Travel your way",
    text: "Start with a pickup, add hotels, or build a full vacation plan."
  },
  {
    tag: "Care",
    title: "Support on the road",
    text: "Clear help before arrival, between destinations and during your stay."
  }
];

const travelServices = [
  {
    title: "Private transportation",
    text: "Direct airport, hotel, beach and national park transfers.",
    image: asset("img/gallery/Buseta.webp"),
    alt: "Private transportation in Costa Rica",
    to: routes.privateTransport,
    cta: "View private transport",
    tag: "Door to door"
  },
  {
    title: "Shared shuttles",
    text: "Scheduled routes between Costa Rica's most visited destinations.",
    image: asset("img/gallery/Private.webp"),
    alt: "Shared shuttle travel in Costa Rica",
    to: routes.shuttle,
    cta: "View shuttle service",
    tag: "Popular routes"
  },
  {
    title: "Rent a car",
    text: "Vehicle options for independent beach, city and mountain travel.",
    image: asset("img/gallery/RentACar.webp"),
    imagePosition: "center 35%",
    alt: "Road trip route in Costa Rica",
    to: routes.rentACar,
    cta: "View rent a car options",
    tag: "Independent"
  },
  {
    title: "Vacation packages",
    text: "Hotels, transport and experiences arranged around your route.",
    image: asset("img/gallery/Vacation_packages.webp"),
    alt: "Costa Rica vacation package scenery",
    tag: "Multi-day"
  },
  {
    title: "Hotels and stays",
    text: "Lodging matched to your route, budget and travel style.",
    image: asset("img/hotels/Hotel_Manuel_Antonio.webp"),
    alt: "Hotel stay in Costa Rica",
    to: routes.hotels,
    cta: "View hotel options",
    tag: "Stays"
  },
  {
    title: "Day tours",
    text: "Beach, wildlife, rainforest and adventure days from key areas.",
    image: asset("img/gallery/Day_Tour.webp"),
    alt: "Tortuga Island day tour in Costa Rica",
    to: routes.tours,
    cta: "View tours options",
    tag: "Experiences"
  }
];
export function HomePage() {
  const [lightboxImage, setLightboxImage] = useState("");

  return (
    <SiteLayout
      homeTo={homeLinks.home}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#home"
    >
      <main id="home">
        <section className="hero hero--image hero--home" style={{ "--hero-image": `url(${homeHeroImages[0]})` }}>
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
            <div className="sectionHead sectionHead--visual">
              <div>
                <h2>Travel support beyond day tours</h2>
                <p className="muted">Local logistics with the warmth of a real Costa Rica vacation.</p>
              </div>
              <a className="btn btn--ghost" href="#contact">Plan my route</a>
            </div>

            <div className="features">
              {travelSupportHighlights.map((item) => (
                <article className="feature" key={item.title}>
                  <div className="feature__body">
                    <span className="feature__icon" aria-hidden="true">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p className="muted">{item.text}</p>
                  </div>
                </article>
              ))}
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
              {travelServices.map((service) => (
                <article className="service-card service-card--image" id={service.title === "Rent a car" ? "rent" : undefined} key={service.title}>
                  <div className="service-card__media">
                    <img src={service.image} alt={service.alt} style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined} />
                    <span>{service.tag}</span>
                  </div>
                  <div className="service-card__body">
                    <h3>{service.title}</h3>
                    <p className="muted">{service.text}</p>
                    {service.to ? (
                      <Link className="service-card__link" to={service.to}>{service.cta}</Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FeaturedToursSection
          sanJoseTours={sanJoseFeaturedTours}
          jacoTours={jacoFeaturedTours}
          sanJoseHref={`${routes.tours}#from-san-jose`}
          jacoHref={`${routes.tours}#from-jaco`}
        />

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
              <article className="rent-card rent-card--image">
                <img className="rent-card__media rent-card__media--economy" src={asset("img/gallery/Economy.webp")} alt="Economy rent a car option in Costa Rica" />
                <div className="rent-card__body">
                  <span className="rent-card__tag">Economy</span>
                  <h3>Compact city option</h3>
                  <p className="muted">Ideal for couples or solo travelers moving between San Jose, beaches and nearby towns.</p>
                  <ul className="rent-list">
                    <li>Fuel efficient</li>
                    <li>Easy parking</li>
                    <li>Best for paved routes</li>
                  </ul>
                </div>
              </article>
              <article className="rent-card rent-card--image">
                <img className="rent-card__media rent-card__media--suv" src={asset("img/gallery/Suv.webp")} alt="SUV rent a car option in Costa Rica" />
                <div className="rent-card__body">
                  <span className="rent-card__tag">SUV</span>
                  <h3>More space and comfort</h3>
                  <p className="muted">Recommended for families, luggage-heavy itineraries and longer transfers between destinations.</p>
                  <ul className="rent-list">
                    <li>More room for luggage</li>
                    <li>Comfort for long drives</li>
                    <li>Good all-around choice</li>
                  </ul>
                </div>
              </article>
              <article className="rent-card rent-card--image">
                <img className="rent-card__media" src={asset("img/gallery/4x4.webp")} alt="4x4 rent a car option in Costa Rica" />
                <div className="rent-card__body">
                  <span className="rent-card__tag">4x4</span>
                  <h3>Adventure-ready vehicle</h3>
                  <p className="muted">For routes that demand extra confidence during mountain, rain-season or rural travel.</p>
                  <ul className="rent-list">
                    <li>Better road clearance</li>
                    <li>Useful for remote areas</li>
                    <li>Great for flexible routes</li>
                  </ul>
                </div>
              </article>
              <article className="rent-card rent-card--image">
                <img className="rent-card__media" src={asset("img/gallery/van.webp")} alt="Van rent a car option in Costa Rica" />
                <div className="rent-card__body">
                  <span className="rent-card__tag">Van</span>
                  <h3>Group transportation</h3>
                  <p className="muted">A practical option for large families, private groups and vacation packages with extra luggage.</p>
                  <ul className="rent-list">
                    <li>More passenger capacity</li>
                    <li>Better for group trips</li>
                    <li>Fits shared itineraries</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>



        <ContactForm
          text="Tell us your travel dates, destinations and which services you need."
          placeholder="Tell us if you need tours, transportation, hotels, rent a car or a complete package."
        />

        <GalleryLightbox image={lightboxImage} onClose={() => setLightboxImage("")} />
      </main>
    </SiteLayout>
  );
}
