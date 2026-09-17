import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CalendarDays, Camera, CheckCircle2, Clock, MapPin, Sparkles, Ticket, WalletCards } from "lucide-react";
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
import { Map, MapMarker, MapRoute, MarkerContent, MarkerTooltip } from "../components/ui/map";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { findTourBySlug, getAllTours, getTourDetailPath, routes } from "../lib/site";

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function uniqueImages(images) {
  return [...new Set(images.filter(Boolean))];
}

function cssImageUrl(value) {
  const safeValue = String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `url("${safeValue}")`;
}

const tourStopCoordinates = {
  "San Jose": [-84.0907, 9.9281],
  Alajuela: [-84.2137, 10.0162],
  Poas: [-84.2333, 10.2],
  "La Paz": [-84.1608, 10.2057],
  "Vara Blanca": [-84.1591, 10.1772],
  "Manuel Antonio": [-84.1558, 9.3923],
  Quepos: [-84.1638, 9.4319],
  "Central Pacific": [-84.6386, 9.6167],
  Cartago: [-83.9194, 9.8644],
  Irazu: [-83.8522, 9.9794],
  Orosi: [-83.8538, 9.7961],
  Lankester: [-83.8875, 9.8385],
  "Isla Tortuga": [-84.8962, 9.7878],
  "Gulf of Nicoya": [-84.9019, 9.892],
  Arenal: [-84.7032, 10.4631],
  "La Fortuna": [-84.6427, 10.471],
  Sarchi: [-84.3427, 10.0887],
  "Central Valley": [-84.153, 9.984],
  Jaco: [-84.6294, 9.6147],
  "Rio Savegre": [-84.0854, 9.3954],
  "Rio Naranjo": [-84.0897, 9.4802],
  Carara: [-84.6047, 9.7865],
  Tarcoles: [-84.6348, 9.7719],
  "Los Suenos": [-84.6617, 9.6525],
  Mangroves: [-84.2227, 9.4532],
  Puntarenas: [-84.8339, 9.9763]
};

const originCoordinates = {
  "san-jose": ["San Jose", tourStopCoordinates["San Jose"]],
  jaco: ["Jaco", tourStopCoordinates.Jaco]
};

const revealProps = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

function getTourStops(tour) {
  const origin = originCoordinates[tour.origin];
  const stops = origin ? [{ name: origin[0], coordinates: origin[1] }] : [];

  for (const place of tour.locations) {
    const coordinates = tourStopCoordinates[place];
    if (coordinates && !stops.some((stop) => stop.name === place)) {
      stops.push({ name: place, coordinates });
    }
  }

  if (stops.length > 1) return stops;
  return stops.concat([{ name: tour.locations[0] || tour.originLabel, coordinates: stops[0]?.coordinates || [-84.0907, 9.9281] }]);
}

function getMapCenter(stops) {
  const totals = stops.reduce((sum, stop) => [sum[0] + stop.coordinates[0], sum[1] + stop.coordinates[1]], [0, 0]);
  return [totals[0] / stops.length, totals[1] / stops.length];
}

