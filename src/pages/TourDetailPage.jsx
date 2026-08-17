import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { ImageGalleryModal } from "../components/ImageGalleryModal";
import { SiteLayout } from "../components/SiteLayout";
import { TourBookingModal } from "../components/TourBookingModal";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { findTourBySlug, getAllTours, getTourDetailPath, routes } from "../lib/site";

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function uniqueImages(images) {
  return [...new Set(images.filter(Boolean))];
}


export function TourDetailPage() {
  const { tourSlug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(null);
  const tour = findTourBySlug(tourSlug);

  useEffect(() => {
    if (tour) {
      document.title = `${t(tour.title)} | Alsama Tours`;
    }
  }, [language, t, tour]);

  if (!tour) {
    return <Navigate replace to={routes.tours} />;
  }

  const relatedTours = getAllTours()
    .filter((item) => item.slug !== tour.slug)
    .filter((item) => item.origin === tour.origin || item.locations.some((place) => tour.locations.includes(place)))
    .slice(0, 3);
  const fallbackRelated = getAllTours().filter((item) => item.slug !== tour.slug).slice(0, 3);
  const related = relatedTours.length ? relatedTours : fallbackRelated;
  const gallery = uniqueImages(tour.gallery?.length ? tour.gallery : [tour.image]);
  const detail = tour.detail;

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(routes.tours);
  }

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
              <button className="tour-back-button" type="button" onClick={handleBack} aria-label={t("Back")}>
                <ArrowLeft size={16} aria-hidden="true" />
                <span>{t("Back")}</span>
              </button>
              <Link to={routes.tours}>{t("Tours")}</Link>
              <span>/</span>
              <span>{t(tour.title)}</span>
            </div>
            <p className="tour-detail-hero__eyebrow">{t(tour.originLabel)}</p>
            <h1>{t(tour.title)}</h1>
            <p>{t(detail.subtitle)}</p>
            <div className="tour-detail-hero__meta" aria-label={t("Tour details")}>
              <span>{t(tour.durationText)}</span>
              <span>{t(tour.difficulty)}</span>
              {tour.people ? <span>{t(tour.people)}</span> : null}
              {tour.locations.map((place) => <span key={place}>{t(place)}</span>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container tour-detail-layout">
            <article className="tour-detail-main">
              <div className="tour-detail-gallery" aria-label={`${t(tour.title)} ${t("gallery")}`}>
                <Swiper
                  modules={[A11y, Autoplay, Navigation, Pagination]}
                  className="tour-gallery-carousel"
                  slidesPerView={1}
                  spaceBetween={16}
                  loop={gallery.length > 1}
                  navigation={gallery.length > 1}
                  pagination={gallery.length > 1 ? { clickable: true } : false}
                  autoplay={gallery.length > 1 ? { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
                  a11y={{ prevSlideMessage: "Previous tour image", nextSlideMessage: "Next tour image" }}
                >
                  {gallery.map((image, index) => (
                    <SwiperSlide key={image}>
                      <button className="tour-gallery-carousel__zoom" type="button" style={{ "--tour-slide-image": `url(${image})` }} aria-label={`${t("Open")} ${t(tour.title)} ${t("image")} ${index + 1}`} onClick={() => setGalleryIndex(index)}>
                        <img src={image} alt={`${t(tour.title)} ${t("gallery")} ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <nav className="tour-detail-tabs" aria-label={t("Tour sections")}>
                <a href="#overview">{t("Overview")}</a>
                <a href="#cost">{t("Cost")}</a>
                <a href="#included">{t("Included")}</a>
                <a href="#recommendations">{t("Recommendations")}</a>
              </nav>

              <section className="tour-detail-section" id="overview">
                <span className="tour-detail-kicker">{t("Overview")}</span>
                <h2>{t(tour.title)}</h2>
                {detail.overview.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}
              </section>

              <section className="tour-detail-section">
                <span className="tour-detail-kicker">{t("Trip Highlights")}</span>
                <h2>{t("What to expect")}</h2>
                <ul className="tour-detail-checklist tour-detail-checklist--columns">
                  {detail.highlights.map((item) => <li key={item}>{t(item)}</li>)}
                </ul>
              </section>

              <section className="tour-detail-section tour-detail-split" id="included">
                <div>
                  <span className="tour-detail-kicker">{t("Included")}</span>
                  <h2>{t("Additional free services")}</h2>
                  <ul className="tour-detail-checklist">
                    {detail.included.map((item) => <li key={item}>{t(item)}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="tour-detail-kicker">{t("Optional")}</span>
                  <h2>{t("Additional paid services")}</h2>
                  <ul className="tour-detail-checklist">
                    {detail.paid.map((item) => <li key={item}>{t(item)}</li>)}
                  </ul>
                </div>
              </section>

              <section className="tour-detail-section" id="recommendations">
                <span className="tour-detail-kicker">{t("Recommendations")}</span>
                <h2>{t("Before the tour")}</h2>
                <ul className="tour-detail-checklist tour-detail-checklist--columns">
                  {detail.recommendations.map((item) => <li key={item}>{t(item)}</li>)}
                </ul>
              </section>
            </article>

            <aside className="tour-booking-card" id="cost" aria-label={t("Tour price and booking")}>
              <span className="tour-booking-card__label">{t("Show Prices")}</span>
              <strong>{formatUSD(tour.price)}</strong>
              <p>{t("/ Adult")}</p>
              <dl>
                <div>
                  <dt>{t("Duration")}</dt>
                  <dd>{t(tour.durationText)}</dd>
                </div>
                <div>
                  <dt>{t("Difficulty")}</dt>
                  <dd>{t(tour.difficulty)}</dd>
                </div>
                <div>
                  <dt>{t("Departure")}</dt>
                  <dd>{t(tour.originLabel)}</dd>
                </div>
              </dl>
              <button className="btn btn--primary" type="button" onClick={() => setBookingOpen(true)}>{t("Add to cart")}</button>
              <a className="btn btn--ghost" href="#contact">{t("Need help with booking?")}</a>

              <div className="tour-booking-card__departures">
                <h3>{t("Next departures")}</h3>
                {tour.nextDepartures.map((item) => (
                  <div key={item.date}>
                    <span>{t(item.date)}</span>
                    <strong>{t(item.status)}</strong>
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
                <h2>{t("Related trips you might be interested in")}</h2>
                <p className="muted">{t("More tours that can be combined with transportation, hotels or rent a car.")}</p>
              </div>
              <Link className="btn btn--ghost" to={routes.tours}>{t("View all tours")}</Link>
            </div>
            <div className="tour-related-grid">
              {related.map((item) => (
                <article className="tour-related-card" key={item.slug}>
                  <img src={item.image} alt={t(item.title)} loading="lazy" />
                  <div>
                    <span>{formatUSD(item.price)}</span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.durationText)} | {t(item.difficulty)}</p>
                    <Link to={getTourDetailPath(item)}>{t("View trip")}</Link>
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

        {galleryIndex !== null ? (
          <ImageGalleryModal
            title={t(tour.title)}
            gallery={gallery}
            index={galleryIndex}
            onChangeIndex={setGalleryIndex}
            onClose={() => setGalleryIndex(null)}
          />
        ) : null}

        <ContactForm
          title={`${t("Book")} ${t(tour.title)}`}
          text={t("Send us your dates, departure area and number of travelers. We can combine this tour with transport, hotels or rent a car.")}
          placeholder={`${t("I am interested in")} ${t(tour.title)}. ${t("My travel dates are...")}`}
        />
      </main>
    </SiteLayout>
  );
}