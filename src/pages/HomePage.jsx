import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Clock3,
  Car,
  Compass,
  Hotel,
  Leaf,
  Link2,
  MapPinned,
  MessageCircle,
  Navigation as NavigationIcon,
  ExternalLink,
  Quote,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound
} from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { SiteLayout } from "../components/SiteLayout";
import { Button } from "../components/ui/button";
import { Map, MapControls, MapMarker, MapRoute, MarkerContent, MarkerPopup } from "../components/ui/map";
import {
  asset,
  homeLinks,
  jacoFeaturedTours,
  routes,
  sanJoseFeaturedTours,
} from "../lib/site";

const trustHighlights = [
  { icon: Leaf, title: "Authentic experiences" },
  { icon: UsersRound, title: "Local expert guides" },
  { icon: ShieldCheck, title: "Safe, reliable service" },
  { icon: MessageCircle, title: "Fast WhatsApp help" },
  { icon: Clock3, title: "2-hour response window" }
];

const travelServices = [
  {
    title: "Private transportation",
    text: "Direct airport, hotel and beach transfers.",
    image: asset("img/gallery/Buseta.webp"),
    alt: "Private transportation in Costa Rica",
    to: routes.privateTransport,
    cta: "Private transport",
    tag: "Door to door",
    icon: Route,
    size: "wide"
  },
  {
    title: "Shared shuttles",
    text: "Scheduled routes between top destinations.",
    image: asset("img/gallery/Private.webp"),
    alt: "Shared shuttle travel in Costa Rica",
    to: routes.shuttle,
    cta: "Shuttle service",
    tag: "Popular routes",
    icon: Bus
  },
  {
    title: "Rent a car",
    text: "Flexible vehicles for city, beach and mountain travel.",
    image: asset("img/gallery/RentACar.webp"),
    imagePosition: "center 35%",
    alt: "Road trip route in Costa Rica",
    to: routes.rentACar,
    cta: "Rent a car",
    tag: "Independent",
    icon: Car
  },
  {
    title: "Vacation packages",
    text: "Hotels, transport and experiences in one plan.",
    image: asset("img/gallery/Vacation_packages.webp"),
    alt: "Costa Rica vacation package scenery",
    tag: "Multi-day",
    icon: Sparkles,
    size: "tall"
  },
  {
    title: "Hotels and stays",
    text: "Lodging matched to your route and travel style.",
    image: asset("img/hotels/Hotel_Manuel_Antonio.webp"),
    alt: "Hotel stay in Costa Rica",
    to: routes.hotels,
    cta: "Hotels",
    tag: "Stays",
    icon: Hotel
  },
  {
    title: "Day tours",
    text: "Beach, wildlife, rainforest and adventure days.",
    image: asset("img/gallery/Day_Tour.webp"),
    alt: "Tortuga Island day tour in Costa Rica",
    to: routes.tours,
    cta: "Day tours",
    tag: "Experiences",
    icon: Compass
  }
];

const responsePromise = [
  "First reply within 2 business hours",
  "Same-day routing help for urgent transfers",
  "Clear next steps before any reservation"
];

const internalLinks = [
  { label: "Tours from San Jose", text: "Volcanoes, waterfalls, city nights and classic full-day routes.", to: `${routes.tours}#from-san-jose` },
  { label: "Tours from Jaco", text: "Beach, rainforest, wildlife and adventure options from the Pacific.", to: `${routes.tours}#from-jaco` },
  { label: "Private transport routes", text: "Direct transfers between airports, hotels and Costa Rica destinations.", to: routes.privateTransport },
  { label: "Rent a car rates", text: "Compare vehicles for independent city, mountain and beach travel.", to: routes.rentACar },
  { label: "Hotel options", text: "Match lodging to your route before confirming services.", to: routes.hotels },
  { label: "Shared shuttle service", text: "Scheduled options for popular destinations and lighter budgets.", to: routes.shuttle }
];

