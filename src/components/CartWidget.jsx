import { Pencil, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const coverageOptions = [
  { value: "sin_seguro", label: "No insurance" },
  { value: "seguro_basico", label: "Basic insurance" },
  { value: "full_cover", label: "Full cover" }
];

function formatUSD(value) {
  if (typeof value !== "number") return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function getPrivateTransportPriceFromDetails(details, passengers) {
  const pax = Math.max(1, Number(passengers) || 1);
  const rates = details?.rates || {};

  if (details?.base === "JACO") {
    if (typeof rates.pax_1_5 !== "number") return undefined;
    if (pax <= 5) return rates.pax_1_5;
    return rates.pax_1_5 + (pax - 5) * rates.pax_extra;
  }

  if (pax <= 5) return typeof rates.pax_1_5 === "number" ? rates.pax_1_5 : undefined;
  return typeof rates.pax_6_mas === "number" ? rates.pax_6_mas : undefined;
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function toDateTimeInputValue(date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

function getRentalDays(startDateTime, endDateTime) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const today = startOfToday();

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    start < today ||
    end < today ||
    end < start
  ) {
    return 0;
  }

  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
}

function getBillingUnits(period, days) {
  if (!days) return 0;
  if (period === "semanal") return Math.max(1, Math.ceil(days / 7));
  if (period === "mensual") return Math.max(1, Math.ceil(days / 30));
  return days;
}

function getMinimumPeriodError(period, days) {
  if (period === "semanal" && days < 7) return "Weekly rentals require at least 7 days.";
  if (period === "mensual" && days < 30) return "Monthly rentals require at least 30 days.";
  return "";
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

function hasPastDate(date) {
  if (!date) return false;
  const today = startOfToday();
  const selected = new Date(`${date}T00:00`);
  return !Number.isNaN(selected.getTime()) && selected < today;
}

export function CartWidget() {
  const { items, count, removeItem, updateItem, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [draft, setDraft] = useState(null);
  const minDateTime = toDateTimeInputValue(startOfToday());

  function openEdit(item) {
    setEditingItem(item);
    setDraft({
      quantity: item.quantity,
      coverage: item.details?.coverage || "full_cover",
      hotel: item.details?.hotel || "",
      deliveryType: item.details?.deliveryType || "delivery",
      startDateTime: item.details?.startDateTime || "",
      endDateTime: item.details?.endDateTime || "",
      roomType: item.details?.roomType || item.subtitle || "",
      adults: item.details?.adults || 2,
      children: item.details?.children || 0,
      checkIn: item.details?.checkIn || "",
      checkOut: item.details?.checkOut || "",
      passengers: item.details?.passengers || 2,
      departureDate: item.details?.departureDate || ""
    });
  }

  function closeEdit() {
    setEditingItem(null);
    setDraft(null);
  }

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function saveEdit(event) {
    event.preventDefault();
    if (!editingItem || !draft) return;

    const quantity = Math.max(1, Number(draft.quantity) || 1);

    if (editingItem.type === "Hotel" && editingItem.details && Array.isArray(editingItem.details.rooms)) {
      const room = editingItem.details.rooms.find((item) => item.tipo === draft.roomType) || editingItem.details.rooms[0];
      const nights = getHotelNights(draft.checkIn, draft.checkOut);
      if (!nights || hasPastHotelDate(draft.checkIn, draft.checkOut)) return;

      const nightlyRate = room[editingItem.details.season];
      const total = typeof nightlyRate === "number" ? nightlyRate * nights : undefined;
      const adults = Number(draft.adults) || 1;
      const children = Number(draft.children) || 0;
      const nextDetails = {
        ...editingItem.details,
        roomType: room.tipo,
        adults,
        children,
        checkIn: draft.checkIn,
        checkOut: draft.checkOut,
        nights,
        nightlyRate
      };

      updateItem(editingItem.id, {
        quantity,
        subtitle: room.tipo,
        price: total,
        details: nextDetails,
        meta: [
          editingItem.details.zone,
          room.tipo,
          editingItem.details.seasonLabel,
          `${nights} night${nights === 1 ? "" : "s"}`,
          `${adults} adult${adults === 1 ? "" : "s"}`,
          `${children} child${children === 1 ? "" : "ren"}`,
          `Check-in ${draft.checkIn}`,
          `Check-out ${draft.checkOut}`,
          typeof total === "number" ? formatUSD(total) : "Rate on request"
        ].filter(Boolean)
      });

      closeEdit();
      return;
    }

    if (editingItem.type !== "Rent a car" || !editingItem.details) {
      if (editingItem.type === "Private transport" && editingItem.details) {
        if (hasPastDate(draft.departureDate)) return;

        const passengers = Math.max(1, Number(draft.passengers) || 1);
        const total = getPrivateTransportPriceFromDetails(editingItem.details, passengers);
        const nextDetails = {
          ...editingItem.details,
          passengers,
          hotel: draft.hotel,
          departureDate: draft.departureDate
        };

        updateItem(editingItem.id, {
          quantity,
          price: total,
          details: nextDetails,
          meta: [
            `${passengers} passenger${passengers === 1 ? "" : "s"}`,
            draft.hotel,
            `Departure ${draft.departureDate}`,
            editingItem.details.base === "JACO" ? "Jaco rate" : "GAM rate",
            typeof total === "number" ? formatUSD(total) : "Rate on request"
          ].filter(Boolean)
        });

        closeEdit();
        return;
      }

      updateItem(editingItem.id, { quantity });
      closeEdit();
      return;
    }

    const rentalDays = getRentalDays(draft.startDateTime, draft.endDateTime);
    const periodError = getMinimumPeriodError(editingItem.details.period, rentalDays);
    if (!rentalDays || periodError) return;

    const coverageLabel = coverageOptions.find((option) => option.value === draft.coverage)?.label || "Full cover";
    const deliveryLabel = draft.deliveryType === "delivery" ? "Needs delivery" : "Pickup at nearest point";
    const billingUnits = getBillingUnits(editingItem.details.period, rentalDays);
    const total = editingItem.details.rates[draft.coverage] * billingUnits;
    const nextDetails = {
      ...editingItem.details,
      coverage: draft.coverage,
      coverageLabel,
      hotel: draft.hotel,
      deliveryType: draft.deliveryType,
      deliveryLabel,
      startDateTime: draft.startDateTime,
      endDateTime: draft.endDateTime,
      rentalDays,
      billingUnits
    };

    updateItem(editingItem.id, {
      quantity,
      price: total,
      details: nextDetails,
      meta: [
        `${rentalDays} day${rentalDays === 1 ? "" : "s"}`,
        `${billingUnits} ${editingItem.details.periodLabel.toLowerCase()} unit${billingUnits === 1 ? "" : "s"}`,
        coverageLabel,
        editingItem.details.transmission,
        draft.hotel,
        deliveryLabel,
        `From ${draft.startDateTime}`,
        `To ${draft.endDateTime}`
      ].filter(Boolean)
    });

    closeEdit();
  }

  const editDays = draft ? getRentalDays(draft.startDateTime, draft.endDateTime) : 0;
  const editPeriodError = editingItem?.details ? getMinimumPeriodError(editingItem.details.period, editDays) : "";
  const editUnits = editingItem?.details ? getBillingUnits(editingItem.details.period, editDays) : 0;
  const editPrice = editingItem?.type === "Rent a car" && editingItem?.details && draft
    ? editingItem.details.rates[draft.coverage] * editUnits
    : editingItem?.price || 0;
  const editHotelRoom = editingItem?.type === "Hotel" && editingItem?.details && Array.isArray(editingItem.details.rooms) && draft
    ? editingItem.details.rooms.find((item) => item.tipo === draft.roomType) || editingItem.details.rooms[0]
    : null;
  const editHotelNights = editingItem?.type === "Hotel" && draft ? getHotelNights(draft.checkIn, draft.checkOut) : 0;
  const editHotelHasPastDate = editingItem?.type === "Hotel" && draft ? hasPastHotelDate(draft.checkIn, draft.checkOut) : false;
  const editHotelPrice = editHotelRoom && editHotelNights && typeof editHotelRoom[editingItem.details.season] === "number"
    ? editHotelRoom[editingItem.details.season] * editHotelNights
    : undefined;
  const editPrivateHasPastDate = editingItem?.type === "Private transport" && draft ? hasPastDate(draft.departureDate) : false;
  const editPrivatePrice = editingItem?.type === "Private transport" && editingItem?.details && draft
    ? getPrivateTransportPriceFromDetails(editingItem.details, draft.passengers)
    : undefined;

  return (
    <div className="cart-widget">
      <button
        className="cart-fab"
        type="button"
        aria-expanded={open}
        aria-controls="cartPanel"
        onClick={() => setOpen((value) => !value)}
      >
        <ShoppingCart size={19} aria-hidden="true" />
        <span>Cart</span>
        <strong>{count}</strong>
      </button>

      {open ? (
        <div className="cart-panel" id="cartPanel">
          <div className="cart-panel__head">
            <div>
              <h3>Trip cart</h3>
              <p className="muted">{count ? `${count} selected item${count === 1 ? "" : "s"}` : "No items selected yet"}</p>
            </div>
            <button className="cart-panel__iconBtn" type="button" aria-label="Close cart" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {items.length ? (
            <>
              <div className="cart-list">
                {items.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div>
                      <span className="cart-item__type">{item.type}</span>
                      <h4>{item.title}</h4>
                      <p className="muted">{item.subtitle}</p>
                      <div className="cart-item__meta">
                        {item.meta?.map((meta) => <span key={meta}>{meta}</span>)}
                      </div>
                    </div>
                    <div className="cart-item__side">
                      {item.price ? <strong>{formatUSD(item.price)}</strong> : null}
                      {item.quantity > 1 ? <span className="muted">x{item.quantity}</span> : null}
                      <button type="button" aria-label={`Edit ${item.title}`} onClick={() => openEdit(item)}>
                        <Pencil size={16} />
                      </button>
                      <button type="button" aria-label={`Remove ${item.title}`} onClick={() => removeItem(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cart-panel__actions">
                <a className="btn btn--primary" href="#contact" onClick={() => setOpen(false)}>Request all</a>
                <button className="btn btn--ghost" type="button" onClick={clearCart}>Clear cart</button>
              </div>
            </>
          ) : (
            <p className="cart-empty muted">Add tours or rent-a-car options, then request everything together.</p>
          )}
        </div>
      ) : null}

      {editingItem && draft ? (
        <div className="cart-edit" role="dialog" aria-modal="true" aria-labelledby="cartEditTitle">
          <div className="cart-edit__backdrop" onClick={closeEdit} />
          <form className="cart-edit__card" onSubmit={saveEdit}>
            <div className="cart-panel__head">
              <div>
                <h3 id="cartEditTitle">Edit item</h3>
                <p className="muted">{editingItem.title}</p>
              </div>
              <button className="cart-panel__iconBtn" type="button" aria-label="Close edit" onClick={closeEdit}>
                <X size={18} />
              </button>
            </div>

            <label className="control">
              Quantity
              <input
                min="1"
                type="number"
                value={draft.quantity}
                onChange={(event) => updateDraft("quantity", event.target.value)}
              />
            </label>

            {editingItem.type === "Rent a car" && editingItem.details ? (
              <>
                <div className="rate-modal__grid">
                  <label className="control">
                    Coverage
                    <select value={draft.coverage} onChange={(event) => updateDraft("coverage", event.target.value)}>
                      {coverageOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>

                  <label className="control">
                    Hotel where you are staying
                    <input
                      required
                      value={draft.hotel}
                      onChange={(event) => updateDraft("hotel", event.target.value)}
                    />
                  </label>
                </div>

                <div className="rate-choice">
                  <label>
                    <input
                      type="radio"
                      name="cartDeliveryType"
                      value="delivery"
                      checked={draft.deliveryType === "delivery"}
                      onChange={(event) => updateDraft("deliveryType", event.target.value)}
                    />
                    <span>We need the car delivered</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="cartDeliveryType"
                      value="pickup"
                      checked={draft.deliveryType === "pickup"}
                      onChange={(event) => updateDraft("deliveryType", event.target.value)}
                    />
                    <span>We can pick it up at the nearest point</span>
                  </label>
                </div>

                <div className="rate-modal__grid">
                  <label className="control">
                    Start date and time
                    <input
                      required
                      type="datetime-local"
                      min={minDateTime}
                      value={draft.startDateTime}
                      onChange={(event) => updateDraft("startDateTime", event.target.value)}
                    />
                  </label>

                  <label className="control">
                    End date and time
                    <input
                      required
                      type="datetime-local"
                      min={draft.startDateTime || minDateTime}
                      value={draft.endDateTime}
                      onChange={(event) => updateDraft("endDateTime", event.target.value)}
                    />
                  </label>
                </div>

                <div className="rate-total">
                  <div>
                    <span className="rate-summary__label">Duration</span>
                    <strong>{editDays ? `${editDays} day${editDays === 1 ? "" : "s"}` : "Select dates"}</strong>
                  </div>
                  <div>
                    <span className="rate-summary__label">Estimated total</span>
                    <strong>{editDays ? formatUSD(editPrice) : "-"}</strong>
                  </div>
                </div>

                {editPeriodError ? <p className="rate-modal__error" role="alert">{editPeriodError}</p> : null}
              </>
            ) : null}

            {editingItem.type === "Hotel" && editingItem.details && Array.isArray(editingItem.details.rooms) ? (
              <>
                <div className="rate-modal__grid">
                  <label className="control">
                    Room type
                    <select value={draft.roomType} onChange={(event) => updateDraft("roomType", event.target.value)}>
                      {editingItem.details.rooms.map((room) => (
                        <option key={room.tipo} value={room.tipo}>{room.tipo}</option>
                      ))}
                    </select>
                  </label>

                  <label className="control">
                    Season
                    <input value={editingItem.details.seasonLabel} readOnly />
                  </label>
                </div>

                <div className="rate-modal__grid">
                  <label className="control">
                    Adults
                    <input
                      min="1"
                      required
                      type="number"
                      value={draft.adults}
                      onChange={(event) => updateDraft("adults", event.target.value)}
                    />
                  </label>

                  <label className="control">
                    Children
                    <input
                      min="0"
                      required
                      type="number"
                      value={draft.children}
                      onChange={(event) => updateDraft("children", event.target.value)}
                    />
                  </label>
                </div>

                <div className="rate-modal__grid">
                  <label className="control">
                    Check-in date
                    <input
                      required
                      type="date"
                      min={toDateTimeInputValue(startOfToday()).slice(0, 10)}
                      value={draft.checkIn}
                      onChange={(event) => updateDraft("checkIn", event.target.value)}
                    />
                  </label>

                  <label className="control">
                    Check-out date
                    <input
                      required
                      type="date"
                      min={draft.checkIn || toDateTimeInputValue(startOfToday()).slice(0, 10)}
                      value={draft.checkOut}
                      onChange={(event) => updateDraft("checkOut", event.target.value)}
                    />
                  </label>
                </div>

                <div className="rate-total">
                  <div>
                    <span className="rate-summary__label">Nights</span>
                    <strong>{editHotelNights ? `${editHotelNights} night${editHotelNights === 1 ? "" : "s"}` : "Select dates"}</strong>
                  </div>
                  <div>
                    <span className="rate-summary__label">Estimated total</span>
                    <strong>{editHotelNights ? formatUSD(editHotelPrice) : "-"}</strong>
                  </div>
                </div>

                {editHotelHasPastDate ? <p className="rate-modal__error" role="alert">Please select today or a future date.</p> : null}
              </>
            ) : null}

            {editingItem.type === "Private transport" && editingItem.details ? (
              <>
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
                    min={toDateTimeInputValue(startOfToday()).slice(0, 10)}
                    value={draft.departureDate}
                    onChange={(event) => updateDraft("departureDate", event.target.value)}
                  />
                </label>

                <div className="rate-total">
                  <div>
                    <span className="rate-summary__label">Route</span>
                    <strong>{editingItem.details.base === "JACO" ? "From Jaco" : "From GAM"}</strong>
                  </div>
                  <div>
                    <span className="rate-summary__label">Estimated total</span>
                    <strong>{typeof editPrivatePrice === "number" ? formatUSD(editPrivatePrice) : "Rate on request"}</strong>
                  </div>
                </div>

                {editPrivateHasPastDate ? <p className="rate-modal__error" role="alert">Please select today or a future date.</p> : null}
              </>
            ) : null}

            <div className="rate-modal__actions">
              <button
                className="btn btn--primary"
                type="submit"
                disabled={Boolean(editPeriodError) || (editingItem.type === "Rent a car" && !editDays) || (editingItem.type === "Hotel" && (!editHotelNights || editHotelHasPastDate)) || (editingItem.type === "Private transport" && editPrivateHasPastDate)}
              >
                Save changes
              </button>
              <button className="btn btn--ghost" type="button" onClick={closeEdit}>Cancel</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
