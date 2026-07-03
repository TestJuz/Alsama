import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { SiteLayout } from "../components/SiteLayout";
import { TourBookingModal } from "../components/TourBookingModal";
import { useCart } from "../context/CartContext";
import { findTourBySlug, getAllTours, getTourDetailPath, routes } from "../lib/site";

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function uniqueImages(images) {
  return [...new Set(images.filter(Boolean))];
}


export function TourDetailPage() {
  const { tourSlug } = useParams();
  const { addItem } = useCart();
  const [bookingOpen, setBookingOpen] = useState(false);
  const tour = findTourBySlug(tourSlug);

  useEffect(() => {
    if (tour) {
      document.title = `${tour.title} | Alsama Tours`;
    }
  }, [tour]);

  if (!tour) {
    return <Navigate replace to={routes.tours} />;
  }

  const relatedTours = getAllTours()
    .filter((item) => item.slug !== tour.slug)
    .filter((item) => item.origin === tour.origin || item.locations.some((place) => tour.locations.includes(place)))
    .slice(0, 3);
  const fallbackRelated = getAllTours().filter((item) => item.slug !== tour.slug).slice(0, 3);
  const related = relatedTours.length ? relatedTours : fallbackRelated;
  const gallery = uniqueImages([tour.image, ...(tour.gallery || []), ...related.map((item) => item.image)]).slice(0, 4);
  const detail = tour.detail;

  function addTourToCart(cartItem) {
    addItem(cartItem);
    setBookingOpen(false);
  }

  return (
    <SiteLayout
      homeTo={routes.home}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#top"
    >
      <main className="tour-detail" id="top">
        <section className="tour-detail-hero" style={{ "--tour-hero-image": `url(${tour.image})` }}>
          <div className="container tour-detail-hero__content">
            <div className="tour-breadcrumbs">
              <Link to={routes.tours}>Tours</Link>
              <span>/</span>
              <span>{tour.title}</span>
            </div>
            <p className="tour-detail-hero__eyebrow">{tour.originLabel}</p>
            <h1>{tour.title}</h1>
            <p>{detail.subtitle}</p>
            <div className="tour-detail-hero__meta" aria-label="Tour details">
              <span>{tour.durationText}</span>
              <span>{tour.difficulty}</span>
              {tour.people ? <span>{tour.people}</span> : null}
              {tour.locations.map((place) => <span key={place}>{place}</span>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container tour-detail-layout">
            <article className="tour-detail-main">
              <div className="tour-detail-gallery" aria-label={`${tour.title} gallery`}>
                {gallery.map((image, index) => (
                  <img key={image} src={image} alt={`${tour.title} gallery ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
                ))}
              </div>

              <nav className="tour-detail-tabs" aria-label="Tour sections">
                <a href="#overview">Overview</a>
                <a href="#cost">Cost</a>
                <a href="#included">Included</a>
                <a href="#recommendations">Recommendations</a>
              </nav>

              <section className="tour-detail-section" id="overview">
                <span className="tour-detail-kicker">Overview</span>
                <h2>{tour.title}</h2>
                {detail.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>

              <section className="tour-detail-section">
                <span className="tour-detail-kicker">Trip Highlights</span>
                <h2>What to expect</h2>
                <ul className="tour-detail-checklist tour-detail-checklist--columns">
                  {detail.highlights.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>

              <section className="tour-detail-section tour-detail-split" id="included">
                <div>
                  <span className="tour-detail-kicker">Included</span>
                  <h2>Additional free services</h2>
                  <ul className="tour-detail-checklist">
                    {detail.included.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="tour-detail-kicker">Optional</span>
                  <h2>Additional paid services</h2>
                  <ul className="tour-detail-checklist">
                    {detail.paid.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </section>

              <section className="tour-detail-section" id="recommendations">
                <span className="tour-detail-kicker">Recommendations</span>
                <h2>Before the tour</h2>
                <ul className="tour-detail-checklist tour-detail-checklist--columns">
                  {detail.recommendations.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </article>

            <aside className="tour-booking-card" id="cost" aria-label="Tour price and booking">
              <span className="tour-booking-card__label">Show Prices</span>
              <strong>{formatUSD(tour.price)}</strong>
              <p>/ Adult</p>
              <dl>
                <div>
                  <dt>Duration</dt>
                  <dd>{tour.durationText}</dd>
                </div>
                <div>
                  <dt>Difficulty</dt>
                  <dd>{tour.difficulty}</dd>
                </div>
                <div>
                  <dt>Departure</dt>
                  <dd>{tour.originLabel}</dd>
                </div>
              </dl>
              <button className="btn btn--primary" type="button" onClick={() => setBookingOpen(true)}>Add to cart</button>
              <a className="btn btn--ghost" href="#contact">Need help with booking?</a>

              <div className="tour-booking-card__departures">
                <h3>Next departures</h3>
                {tour.nextDepartures.map((item) => (
                  <div key={item.date}>
                    <span>{item.date}</span>
                    <strong>{item.status}</strong>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Related trips you might be interested in</h2>
                <p className="muted">More tours that can be combined with transportation, hotels or rent a car.</p>
              </div>
              <Link className="btn btn--ghost" to={routes.tours}>View all tours</Link>
            </div>
            <div className="tour-related-grid">
              {related.map((item) => (
                <article className="tour-related-card" key={item.slug}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div>
                    <span>{formatUSD(item.price)}</span>
                    <h3>{item.title}</h3>
                    <p>{item.durationText} | {item.difficulty}</p>
                    <Link to={getTourDetailPath(item)}>View trip</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {bookingOpen ? (
          <TourBookingModal
            tour={tour}
            onClose={() => setBookingOpen(false)}
            onAdd={addTourToCart}
          />
        ) : null}

        <ContactForm
          title={`Book ${tour.title}`}
          text="Send us your dates, departure area and number of travelers. We can combine this tour with transport, hotels or rent a car."
          placeholder={`I am interested in ${tour.title}. My travel dates are...`}
        />
      </main>
    </SiteLayout>
  );
}