const caseStudies = [
  {
    title: "Family arrival route from SJO",
    outcome: "Private airport pickup, Arenal hotel pairing and Manuel Antonio day planning in one request.",
    result: "3 services coordinated",
    image: asset("img/tours/sj/Arenal_Volcano_and_Hot_Springs/Arenal.webp")
  },
  {
    title: "Jaco adventure weekend",
    outcome: "A short beach stay with rafting, waterfall time and return transport arranged around hotel checkout.",
    result: "48-hour plan",
    image: asset("img/tours/jaco/White _Water_Rafting/Rafting-1.webp")
  },
  {
    title: "Flexible road trip support",
    outcome: "Vehicle category guidance, hotel zones and tour suggestions for travelers building an independent route.",
    result: "Car + stays + tours",
    image: asset("img/gallery/RentACar.webp")
  }
];

const faqs = [
  {
    question: "How fast do you respond to quote requests?",
    answer: "We aim to send the first reply within 2 business hours. Requests with complete dates, pickup points and passenger counts are easier to confirm quickly."
  },
  {
    question: "Can I combine tours, transport, hotels and car rental?",
    answer: "Yes. Add items to the cart or describe the full route in the contact form, and the team will coordinate the services as one trip request."
  },
  {
    question: "Do you help with same-day or next-day transport?",
    answer: "When availability allows, urgent transport requests are prioritized. Include pickup time, pickup place, destination and passenger count."
  },
  {
    question: "Are the listed tour prices final?",
    answer: "Prices are a planning reference and may vary by season, supplier availability, pickup location or group details. Alsama confirms the exact details before booking."
  }
];
const destinations = [
  {
    id: "san-jose",
    name: "San Jose",
    label: "Airport + city base",
    coords: [-84.0907, 9.9281],
    tone: "hub",
    image: asset("img/gallery/City-bus.webp"),
    bestFor: "Arrivals, city nights and Central Valley day trips.",
    services: ["Airport pickup", "Hotels", "City tours"],
    cta: "Plan from San Jose",
    to: `${routes.tours}#from-san-jose`,
    route: [[-84.0907, 9.9281], [-84.2207, 10.0081], [-84.7032, 10.4678]]
  },
  {
    id: "jaco",
    name: "Jaco",
    label: "Pacific beach hub",
    coords: [-84.6356, 9.6148],
    tone: "beach",
    image: asset("img/gallery/Day_Tour.webp"),
    bestFor: "Beach days, adventure parks and quick Pacific transfers.",
    services: ["Shuttle", "Private transport", "Day tours"],
    cta: "Explore Jaco tours",
    to: `${routes.tours}#from-jaco`,
    route: [[-84.0907, 9.9281], [-84.36, 9.78], [-84.6356, 9.6148]]
  },
  {
    id: "arenal",
    name: "Arenal",
    label: "Volcano + hot springs",
    coords: [-84.7032, 10.4678],
    tone: "volcano",
    image: asset("img/tours/sj/Arenal_Volcano_and_Hot_Springs/Arenal.webp"),
    bestFor: "Volcano views, hot springs and mountain scenery.",
    services: ["Private route", "Full-day tour", "Hotel pairing"],
    cta: "See Arenal tour",
    to: routes.tours,
    route: [[-84.0907, 9.9281], [-84.31, 10.1], [-84.7032, 10.4678]]
  },
  {
    id: "monteverde",
    name: "Monteverde",
    label: "Cloud forest",
    coords: [-84.8255, 10.3005],
    tone: "forest",
    image: asset("img/gallery/Private.webp"),
    bestFor: "Cloud forest walks, hanging bridges and cooler nights.",
    services: ["Private transport", "Hotels", "Custom route"],
    cta: "Ask for route",
    to: homeLinks.contact,
    route: [[-84.0907, 9.9281], [-84.49, 10.08], [-84.8255, 10.3005]]
  },
  {
    id: "manuel-antonio",
    name: "Manuel Antonio",
    label: "Wildlife + beach",
    coords: [-84.1557, 9.3894],
    tone: "beach",
    image: asset("img/tours/sj/Manuel_Antonio/1.webp"),
    bestFor: "Wildlife trails, ocean views and family-friendly beach time.",
    services: ["Day tour", "Private pickup", "Hotel stay"],
    cta: "See Manuel Antonio",
    to: routes.tours,
    route: [[-84.0907, 9.9281], [-84.36, 9.78], [-84.6356, 9.6148], [-84.1557, 9.3894]]
  },
  {
    id: "tortuguero",
    name: "Tortuguero",
    label: "Canals + rainforest",
    coords: [-83.505, 10.541],
    tone: "forest",
    image: asset("img/gallery/Vacation_packages.webp"),
    bestFor: "Multi-day rainforest plans, canals and nature-focused stays.",
    services: ["Package planning", "Transfers", "Hotels"],
    cta: "Build this route",
    to: homeLinks.contact,
    route: [[-84.0907, 9.9281], [-83.86, 10.19], [-83.505, 10.541]]
  }
];

