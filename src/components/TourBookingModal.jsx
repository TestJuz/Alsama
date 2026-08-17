import { useMemo, useState } from "react";
import {
  getOneBusinessDayAdvanceDateInputValue,
  isDateBeforeMinimumInput,
  ONE_BUSINESS_DAY_NOTICE_ERROR
} from "../lib/bookingDates";
import { createTourCartItem, getTourBookingTotal, getTourPassengerCounts } from "../lib/tourBooking";

function formatUSD(value) {
  if (typeof value !== "number") return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function TourBookingModal({ tour, onClose, onAdd }) {
  const [details, setDetails] = useState({
    adults: 2,
    children: 0,
    tourDate: "",
    hotel: ""
  });

  const minDate = useMemo(() => getOneBusinessDayAdvanceDateInputValue(), []);
  const dateTooSoon = isDateBeforeMinimumInput(details.tourDate, minDate);
  const total = getTourBookingTotal(tour, details);
  const { adults, children, totalPassengers } = getTourPassengerCounts(details);

  function updateDetail(field, value) {
    setDetails((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!details.tourDate || !details.hotel.trim() || dateTooSoon) return;
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
        {dateTooSoon ? <p className="rate-modal__error" role="alert">{ONE_BUSINESS_DAY_NOTICE_ERROR}</p> : null}

        <div className="rate-modal__actions">
          <button className="btn btn--primary" type="submit" disabled={!details.tourDate || !details.hotel.trim() || dateTooSoon}>Add to cart</button>
          <button className="btn btn--ghost" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
