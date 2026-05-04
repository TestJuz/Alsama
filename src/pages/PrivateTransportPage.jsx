import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup
} from "@/components/ui/map";
import { ContactForm } from "../components/ContactForm";
import { SiteLayout } from "../components/SiteLayout";
import { useCart } from "../context/CartContext";
import {
  getPrivateTransportPrice,
  getPrivateTransportPriceLabel,
  privateTransportRoutes
} from "../lib/privateTransportRates";
import { routes } from "../lib/site";

const naturalMapStyle = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

function formatUSD(value) {
  if (typeof value !== "number") return "Rate on request";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function todayInputValue() {
  const today = new Date();
  const offsetDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function isPastDate(value) {
  if (!value) return false;
  const today = new Date(`${todayInputValue()}T00:00`);
  const selected = new Date(`${value}T00:00`);
  return !Number.isNaN(selected.getTime()) && selected < today;
}

export function PrivateTransportPage() {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [base, setBase] = useState("ALL");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [draft, setDraft] = useState({
    passengers: 2,
    hotel: "",
    departureDate: todayInputValue()
  });

  const filteredRoutes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return privateTransportRoutes.filter((route) => {
      if (base !== "ALL" && route.base !== base) return false;
      if (!normalizedQuery) return true;
      return `${route.lugar} ${route.base}`.toLowerCase().includes(normalizedQuery);
    });
  }, [base, query]);

  const mapRoutes = base === "ALL"
    ? privateTransportRoutes
    : privateTransportRoutes.filter((route) => route.base === base);

  const selectedPrice = selectedRoute
    ? getPrivateTransportPrice(selectedRoute, draft.passengers)
    : undefined;
  const selectedHasPastDate = isPastDate(draft.departureDate);

  function openRequest(route) {
    setSelectedRoute(route);
    setDraft({
      passengers: 2,
      hotel: "",
      departureDate: todayInputValue()
    });
  }

  function closeRequest() {
    setSelectedRoute(null);
  }

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function savePrivateTransport(event) {
    event.preventDefault();
    if (!selectedRoute || selectedHasPastDate) return;

    const passengers = Math.max(1, Number(draft.passengers) || 1);
    const price = getPrivateTransportPrice(selectedRoute, passengers);

    addItem({
      id: `private-transport-${selectedRoute.id}-${passengers}-${draft.departureDate}-${draft.hotel.trim().toLowerCase()}`,
      type: "Private transport",
      title: selectedRoute.lugar,
      subtitle: selectedRoute.base === "JACO" ? "From Jaco" : "From GAM",
      price,
      meta: [
        `${passengers} passenger${passengers === 1 ? "" : "s"}`,
        draft.hotel,
        `Departure ${draft.departureDate}`,
        selectedRoute.base === "JACO" ? "Jaco rate" : "GAM rate",
        formatUSD(price)
      ].filter(Boolean),
      details: {
        routeId: selectedRoute.id,
        routeName: selectedRoute.lugar,
        base: selectedRoute.base,
        passengers,
        hotel: draft.hotel,
        departureDate: draft.departureDate,
        rates: {
          pax_1_5: selectedRoute.pax_1_5,
          pax_6_mas: selectedRoute.pax_6_mas,
          pax_extra: selectedRoute.pax_extra
        }
      }
    });

    closeRequest();
  }

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
                Browse private transfers from GAM and Jaco, compare rates by group size and add the route to your trip cart.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#private-rates">View routes</a>
                <a className="btn btn--ghost" href="#contact">Request private transport</a>
              </div>
            </div>

            <div className="transport-highlight">
              <div className="transport-highlight__card">
                <p className="transport-highlight__eyebrow">Best for</p>
                <h3>Families and groups</h3>
                <p className="muted">Useful when you need direct pickup, flexible time and a dedicated vehicle.</p>
              </div>
              <div className="transport-highlight__card">
                <p className="transport-highlight__eyebrow">Rates</p>
                <h3>Based on route and passengers</h3>
                <p className="muted">GAM uses 1-5 and 6+ passenger pricing. Jaco adds an extra passenger rate after 5 people.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="private-rates">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Private transport routes</h2>
                <p className="muted">Filter by pickup base, search destinations and inspect the destination map.</p>
              </div>
            </div>

            <div className="private-transport-layout">
              <div className="private-transport-main">
                <div className="controls private-transport-controls">
                  <label className="control private-search">
                    Search
                    <span>
                      <Search size={17} aria-hidden="true" />
                      <input
                        type="search"
                        placeholder="Destination or route..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </span>
                  </label>

                  <label className="control">
                    From
                    <select value={base} onChange={(event) => setBase(event.target.value)}>
                      <option value="ALL">All</option>
                      <option value="GAM">GAM</option>
                      <option value="JACO">Jaco</option>
                    </select>
                  </label>
                </div>

                <div className="list-head">
                  <p className="muted">Showing {filteredRoutes.length} private transport options</p>
                </div>

                <div className="private-rate-list">
                  {filteredRoutes.map((route) => (
                    <article className="private-rate-card" key={route.id}>
                      <div>
                        <span className="transport-card__tag">{route.base === "JACO" ? "From Jaco" : "From GAM"}</span>
                        <h3>{route.lugar}</h3>
                        <p className="muted">{getPrivateTransportPriceLabel(route)}</p>
                      </div>

                      <div className="private-rate-card__side">
                        <strong>{formatUSD(getPrivateTransportPrice(route, 2))}</strong>
                        <span className="muted">Estimated for 2 pax</span>
                        <button
                          className="btn btn--primary"
                          type="button"
                          onClick={() => openRequest(route)}
                        >
                          Add
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="private-map-card">
                <div className="shuttle-mapCard__head">
                  <div>
                    <h3>Destination map</h3>
                    <p className="muted">All private transport destinations by selected base.</p>
                  </div>
                </div>

                <div className="private-map-canvas">
                  <Map
                    center={base === "JACO" ? [-84.76, 9.82] : [-84.2, 9.95]}
                    zoom={base === "ALL" ? 6.75 : 7.25}
                    theme="light"
                    styles={{ light: naturalMapStyle, dark: naturalMapStyle }}
                  >
                    <MapControls showZoom showFullscreen />

                    {mapRoutes.map((route) => (
                      <MapMarker
                        key={route.id}
                        longitude={route.coordinates.lng}
                        latitude={route.coordinates.lat}
                      >
                        <MarkerContent>
                          <div className={`private-marker private-marker--${route.base.toLowerCase()}`} />
                        </MarkerContent>
                        <MarkerPopup closeButton>
                          <div className="shuttle-popup">
                            <strong>{route.lugar}</strong>
                            <p>{route.base === "JACO" ? "From Jaco" : "From GAM"}</p>
                            <p>{getPrivateTransportPriceLabel(route)}</p>
                          </div>
                        </MarkerPopup>
                      </MapMarker>
                    ))}
                  </Map>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <div className="transport-grid">
              <article className="transport-card">
                <span className="transport-card__tag">How it works</span>
                <h3>Custom point-to-point service</h3>
                <p className="muted">Choose a route, tell us the pickup hotel, passenger count and departure date, then request it with the rest of your cart.</p>
                <ul className="transport-list">
                  <li>Flexible pickup time and location</li>
                  <li>Direct route or customized stops</li>
                  <li>More private and comfortable experience</li>
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

        <ContactForm
          title="Request private transport"
          text="Tell us your route, dates, group size and any extra stops you want to include."
          placeholder="Example: We need private transport from Liberia airport to Tamarindo with one grocery stop for 6 passengers."
          buttonLabel="Send request"
        />
      </main>

      {selectedRoute ? (
        <div className="rate-modal" role="dialog" aria-modal="true" aria-labelledby="privateTransportModalTitle">
          <div className="rate-modal__backdrop" onClick={closeRequest} />
          <form className="rate-modal__card" onSubmit={savePrivateTransport}>
            <div className="rate-modal__head">
              <div>
                <h3 id="privateTransportModalTitle">Private transport details</h3>
                <p className="muted">{selectedRoute.lugar}</p>
              </div>
              <button className="rate-modal__close" type="button" aria-label="Close" onClick={closeRequest}>
                <X size={18} />
              </button>
            </div>

            <div className="rate-modal__grid">
              <label className="control">
                Passengers
                <input
                  min="1"
                  required
                  type="number"
                  value={draft.passengers}
                  onChange={(event) => updateDraft("passengers", event.target.value)}
                />
              </label>

              <label className="control">
                Pickup hotel
                <input
                  required
                  placeholder="Hotel or pickup point"
                  value={draft.hotel}
                  onChange={(event) => updateDraft("hotel", event.target.value)}
                />
              </label>
            </div>

            <label className="control">
              Departure date
              <input
                required
                type="date"
                min={todayInputValue()}
                value={draft.departureDate}
                onChange={(event) => updateDraft("departureDate", event.target.value)}
              />
            </label>

            <div className="rate-total">
              <div>
                <span className="rate-summary__label">Route</span>
                <strong>{selectedRoute.base === "JACO" ? "From Jaco" : "From GAM"}</strong>
              </div>
              <div>
                <span className="rate-summary__label">Estimated total</span>
                <strong>{formatUSD(selectedPrice)}</strong>
              </div>
            </div>

            {selectedHasPastDate ? (
              <p className="rate-modal__error" role="alert">Please select today or a future date.</p>
            ) : null}

            {typeof selectedPrice !== "number" ? (
              <p className="rate-modal__note muted">This route has no fixed published rate. Add it and we will confirm availability and pricing.</p>
            ) : null}

            <div className="rate-modal__actions">
              <button className="btn btn--primary" type="submit" disabled={selectedHasPastDate}>Add to cart</button>
              <button className="btn btn--ghost" type="button" onClick={closeRequest}>Cancel</button>
            </div>
          </form>
        </div>
      ) : null}
    </SiteLayout>
  );
}