const mapRoutes = destinations.map((destination) => destination.route).filter(Boolean);

const costaRicaMapStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors"
    }
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm"
    }
  ]
};

const featuredPicks = [...sanJoseFeaturedTours.slice(0, 2), ...jacoFeaturedTours.slice(0, 2)];

const tripadvisorUrl =
  "https://www.tripadvisor.es/Attraction_Review-g309293-d23810882-Reviews-Alsama_Tours-San_Jose_San_Jose_Metro_Province_of_San_Jose.html";

const travelerReviews = [
  {
    name: "Katie",
    date: "Apr 2026",
    title: "Excellent service",
    route: "San Jose Airport to Monteverde",
    text: "Private transport stayed calm after a long immigration delay. Marco waited, helped with luggage and kept the route stress-free."
  },
  {
    name: "Rebecca A",
    date: "Oct 2025",
    title: "Amazing time",
    route: "Tours + airport transfers",
    text: "Alexandra coordinated tours and airport rides with warm, attentive support, making the whole four-day stay feel easy."
  },
  {
    name: "Safari67449899515",
    date: "Jan 2024",
    title: "Great customer service",
    route: "Tortuga Island + hotel pickup",
    text: "Jorge matched the right tours by phone, arranged hotel transportation and helped with practical travel details in Costa Rica."
  },
  {
    name: "Rupal S",
    date: "May 2023",
    title: "Loved Alsama Tours",
    route: "Multi-tour planning",
    text: "Travelers highlighted helpful planning, fair pricing, included transportation and bilingual guides who made last-minute questions simple."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

function MotionBlock({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function MagneticAction({ children, className = "", href, to, ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const Component = to ? Link : "a";

  function handlePointerMove(event) {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.14,
      y: (event.clientY - rect.top - rect.height / 2) * 0.18
    });
  }

  return (
    <motion.span
      className="magnetic-action"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.45 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <Component className={className} href={href} to={to} {...props}>
        {children}
      </Component>
    </motion.span>
  );
}

function RatingStars({ label = "Rated 5 out of 5 on Tripadvisor" }) {
  return (
    <span className="home-rating-stars" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={18} fill="currentColor" aria-hidden="true" />
      ))}
    </span>
  );
}

