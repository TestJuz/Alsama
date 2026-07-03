import { useMemo, useState } from "react";
import { createTourCartItem, getTourBookingTotal, getTourPassengerCounts } from "../lib/tourBooking";

function formatUSD(value) {
  if (typeof value !== "number") return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function minDateValue() {
  const today = startOfToday();
  const offsetDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function hasPastDate(date) {
  if (!date) return false;
  const selected = new Date(`${date}T00:00`);
  return !Number.isNaN(selected.getTime()) && selected < startOfToday();
}

export function TourBookingModal({ tour, onClose, onAdd }) {
  const [details, setDetails] = useState({
    adults: 2,
    children: 0,
    tourDate: "",
    hotel: ""
  });

  const minDate = useMemo(() => minDateValue(), []);
  const pastDate = hasPastDate(details.tourDate);
  const total = getTourBookingTotal(tour, details);
  const { adults, children, totalPassengers } = getTourPassengerCounts(details);

  function updateDetail(field, value) {
    setDetails((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!details.tourDate || !details.hotel.trim() || pastDate) return;
    onAdd(createTourCartItem(tour, details));
  }

  return (
    <div className="rate-modal" role="dialog" aria-modal="true" aria-labelledby="tourBookingModalTitle">
      <div className="rate-modal__backdrop" onClick={onClose} />
      <form className="rate-modal__card" onSubmit={submit}>
        <div className="rate-modal__head">
          <div>
            <h3 id="tourBookingModalTitle">Tour details</h3>
            <p className="muted">{tour.title}</p>
          </div>
          <button className="rate-modal__close" type="button" aria-label="Close" onClick={onClose}>x</button>
        </div>

        <div className="rate-modal__grid">
          <label className="control">
            Adults
            <input
              min="1"
              required
              type="number"
              value={details.adults}
              onChange={(event) => updateDetail("adults", event.target.value)}
            />
          </label>

          <label className="control">
            Children
            <input
              min="0"
              required
              type="number"
              value={details.children}
              onChange={(event) => updateDetail("children", event.target.value)}
            />
          </label>
        </div>

        <div className="rate-modal__grid">
          <label className="control">
            Tour date
            <input
              required
              type="date"
              min={minDate}
              value={details.tourDate}
              onChange={(event) => updateDetail("tourDate", event.target.value)}
            />
          </label>

          <label className="control">
            Hotel where you are staying
            <input
              required
              value={details.hotel}
              onChange={(event) => updateDetail("hotel", event.target.value)}
              placeholder="Hotel name"
            />
          </label>
        </div>

        <div className="rate-total">
          <div>
            <span className="rate-summary__label">Passengers</span>
            <strong>{totalPassengers}</strong>
          </div>
          <div>
            <span className="rate-summary__label">Base price</span>
            <strong>{formatUSD(tour.price)}</strong>
          </div>
          <div>
            <span className="rate-summary__label">Estimated total</span>
            <strong>{formatUSD(total)}</strong>
          </div>
        </div>

        <p className="rate-modal__note muted">
          Calculation uses the listed tour price per person for {adults} adult{adults === 1 ? "" : "s"} and {children} child{children === 1 ? "" : "ren"}.
        </p>
        {pastDate ? <p className="rate-modal__error" role="alert">Please select today or a future date.</p> : null}

        <div className="rate-modal__actions">
          <button className="btn btn--primary" type="submit" disabled={!details.tourDate || !details.hotel.trim() || pastDate}>Add to cart</button>
          <button className="btn btn--ghost" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}