export function TourDetailPage() {
  const { tourSlug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const tour = findTourBySlug(tourSlug);
  const activeTourSlug = tour?.slug;

  useLayoutEffect(() => {
    if (!activeTourSlug) return;

    setBookingOpen(false);
    setGalleryIndex(null);
    setActiveSection("overview");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTourSlug]);

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
  const tourStops = getTourStops(tour);
  const routeCoordinates = tourStops.map((stop) => stop.coordinates);
  const routeCenter = getMapCenter(tourStops);
  const routeZoom = tourStops.length > 3 ? 7.2 : 8.2;
  const quickFacts = [
    { label: "Duration", value: tour.durationText, icon: Clock },
    { label: "Difficulty", value: tour.difficulty, icon: Sparkles },
    { label: "Departure", value: tour.originLabel, icon: MapPin },
    { label: "Price", value: `${formatUSD(tour.price)} ${t("/ Adult")}`, icon: WalletCards, translateValue: false }
  ];
  const sectionTabs = [
    { id: "overview", label: "Overview" },
    { id: "route", label: "Stops" },
    { id: "cost", label: "Cost" },
    { id: "included", label: "Included" },
    { id: "recommendations", label: "Recommendations" }
  ];
  const orderedSectionIds = [activeSection, ...sectionTabs.map(({ id }) => id).filter((id) => id !== activeSection)];

  function selectSection(sectionId) {
    setActiveSection(sectionId);
    window.requestAnimationFrame(() => {
      document.getElementById("tour-sections")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

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
      showBreadcrumbs={false}
    >
      <main className="tour-detail" id="top">
        <section className="tour-detail-hero" style={{ "--tour-hero-image": cssImageUrl(tour.image) }}>
          <div className="tour-detail-hero__shape tour-detail-hero__shape--one" aria-hidden="true" />
          <div className="tour-detail-hero__shape tour-detail-hero__shape--two" aria-hidden="true" />
          <div className="container tour-detail-hero__content">
            <motion.div className="tour-detail-hero__copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
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
              <div className="tour-detail-hero__actions">
                <button className="btn btn--primary" type="button" onClick={() => setBookingOpen(true)}>
                  <Ticket size={17} aria-hidden="true" />
                  {t("Add to cart")}
                </button>
                <a className="btn btn--ghost" href="#gallery">
                  <Camera size={17} aria-hidden="true" />
                  {t("View details")}
                </a>
              </div>
            </motion.div>

            <motion.aside className="tour-detail-hero__panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }} aria-label={t("Tour price and booking")}>
              <span>{t("Show Prices")}</span>
              <strong>{formatUSD(tour.price)}</strong>
              <p>{t("/ Adult")}</p>
              <dl>
                <div>
                  <dt>{t("Duration")}</dt>
                  <dd>{t(tour.durationText)}</dd>
                </div>
                <div>
                  <dt>{t("Next departures")}</dt>
                  <dd>{t(tour.nextDepartures[0]?.status || "On request")}</dd>
                </div>
              </dl>
            </motion.aside>
          </div>
        </section>

        <section className="section">
          <div className="container tour-detail-layout">
            <article className="tour-detail-main">
              <motion.div className="tour-quick-facts" {...revealProps}>
                {quickFacts.map(({ label, value, icon: Icon, translateValue = true }) => (
                  <div className="tour-quick-fact" key={label}>
                    <span><Icon size={18} aria-hidden="true" /></span>
                    <div>
                      <small>{t(label)}</small>
                      <strong>{translateValue ? t(value) : value}</strong>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div className="tour-detail-gallery" id="gallery" aria-label={`${t(tour.title)} ${t("gallery")}`} {...revealProps}>
                <Swiper
                  key={tour.slug}
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
                      <button className="tour-gallery-carousel__zoom" type="button" style={{ "--tour-slide-image": cssImageUrl(image) }} aria-label={`${t("Open")} ${t(tour.title)} ${t("image")} ${index + 1}`} onClick={() => setGalleryIndex(index)}>
                        <img src={image} alt={`${t(tour.title)} ${t("gallery")} ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>

              <nav className="tour-detail-tabs" aria-label={t("Tour sections")}>
                {sectionTabs.map(({ id, label }) => (
                  <button
                    className={activeSection === id ? "is-active" : undefined}
                    type="button"
                    key={id}
                    aria-pressed={activeSection === id}
                    onClick={() => selectSection(id)}
                  >
                    {t(label)}
                  </button>
                ))}
              </nav>

              <motion.div className="tour-detail-sections" id="tour-sections" layout>
                <motion.section className="tour-detail-section" id="overview" layout style={{ order: orderedSectionIds.indexOf("overview") }} {...revealProps}>
                  <span className="tour-detail-kicker">{t("Overview")}</span>
                  <h2>{t(tour.title)}</h2>
                  {detail.overview.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}
                  <div className="tour-detail-highlights">
                    <span className="tour-detail-kicker">{t("Trip Highlights")}</span>
                    <h3>{t("What to expect")}</h3>
                    <ul className="tour-detail-checklist tour-detail-checklist--columns">
                      {detail.highlights.map((item) => <li key={item}>{t(item)}</li>)}
                    </ul>
                  </div>
                </motion.section>

                <motion.section className="tour-detail-route" id="route" layout style={{ order: orderedSectionIds.indexOf("route") }} {...revealProps}>
                  <div className="tour-route-copy">
                    <span className="tour-detail-kicker">{t("Stops")}</span>
                    <h2>{t("Tour route")}</h2>
                    <ol>
                      {tourStops.map((stop, index) => (
                        <li key={`${stop.name}-${index}`}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <strong>{t(stop.name)}</strong>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="tour-route-map" aria-label={`${t(tour.title)} ${t("route map")}`}>
                    <Map
                      key={tour.slug}
                      theme="light"
                      center={routeCenter}
                      zoom={routeZoom}
                      pitch={38}
                      bearing={-18}
                      scrollZoom={false}
                      dragPan={false}
                      dragRotate={false}
                      touchZoomRotate={false}
                      doubleClickZoom={false}
                    >
                      <MapRoute id={`tour-${tour.slug}`} coordinates={routeCoordinates} color="#176f62" width={4} opacity={0.86} />
                      {tourStops.map((stop, index) => (
                        <MapMarker key={`${stop.name}-${index}`} longitude={stop.coordinates[0]} latitude={stop.coordinates[1]} anchor="bottom">
                          <MarkerContent className="tour-route-marker">
                            <span>{index + 1}</span>
                          </MarkerContent>
                          <MarkerTooltip>{t(stop.name)}</MarkerTooltip>
                        </MapMarker>
                      ))}
                    </Map>
                  </div>
                </motion.section>

                <motion.aside className="tour-booking-card" id="cost" layout style={{ order: orderedSectionIds.indexOf("cost") }} aria-label={t("Tour price and booking")}>
                  <span className="tour-booking-card__label">{t("Show Prices")}</span>
                  <strong>{formatUSD(tour.price)}</strong>
                  <p>{t("/ Adult")}</p>
                  <p className="muted">{t("Costa Rican nationals get 10% off this tour with cedula.")}</p>
                  <dl>
                    <div><dt>{t("Duration")}</dt><dd>{t(tour.durationText)}</dd></div>
                    <div><dt>{t("Difficulty")}</dt><dd>{t(tour.difficulty)}</dd></div>
                    <div><dt>{t("Departure")}</dt><dd>{t(tour.originLabel)}</dd></div>
                  </dl>
                  <button className="btn btn--primary" type="button" onClick={() => setBookingOpen(true)}>{t("Add to cart")}</button>
                  <a className="btn btn--ghost" href="#contact">{t("Need help with booking?")}</a>
                  <div className="tour-booking-card__departures">
                    <h3>{t("Next departures")}</h3>
                    {tour.nextDepartures.map((item) => (
                      <div key={item.date}>
                        <span><CalendarDays size={14} aria-hidden="true" /> {t(item.date)}</span>
                        <strong>{t(item.status)}</strong>
                      </div>
                    ))}
                  </div>
                </motion.aside>

                <motion.section className="tour-detail-section tour-detail-split" id="included" layout style={{ order: orderedSectionIds.indexOf("included") }} {...revealProps}>
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
                </motion.section>

                <motion.section className="tour-detail-section" id="recommendations" layout style={{ order: orderedSectionIds.indexOf("recommendations") }} {...revealProps}>
                  <span className="tour-detail-kicker">{t("Recommendations")}</span>
                  <h2>{t("Before the tour")}</h2>
                  <ul className="tour-detail-checklist tour-detail-checklist--columns">
                    {detail.recommendations.map((item) => <li key={item}>{t(item)}</li>)}
                  </ul>
                </motion.section>
              </motion.div>
            </article>
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
                  <img src={item.image} alt={`${t(item.title)} tour in Costa Rica`} loading="lazy" />
                  <div>
                    <span>{formatUSD(item.price)}</span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.durationText)} | {t(item.difficulty)}</p>
                    <Link to={getTourDetailPath(item)}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      {t("View trip")}
                    </Link>
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