function DestinationMap() {
  const mapRef = useRef(null);
  const [activeDestination, setActiveDestination] = useState(destinations[1]);
  const activeRoute = activeDestination.route || [];

  function selectDestination(destination) {
    setActiveDestination(destination);
    mapRef.current?.flyTo({
      center: destination.coords,
      zoom: destination.id === "san-jose" ? 7.4 : 8.05,
      pitch: 34,
      bearing: destination.id === "tortuguero" ? 14 : -8,
      duration: 950,
      essential: true
    });
  }

  return (
    <div className="home-map">
      <div className="home-map__canvas" aria-label="Interactive map of Costa Rica travel destinations">
        <Map
          ref={mapRef}
          theme="light"
          styles={{ light: costaRicaMapStyle, dark: costaRicaMapStyle }}
          center={[-84.25, 9.92]}
          zoom={6.55}
          pitch={28}
          minZoom={5.8}
          maxZoom={10}
          cooperativeGestures
        >
          {mapRoutes.map((coordinates, index) => (
            <MapRoute
              key={`route-base-${index}`}
              id={`home-route-base-${index}`}
              coordinates={coordinates}
              color="#2d9aa0"
              width={2}
              opacity={0.2}
              dashArray={[1.4, 1.4]}
              interactive={false}
            />
          ))}

          {activeRoute.length > 1 ? (
            <MapRoute
              key={activeDestination.id}
              id={`home-route-active-${activeDestination.id}`}
              coordinates={activeRoute}
              color="#d7a646"
              width={6}
              opacity={0.95}
            />
          ) : null}

          {destinations.map((destination) => {
            const isActive = activeDestination.id === destination.id;
            return (
              <MapMarker
                key={destination.id}
                longitude={destination.coords[0]}
                latitude={destination.coords[1]}
                onClick={() => selectDestination(destination)}
              >
                <MarkerContent>
                  <button
                    className={`home-map__marker home-map__marker--${destination.tone} ${isActive ? "is-active" : ""}`}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`Show ${destination.name}`}
                  />
                </MarkerContent>
                <MarkerPopup className="home-map__popup">
                  <strong>{destination.name}</strong>
                  <span>{destination.label}</span>
                </MarkerPopup>
              </MapMarker>
            );
          })}
          <MapControls showFullscreen />
        </Map>
      </div>

      <div className="home-map__panel">
        <span className="home-eyebrow">Routes we coordinate</span>
        <h2>Pick a destination. See the route.</h2>
        <p>
          Tap a place to focus the map, highlight the route and see what Alsama can coordinate there.
        </p>

        <div className="home-map__destinations" aria-label="Choose a destination">
          {destinations.map((destination) => (
            <button
              key={destination.id}
              className={activeDestination.id === destination.id ? "is-active" : ""}
              type="button"
              onClick={() => selectDestination(destination)}
            >
              <MapPinned size={16} aria-hidden="true" />
              <span>{destination.name}</span>
            </button>
          ))}
        </div>

        <motion.article
          className="home-route-card"
          key={activeDestination.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <img src={activeDestination.image} alt={`${activeDestination.name} travel route in Costa Rica`} />
          <div className="home-route-card__body">
            <span>{activeDestination.label}</span>
            <h3>{activeDestination.name}</h3>
            <p>{activeDestination.bestFor}</p>
            <div className="home-route-card__chips">
              {activeDestination.services.map((service) => (
                <small key={service}>{service}</small>
              ))}
            </div>
            <div className="home-route-card__actions">
              <Link className="home-btn home-btn--primary" to={activeDestination.to}>
                {activeDestination.cta} <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a className="home-btn home-btn--ghost" href="#contact">
                Quote route <NavigationIcon size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <SiteLayout
      homeTo={homeLinks.home}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#home"
    >
      <main className="home-redesign" id="home">
        <section className="home-hero" style={{ "--home-hero-image": `url(${asset("img/hero/4.webp")})` }}>
          <div className="home-hero__content">
            <motion.p
              className="home-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Alsama Tours Costa Rica
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Discover the magic of <span>Costa Rica</span>
            </motion.h1>
            <motion.p
              className="home-hero__lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              Tours, transport, hotels and car rentals planned by one local team.
            </motion.p>

            <motion.div
              className="home-hero__actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <MagneticAction className="home-btn home-btn--primary" href="#services">
                Explore tours <ArrowRight size={18} aria-hidden="true" />
              </MagneticAction>

            </motion.div>

            <motion.div
              className="home-hero__response"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Clock3 size={22} aria-hidden="true" />
              <div>
                <strong>Response time commitment</strong>
                <span>First reply within 2 business hours for complete quote requests.</span>
              </div>
            </motion.div>
          </div>

          <div className="home-hero__trust" aria-label="Travel benefits">
            {trustHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  className="home-trust"
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.34 + index * 0.06 }}
                >
                  <Icon size={23} aria-hidden="true" />
                  <span>{item.title}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="home-section home-section--intro">
          <div className="container home-intro">
            <MotionBlock className="home-intro__copy">
              <span className="home-eyebrow">Plan less, see more</span>
              <h2>Your trip, coordinated end to end.</h2>
            </MotionBlock>
            <MotionBlock className="home-intro__stats" delay={0.08}>
              <div>
                <strong>5</strong>
                <span>Core services</span>
              </div>
              <div>
                <strong>2</strong>
                <span>Main departure hubs</span>
              </div>
              <div>
                <strong>1</strong>
                <span>Local team</span>
              </div>
            </MotionBlock>
          </div>
        </section>

        <section className="home-section home-section--promise" id="response-time">
          <div className="container home-promise">
            <MotionBlock className="home-promise__copy">
              <span className="home-eyebrow">Response commitment</span>
              <h2>Clear answers before your travel plan gets complicated.</h2>
              <p>
                Send your dates, pickup point and destination. Alsama aims to answer complete quote requests within 2 business hours.
              </p>
            </MotionBlock>
            <MotionBlock className="home-promise__list" delay={0.08}>
              {responsePromise.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={19} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </MotionBlock>
          </div>
        </section>

        <section className="home-section" id="services">
          <div className="container">
            <MotionBlock className="home-section__head">
              <span className="home-eyebrow">Services</span>
              <h2>Everything for a smoother Costa Rica route.</h2>
            </MotionBlock>

            <div className="home-bento">
              {travelServices.map((service, index) => {
                const Icon = service.icon;
                const content = (
                  <>
                    <img
                      src={service.image}
                      alt={service.alt}
                      style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
                    />
                    <div className="home-bento__shade" />
                    <div className="home-bento__content">
                      <span>{service.tag}</span>
                      <Icon size={24} aria-hidden="true" />
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                      {service.to ? (
                        <strong>
                          {service.cta} <ArrowRight size={16} aria-hidden="true" />
                        </strong>
                      ) : null}
                    </div>
                  </>
                );

                return (
                  <MotionBlock
                    className={`home-bento__item ${service.size ? `home-bento__item--${service.size}` : ""}`}
                    delay={index * 0.04}
                    key={service.title}
                  >
                    {service.to ? (
                      <Link to={service.to} id={service.title === "Rent a car" ? "rent" : undefined}>
                        {content}
                      </Link>
                    ) : (
                      <div>{content}</div>
                    )}
                  </MotionBlock>
                );
              })}
            </div>
          </div>
        </section>

        <section className="home-section home-section--links" id="travel-links">
          <div className="container">
            <MotionBlock className="home-section__head home-section__head--row">
              <div>
                <span className="home-eyebrow">Plan faster</span>
                <h2>Jump to the service that matches your route.</h2>
              </div>
              <Link className="home-btn home-btn--light" to={homeLinks.contact}>
                Ask for a route <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </MotionBlock>

            <div className="home-link-grid">
              {internalLinks.map((item, index) => (
                <MotionBlock className="home-link-card" delay={index * 0.035} key={item.label}>
                  <Link to={item.to}>
                    <Link2 size={18} aria-hidden="true" />
                    <strong>{item.label}</strong>
                    <span>{item.text}</span>
                  </Link>
                </MotionBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section--map" id="destinations">
          <div className="container">
            <MotionBlock>
              <DestinationMap />
            </MotionBlock>
          </div>
        </section>

        <section className="home-section">
          <div className="container">
            <MotionBlock className="home-section__head home-section__head--row">
              <div>
                <span className="home-eyebrow">Popular picks</span>
                <h2>Start with a proven favorite.</h2>
              </div>
              <Link className="home-btn home-btn--light" to={routes.tours}>
                View all tours <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </MotionBlock>

            <div className="home-picks">
              {featuredPicks.map((tour, index) => (
                <MotionBlock className="home-pick" delay={index * 0.05} key={`${tour.title}-${tour.location}`}>
                  <img src={tour.image} alt={`${tour.title} tour from ${tour.location}, Costa Rica`} style={{ objectPosition: tour.imagePosition }} />
                  <div>
                    <span>{tour.location}</span>
                    <h3>{tour.title}</h3>
                    <p>{tour.duration}</p>
                  </div>
                </MotionBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section--cases" id="case-studies">
          <div className="container">
            <MotionBlock className="home-section__head">
              <span className="home-eyebrow">Case studies</span>
              <h2>Common trip problems we help simplify.</h2>
            </MotionBlock>

            <div className="home-case-grid">
              {caseStudies.map((item, index) => (
                <MotionBlock className="home-case" delay={index * 0.05} key={item.title}>
                  <img src={item.image} alt="" aria-hidden="true" loading="lazy" />
                  <div>
                    <span><Star size={15} aria-hidden="true" /> {item.result}</span>
                    <h3>{item.title}</h3>
                    <p>{item.outcome}</p>
                  </div>
                </MotionBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section--faqs" id="faqs">
          <div className="container home-faq-layout">
            <MotionBlock className="home-section__head">
              <span className="home-eyebrow">FAQs</span>
              <h2>Questions travelers ask before booking.</h2>
            </MotionBlock>
            <MotionBlock className="home-faqs" delay={0.08}>
              {faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </MotionBlock>
          </div>
        </section>

        <section className="home-section home-section--reviews" id="opiniones">
          <div className="container home-reviews">
            <MotionBlock className="home-reviews__summary">
              <span className="home-eyebrow">Opiniones</span>
              <h2>Trusted by travelers on Tripadvisor.</h2>
              <p>
                Alsama Tours is rated 4.9/5 on Tripadvisor, with travelers highlighting private transport,
                fast coordination and local support across Costa Rica.
              </p>
              <div className="home-reviews__score" aria-label="Tripadvisor rating summary">
                <strong>4.9</strong>
                <span>/ 5</span>
                <RatingStars label="Overall rating 4.9 out of 5 on Tripadvisor" />
                <small>51 reviews</small>
              </div>
              <Button asChild className="home-reviews__trip-button">
                <a href={tripadvisorUrl} target="_blank" rel="noreferrer">
                  View on Tripadvisor <ExternalLink size={17} aria-hidden="true" />
                </a>
              </Button>
            </MotionBlock>

            <div className="home-reviews__grid">
              {travelerReviews.map((review, index) => (
                <MotionBlock className="home-review-card" delay={index * 0.05} key={review.name + review.date}>
                  <Quote size={24} aria-hidden="true" />
                  <RatingStars />
                  <h3>{review.title}</h3>
                  <p>{review.text}</p>
                  <div className="home-review-card__meta">
                    <strong>{review.name}</strong>
                    <span>{review.date}</span>
                  </div>
                  <small>{review.route}</small>
                </MotionBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section--cta">
          <div className="container home-cta">
            <MotionBlock>
              <span className="home-eyebrow">Custom routes</span>
              <h2>Tell us where you land. We will shape the rest.</h2>
            </MotionBlock>
            <MagneticAction className="home-btn home-btn--primary" href="#contact">
              Build my trip <ArrowRight size={18} aria-hidden="true" />
            </MagneticAction>
          </div>
        </section>

        <ContactForm
          text="Tell us your travel dates, destinations and which services you need."
          placeholder="Tell us if you need tours, transportation, hotels, rent a car or a complete package."
        />
      </main>
    </SiteLayout>
  );
}
