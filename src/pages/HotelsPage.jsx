import { useMemo, useState } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup
} from "@/components/ui/map";
import { ContactForm } from "../components/ContactForm";
import { ImageGalleryModal } from "../components/ImageGalleryModal";
import { SiteLayout } from "../components/SiteLayout";
import { useCart } from "../context/CartContext";
import { hotelZones } from "../lib/hotels";
import { routes } from "../lib/site";

function formatUSD(value) {
  if (typeof value !== "number") return "Ask";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function toDateInputValue(date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getHotelNights(checkIn, checkOut) {
  const start = new Date(`${checkIn}T00:00`);
  const end = new Date(`${checkOut}T00:00`);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start
  ) {
    return 0;
  }

  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
}

function hasPastHotelDate(checkIn, checkOut) {
  const today = startOfToday();
  const start = checkIn ? new Date(`${checkIn}T00:00`) : null;
  const end = checkOut ? new Date(`${checkOut}T00:00`) : null;

  return Boolean(
    (start && !Number.isNaN(start.getTime()) && start < today) ||
    (end && !Number.isNaN(end.getTime()) && end < today)
  );
}

function HotelMap({ zone, hotels, selectedHotel, onSelectHotel }) {
  const viewport = { center: zone.center, zoom: zone.zoom };
  const naturalMapStyle = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

  return (
    <div className="hotel-map">
      <Map
        center={zone.center}
        zoom={zone.zoom}
        viewport={viewport}
        theme="light"
        styles={{ light: naturalMapStyle, dark: naturalMapStyle }}
      >
        <MapControls showZoom showFullscreen />
        {hotels.map((hotel, index) => (
          <MapMarker
            key={hotel.hotel}
            longitude={hotel.coordinates[0]}
            latitude={hotel.coordinates[1]}
            onClick={() => onSelectHotel(hotel.hotel)}
          >
            <MarkerContent>
              <div className={`hotel-marker${selectedHotel === hotel.hotel ? " hotel-marker--active" : ""}`}>{index + 1}</div>
            </MarkerContent>
            <MarkerPopup>
              <div className="hotel-popup">
                <strong>{hotel.hotel}</strong>
                <p>{hotel.zoneName || zone.name}</p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

function HotelRequestModal({
  zone,
  hotel,
  roomType,
  season,
  details,
  onUpdateDetails,
  onSubmit,
  onClose
}) {
  if (!zone || !hotel) return null;

  const room = hotel.habitaciones.find((item) => item.tipo === details.roomType) || hotel.habitaciones[0];
  const price = room?.[season];
  const nights = getHotelNights(details.checkIn, details.checkOut);
  const hasPastDate = hasPastHotelDate(details.checkIn, details.checkOut);
  const total = typeof price === "number" ? price * nights : undefined;
  const minDate = toDateInputValue(startOfToday());

  return (
    <div className="rate-modal" role="dialog" aria-modal="true" aria-labelledby="hotelModalTitle">
      <div className="rate-modal__backdrop" onClick={onClose} />
      <form className="rate-modal__card" onSubmit={onSubmit}>
        <div className="rate-modal__head">
          <div>
            <p className="rent-card__tag">Hotel</p>
            <h3 id="hotelModalTitle">{hotel.hotel}</h3>
            <p className="muted">{zone.name}</p>
          </div>
          <button className="rate-modal__close" type="button" aria-label="Close" onClick={onClose}>x</button>
        </div>

        <div className="rate-modal__grid">
          <label className="control">
            Room type
            <select value={details.roomType || roomType} onChange={(event) => onUpdateDetails("roomType", event.target.value)}>
              {hotel.habitaciones.map((item) => (
                <option key={item.tipo} value={item.tipo}>{item.tipo}</option>
              ))}
            </select>
          </label>

          <label className="control">
            Season
            <input value={season === "alta" ? "High season" : "Green season"} readOnly />
          </label>
        </div>

        <div className="rate-modal__grid">
          <label className="control">
            Adults
            <input
              min="1"
              required
              type="number"
              value={details.adults}
              onChange={(event) => onUpdateDetails("adults", event.target.value)}
            />
          </label>

          <label className="control">
            Children
            <input
              min="0"
              required
              type="number"
              value={details.children}
              onChange={(event) => onUpdateDetails("children", event.target.value)}
            />
          </label>
        </div>

        <div className="rate-modal__grid">
          <label className="control">
            Check-in date
            <input
              required
              type="date"
              min={minDate}
              value={details.checkIn}
              onChange={(event) => onUpdateDetails("checkIn", event.target.value)}
            />
          </label>

          <label className="control">
            Check-out date
            <input
              required
              type="date"
              min={details.checkIn || minDate}
              value={details.checkOut}
              onChange={(event) => onUpdateDetails("checkOut", event.target.value)}
            />
          </label>
        </div>

        <div className="rate-total">
          <div>
            <span className="rate-summary__label">Room</span>
            <strong>{room?.tipo}</strong>
          </div>
          <div>
            <span className="rate-summary__label">Nights</span>
            <strong>{nights ? `${nights} night${nights === 1 ? "" : "s"}` : "Select dates"}</strong>
          </div>
          <div>
            <span className="rate-summary__label">Estimated total</span>
            <strong>{nights ? formatUSD(total) : "-"}</strong>
          </div>
        </div>

        {hasPastDate ? (
          <p className="rate-modal__error" role="alert">Please select today or a future date.</p>
        ) : null}

        {typeof price !== "number" ? (
          <p className="rate-modal__error" role="alert">This room has no listed rate for the selected season. We can request availability and price.</p>
        ) : null}

        <div className="rate-modal__actions">
          <button className="btn btn--primary" type="submit" disabled={!nights || hasPastDate}>Add to cart</button>
          <button className="btn btn--ghost" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export function HotelsPage() {
  const { addItem } = useCart();
  const [zoneId, setZoneId] = useState("all");
  const [mapZoneId, setMapZoneId] = useState("all");
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("alta");
  const [selectedHotel, setSelectedHotel] = useState("");
  const [galleryState, setGalleryState] = useState(null);
  const [hotelRequest, setHotelRequest] = useState(null);
  const [hotelRequestDetails, setHotelRequestDetails] = useState({
    roomType: "",
    adults: "2",
    children: "0",
    checkIn: "",
    checkOut: ""
  });

  const visibleZones = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return hotelZones
      .filter((zone) => zoneId === "all" || zone.id === zoneId)
      .map((zone) => ({
        ...zone,
        hotels: zone.hotels.filter((hotel) => {
          const haystack = `${zone.name} ${hotel.hotel} ${hotel.description} ${hotel.habitaciones.map((room) => room.tipo).join(" ")}`.toLowerCase();
          return !normalizedQuery || haystack.includes(normalizedQuery);
        })
      }))
      .filter((zone) => zone.hotels.length);
  }, [query, zoneId]);

  const allMapZone = {
    id: "all",
    name: "All hotel zones",
    center: [-84.18, 9.92],
    zoom: 6.7,
    description: "Overview of all listed hotel regions across Costa Rica.",
    hotels: hotelZones.flatMap((zone) => zone.hotels.map((hotel) => ({ ...hotel, zoneName: zone.name })))
  };
  const activeMapZone = mapZoneId === "all"
    ? allMapZone
    : hotelZones.find((zone) => zone.id === mapZoneId) || allMapZone;
  const activeMapHotels = activeMapZone.hotels;

  function selectZone(nextZoneId) {
    setZoneId(nextZoneId);
    setMapZoneId(nextZoneId);
    setSelectedHotel("");
  }

  function openHotelRequest(zone, hotel, room) {
    setHotelRequest({ zone, hotel, room });
    setHotelRequestDetails({
      roomType: room.tipo,
      adults: "2",
      children: "0",
      checkIn: "",
      checkOut: ""
    });
  }

  function closeHotelRequest() {
    setHotelRequest(null);
  }

  function updateHotelRequestDetail(field, value) {
    setHotelRequestDetails((current) => ({ ...current, [field]: value }));
  }

  function addHotelToCart(event) {
    event.preventDefault();
    if (!hotelRequest) return;

    const { zone, hotel } = hotelRequest;
    const room = hotel.habitaciones.find((item) => item.tipo === hotelRequestDetails.roomType) || hotelRequest.room;
    const price = room[season];
    const nights = getHotelNights(hotelRequestDetails.checkIn, hotelRequestDetails.checkOut);
    if (!nights || hasPastHotelDate(hotelRequestDetails.checkIn, hotelRequestDetails.checkOut)) return;

    const seasonLabel = season === "alta" ? "High season" : "Green season";
    const total = typeof price === "number" ? price * nights : undefined;

    addItem({
      id: `hotel-${zone.id}-${hotel.hotel}-${room.tipo}-${season}-${hotelRequestDetails.checkIn}-${hotelRequestDetails.checkOut}-${hotelRequestDetails.adults}-${hotelRequestDetails.children}`,
      type: "Hotel",
      title: hotel.hotel,
      subtitle: room.tipo,
      price: total,
      details: {
        zone: zone.name,
        season,
        seasonLabel,
        roomType: room.tipo,
        rooms: hotel.habitaciones,
        adults: Number(hotelRequestDetails.adults) || 1,
        children: Number(hotelRequestDetails.children) || 0,
        checkIn: hotelRequestDetails.checkIn,
        checkOut: hotelRequestDetails.checkOut,
        nights,
        nightlyRate: price
      },
      meta: [
        zone.name,
        room.tipo,
        seasonLabel,
        `${nights} night${nights === 1 ? "" : "s"}`,
        `${hotelRequestDetails.adults} adult${Number(hotelRequestDetails.adults) === 1 ? "" : "s"}`,
        `${hotelRequestDetails.children} child${Number(hotelRequestDetails.children) === 1 ? "" : "ren"}`,
        `Check-in ${hotelRequestDetails.checkIn}`,
        `Check-out ${hotelRequestDetails.checkOut}`,
        typeof total === "number" ? formatUSD(total) : "Rate on request"
      ].filter(Boolean)
    });

    closeHotelRequest();
  }

  function openHotelGallery(hotel) {
    setGalleryState({
      title: hotel.hotel,
      gallery: hotel.gallery || [hotel.image],
      index: 0
    });
  }

  return (
    <SiteLayout
      homeTo={routes.home}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#"
    >
      <main>
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title">Hotels in Costa Rica</h1>
            <p className="muted">
              Browse hotel options by region, compare room prices and add lodging to your trip request.
            </p>

            <div className="service-pills" aria-label="Hotel zones">
              <button
                className={`tour-origin${zoneId === "all" ? " tour-origin--active" : ""}`}
                type="button"
                onClick={() => selectZone("all")}
              >
                All zones
              </button>
              {hotelZones.map((zone) => (
                <button
                  key={zone.id}
                  className={`tour-origin${zoneId === zone.id ? " tour-origin--active" : ""}`}
                  type="button"
                  onClick={() => selectZone(zone.id)}
                >
                  {zone.name}
                </button>
              ))}
            </div>

            <div className="controls hotel-controls">
              <label className="control">
                Search hotel
                <input
                  type="search"
                  placeholder="Hotel, room or zone..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <label className="control">
                Zone
                <select value={zoneId} onChange={(event) => selectZone(event.target.value)}>
                  <option value="all">All zones</option>
                  {hotelZones.map((zone) => <option key={zone.id} value={zone.id}>{zone.name}</option>)}
                </select>
              </label>

              <label className="control">
                Season
                <select value={season} onChange={(event) => setSeason(event.target.value)}>
                  <option value="alta">High season</option>
                  <option value="verde">Green season</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container hotel-overview">
            <div>
              <h2>Hotel zones</h2>
              <p className="muted">{activeMapZone.description}</p>
              <div className="hotel-zoneList">
                <button
                  type="button"
                  className={activeMapZone.id === "all" ? "hotel-zoneBtn hotel-zoneBtn--active" : "hotel-zoneBtn"}
                  onClick={() => selectZone("all")}
                >
                  <strong>All</strong>
                  <span>{hotelZones.reduce((total, zone) => total + zone.hotels.length, 0)} hotels</span>
                </button>
                {hotelZones.map((zone) => (
                  <button
                    key={zone.id}
                    type="button"
                    className={activeMapZone.id === zone.id ? "hotel-zoneBtn hotel-zoneBtn--active" : "hotel-zoneBtn"}
                    onClick={() => selectZone(zone.id)}
                  >
                    <strong>{zone.name}</strong>
                    <span>{zone.hotels.length} hotel{zone.hotels.length === 1 ? "" : "s"}</span>
                  </button>
                ))}
              </div>
            </div>
            <HotelMap
              key={activeMapZone.id}
              zone={activeMapZone}
              hotels={activeMapHotels}
              selectedHotel={selectedHotel}
              onSelectHotel={setSelectedHotel}
            />
          </div>
        </section>

        <section className="section">
          <div className="container hotel-sections">
            {visibleZones.map((zone) => (
              <div className="hotel-zone" key={zone.id} id={zone.id}>
                <div className="sectionHead">
                  <div>
                    <h2>{zone.name}</h2>
                    <p className="muted">{zone.description}</p>
                  </div>
                </div>

                <div className="hotel-grid">
                  {zone.hotels.map((hotel) => (
                    <article
                      key={hotel.hotel}
                      className={`hotel-card${selectedHotel === hotel.hotel ? " hotel-card--active" : ""}`}
                    >
                      <div className="hotel-card__media">
                        <button type="button" aria-label={`View ${hotel.hotel} image`} onClick={() => openHotelGallery(hotel)}>
                          <img src={hotel.image} alt={hotel.hotel} loading="lazy" />
                        </button>
                        <span>{zone.name}</span>
                      </div>
                      <div className="hotel-card__body">
                        <h3>{hotel.hotel}</h3>
                        <p className="muted">{hotel.description}</p>

                        <div className="hotel-roomList">
                          {hotel.habitaciones.map((room) => {
                            const price = room[season];
                            return (
                              <div className="hotel-room" key={room.tipo}>
                                <div>
                                  <strong>{room.tipo}</strong>
                                  <span>{season === "alta" ? "High season" : "Green season"}</span>
                                </div>
                                <div className="hotel-room__side">
                                  <strong>{formatUSD(price)}</strong>
                                  <button className="btn btn--ghost" type="button" onClick={() => openHotelRequest(zone, hotel, room)}>
                                    Add
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}

            {visibleZones.length === 0 ? (
              <div className="empty">
                <h3>No hotels found</h3>
                <p className="muted">Try another zone or search term.</p>
              </div>
            ) : null}
          </div>
        </section>

        <ContactForm
          title="Request hotel availability"
          text="Add hotel options to the cart or tell us your dates, area and preferred room type."
          placeholder="Example: We need 2 nights in Arenal for 2 adults, preferably a double room with transfers."
          buttonLabel="Send hotel request"
        />

        {galleryState ? (
          <ImageGalleryModal
            title={galleryState.title}
            gallery={galleryState.gallery}
            index={galleryState.index}
            onChangeIndex={(index) => setGalleryState((current) => ({ ...current, index }))}
            onClose={() => setGalleryState(null)}
          />
        ) : null}

        {hotelRequest ? (
          <HotelRequestModal
            zone={hotelRequest.zone}
            hotel={hotelRequest.hotel}
            roomType={hotelRequest.room.tipo}
            season={season}
            details={hotelRequestDetails}
            onUpdateDetails={updateHotelRequestDetail}
            onSubmit={addHotelToCart}
            onClose={closeHotelRequest}
          />
        ) : null}
      </main>
    </SiteLayout>
  );
}
