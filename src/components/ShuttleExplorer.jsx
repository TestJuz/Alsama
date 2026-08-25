import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerPopup
} from "@/components/ui/map";
import { useCart } from "@/context/CartContext";
import { getFallbackRouteCoordinates, shuttleRoutes } from "@/lib/shuttles";

const SHUTTLE_BATCH_SIZE = 3;

function parseTimeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(value);
}

const naturalMapStyle = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

async function fetchRoadRoute(route) {
  const coordinates = route.stops.map((stop) => `${stop.lng},${stop.lat}`).join(";");
  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`
  );

  if (!response.ok) {
    throw new Error(`OSRM request failed with status ${response.status}`);
  }

  const data = await response.json();
  const geometry = data.routes?.[0]?.geometry?.coordinates;

  if (!Array.isArray(geometry) || geometry.length < 2) {
    throw new Error("OSRM route geometry missing");
  }

  return geometry;
}

function ShuttleRouteCard({
  route,
  isActive,
  onAdd,
  onToggle,
  viewport,
  setViewport,
  routeCoordinates,
  routeSourceLabel
}) {

  return (
    <article
      className={`shuttle-card${isActive ? " shuttle-card--active" : ""}`}
    >
      <div className="shuttle-card__header">
        <span className="transport-card__tag">{route.region}</span>
        <span className="badge">{route.departurePeriod}</span>
      </div>

      <h3>{route.service}</h3>
      <p className="muted">{route.summary}</p>

      <dl className="shuttle-card__meta">
        <div>
          <dt>Price</dt>
          <dd>{formatUSD(route.price)}</dd>
        </div>
        <div>
          <dt>Schedule</dt>
          <dd>{route.schedule}</dd>
        </div>
        <div>
          <dt>Stops</dt>
          <dd>{route.stops.length}</dd>
        </div>
      </dl>

      <div className="shuttle-card__actions">
        <button
          className="btn btn--primary"
          type="button"
          onClick={() => onAdd(route)}
        >
          Add to cart
        </button>
        <button
          className="btn btn--ghost shuttle-card__button"
          type="button"
          onClick={() => onToggle(route.id)}
        >
          {isActive ? "Hide route" : "View route"}
        </button>
      </div>

      {isActive ? (
        <div className="shuttle-expanded">
          <div className="transport-card shuttle-selected">
            <span className="transport-card__tag">Selected shuttle</span>
            <h3>{route.service}</h3>
            <p className="muted">{route.summary}</p>

            <div className="shuttle-selected__meta">
              <div className="summary-card">
                <h3>{formatUSD(route.price)}</h3>
                <p className="muted">Shared service price</p>
              </div>
              <div className="summary-card">
                <h3>{route.schedule}</h3>
                <p className="muted">Departure window</p>
              </div>
            </div>

            <div className="shuttle-stopList">
              {route.stops.map((stop, index) => (
                <span key={stop.name} className="chip">
                  {index + 1}. {stop.name}
                </span>
              ))}
            </div>

            <button
              className="btn btn--primary shuttle-card__button"
              type="button"
              onClick={() => onAdd(route)}
            >
              Add shuttle to cart
            </button>
          </div>

          <div className="shuttle-mapCard">
            <div className="shuttle-mapCard__head">
              <div>
                <h3>Shuttle path map</h3>
                <p className="muted">{routeSourceLabel}</p>
                <p className="shuttle-mapDisclaimer">Routes are examples and may vary.</p>
              </div>
            </div>

            <div className="shuttle-mapCanvas">
              <Map
                viewport={viewport}
                onViewportChange={setViewport}
                center={route.viewport.center}
                zoom={route.viewport.zoom}
                theme="light"
                styles={{ light: naturalMapStyle, dark: naturalMapStyle }}
              >
                <MapControls showZoom showFullscreen />
                <MapRoute coordinates={routeCoordinates} color="#0f8b8d" width={4} />

                {route.stops.map((stop, index) => (
                  <MapMarker
                    key={stop.name}
                    longitude={stop.lng}
                    latitude={stop.lat}
                  >
                    <MarkerContent>
                      <div className="shuttle-marker">{index + 1}</div>
                    </MarkerContent>
                    <MarkerPopup closeButton>
                      <div className="shuttle-popup">
                        <strong>{stop.name}</strong>
                        <p>
                          Stop {index + 1} on the {route.service} route.
                        </p>
                      </div>
                    </MarkerPopup>
                  </MapMarker>
                ))}
              </Map>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function ShuttleExplorer() {
  const { addItem } = useCart();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [region, setRegion] = useState("");
  const [departure, setDeparture] = useState("");
  const [sort, setSort] = useState("featured");
  const [visibleRouteCount, setVisibleRouteCount] = useState(SHUTTLE_BATCH_SIZE);
  const [expandedId, setExpandedId] = useState(searchParams.get("route") || "");
  const [viewport, setViewport] = useState(undefined);
  const [routeCoordinates, setRouteCoordinates] = useState(
    getFallbackRouteCoordinates(shuttleRoutes[0])
  );
  const [routeSourceLabel, setRouteSourceLabel] = useState("Approximate route");
  const requestRef = useRef(0);

  useEffect(() => {
    const nextQuery = searchParams.get("query") || "";
    const nextRoute = searchParams.get("route") || "";
    setQuery(nextQuery);
    setRegion("");
    setDeparture("");
    setExpandedId(nextRoute);
  }, [searchParams]);

  const regions = useMemo(
    () => [...new Set(shuttleRoutes.map((route) => route.region))],
    []
  );

  const filteredRoutes = useMemo(() => {
    let items = shuttleRoutes.filter((route) => {
      const haystack = `${route.service} ${route.region} ${route.summary} ${route.stops
        .map((stop) => stop.name)
        .join(" ")}`.toLowerCase();

      if (query && !haystack.includes(query.toLowerCase())) return false;
      if (region && route.region !== region) return false;
      if (departure && route.departurePeriod !== departure) return false;

      return true;
    });

    if (sort === "price_asc") {
      items = [...items].sort((a, b) => a.price - b.price);
    }

    if (sort === "price_desc") {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    if (sort === "departure_asc") {
      items = [...items].sort(
        (a, b) => parseTimeToMinutes(a.departureTime) - parseTimeToMinutes(b.departureTime)
      );
    }

    return items;
  }, [departure, query, region, sort]);

  useEffect(() => {
    setVisibleRouteCount(SHUTTLE_BATCH_SIZE);
  }, [departure, query, region, sort]);

  useEffect(() => {
    if (expandedId && !filteredRoutes.some((route) => route.id === expandedId)) {
      setExpandedId("");
    }
  }, [expandedId, filteredRoutes]);

  const selectedRoute =
    filteredRoutes.find((route) => route.id === expandedId) ?? null;
  const selectedRouteIndex = filteredRoutes.findIndex((route) => route.id === expandedId);
  const effectiveVisibleRouteCount = selectedRouteIndex >= visibleRouteCount
    ? selectedRouteIndex + 1
    : visibleRouteCount;
  const visibleRoutes = filteredRoutes.slice(0, effectiveVisibleRouteCount);
  const shownRouteCount = Math.min(effectiveVisibleRouteCount, filteredRoutes.length);
  const hasMoreRoutes = shownRouteCount < filteredRoutes.length;

  function addShuttleToCart(route) {
    addItem({
      id: `shuttle-${route.id}`,
      type: "Shuttle",
      title: route.service,
      subtitle: route.summary,
      price: route.price,
      meta: [
        route.region,
        route.departurePeriod,
        route.schedule,
        `${route.stops.length} stops`,
        formatUSD(route.price)
      ].filter(Boolean),
      details: {
        routeId: route.id,
        region: route.region,
        schedule: route.schedule,
        departureTime: route.departureTime,
        departurePeriod: route.departurePeriod,
        stops: route.stops.map((stop) => stop.name)
      }
    });
  }

  function toggleRoute(routeId) {
    setExpandedId((current) => (current === routeId ? "" : routeId));
  }

  function loadMoreRoutes() {
    setVisibleRouteCount((current) => Math.min(current + SHUTTLE_BATCH_SIZE, filteredRoutes.length));
  }

  useEffect(() => {
    if (!selectedRoute) return;

    setViewport(selectedRoute.viewport);

    let isCancelled = false;
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;

    setRouteCoordinates(getFallbackRouteCoordinates(selectedRoute));
    setRouteSourceLabel("Loading road route...");

    fetchRoadRoute(selectedRoute)
      .then((coordinates) => {
        if (isCancelled || requestRef.current !== requestId) return;
        setRouteCoordinates(coordinates);
        setRouteSourceLabel("Road route from OSRM");
      })
      .catch(() => {
        if (isCancelled || requestRef.current !== requestId) return;
        setRouteCoordinates(getFallbackRouteCoordinates(selectedRoute));
        setRouteSourceLabel("Approximate route");
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedRoute]);

  return (
    <section className="section" id="shuttle-details">
      <div className="container">
        <div className="sectionHead">
          <div>
            <h2>Available shuttle routes</h2>
            <p className="muted">
              Filter shared transfers by route, region and departure time, then inspect the map for the selected shuttle.
            </p>
          </div>
        </div>

        <div className="controls shuttle-controls">
          <label className="control">
            Search
            <input
              type="search"
              placeholder="Route, destination or stop..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <label className="control">
            Region
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
              <option value="">All</option>
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="control">
            Departure
            <select value={departure} onChange={(event) => setDeparture(event.target.value)}>
              <option value="">All</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
            </select>
          </label>

          <label className="control">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price_asc">Price (low to high)</option>
              <option value="price_desc">Price (high to low)</option>
              <option value="departure_asc">Departure (early to late)</option>
            </select>
          </label>
        </div>

        <div className="shuttle-explorer">
          <div className="shuttle-results">
            <div className="list-head">
              <p className="muted">Showing {shownRouteCount} of {filteredRoutes.length} shuttle options</p>
            </div>

            {filteredRoutes.length ? (
              <>
                <div className="shuttle-list shuttle-list--progressive">
                  {visibleRoutes.map((route) => (
                    <ShuttleRouteCard
                      key={route.id}
                      route={route}
                      isActive={route.id === selectedRoute?.id}
                      onAdd={addShuttleToCart}
                      onToggle={toggleRoute}
                      viewport={viewport}
                      setViewport={setViewport}
                      routeCoordinates={routeCoordinates}
                      routeSourceLabel={routeSourceLabel}
                    />
                  ))}
                </div>
                {hasMoreRoutes ? (
                  <div className="load-more-row">
                    <button className="btn btn--primary" type="button" onClick={loadMoreRoutes}>
                      View more
                    </button>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="empty">
                <h3>No shuttle results</h3>
                <p className="muted">Try another search term or reset the filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
