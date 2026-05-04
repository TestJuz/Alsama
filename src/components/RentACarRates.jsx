import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { rentACarRates } from "../lib/rentacarRates";

const periods = [
  { value: "diario", label: "Daily" },
  { value: "semanal", label: "Weekly" },
  { value: "mensual", label: "Monthly" }
];

const sortOptions = [
  { value: "category", label: "Category" },
  { value: "price_asc", label: "Lowest price" },
  { value: "price_desc", label: "Highest price" },
  { value: "full_asc", label: "Lowest full cover" }
];

const coverageOptions = [
  { value: "sin_seguro", label: "No insurance" },
  { value: "seguro_basico", label: "Basic insurance" },
  { value: "full_cover", label: "Full cover" }
];

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2
  }).format(value);
}

function transmissionLabel(value) {
  return value || "Ask";
}

function matchesTransmission(value, selectedTransmission) {
  if (!selectedTransmission) return true;
  if (value === "MAN/AUT") return selectedTransmission === "MANUAL" || selectedTransmission === "AUTOMATICO";
  return transmissionLabel(value) === selectedTransmission;
}

function toDateTimeInputValue(date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function RentACarRates() {
  const { addItem } = useCart();
  const [period, setPeriod] = useState("diario");
  const [query, setQuery] = useState("");
  const [transmission, setTransmission] = useState("");
  const [sort, setSort] = useState("category");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [requestDetails, setRequestDetails] = useState({
    coverage: "full_cover",
    hotel: "",
    deliveryType: "delivery",
    startDateTime: "",
    endDateTime: ""
  });
  const [requestError, setRequestError] = useState("");

  const transmissionOptions = useMemo(() => {
    const values = new Set(
      Object.values(rentACarRates)
        .flat()
        .flatMap((item) => item.transmision === "MAN/AUT"
          ? ["MANUAL", "AUTOMATICO"]
          : [transmissionLabel(item.transmision)]
        )
    );

    return [...values].sort();
  }, []);

  const filteredRates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const items = rentACarRates[period].filter((item) => {
      const vehicleTransmission = transmissionLabel(item.transmision);
      const haystack = `${item.categoria} ${item.ejemplo} ${vehicleTransmission}`.toLowerCase();

      if (normalizedQuery && !haystack.includes(normalizedQuery)) return false;
      if (!matchesTransmission(item.transmision, transmission)) return false;

      return true;
    });

    return [...items].sort((a, b) => {
      if (sort === "price_asc") return a.sin_seguro - b.sin_seguro;
      if (sort === "price_desc") return b.sin_seguro - a.sin_seguro;
      if (sort === "full_asc") return a.full_cover - b.full_cover;
      return a.categoria.localeCompare(b.categoria);
    });
  }, [period, query, sort, transmission]);

  const cheapest = filteredRates[0];
  const periodLabel = periods.find((item) => item.value === period)?.label || period;
  const minDateTime = toDateTimeInputValue(startOfToday());

  function getRentalDays() {
    const start = new Date(requestDetails.startDateTime);
    const end = new Date(requestDetails.endDateTime);
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

  function getBillingUnits(days) {
    if (!days) return 0;
    if (period === "semanal") return Math.max(1, Math.ceil(days / 7));
    if (period === "mensual") return Math.max(1, Math.ceil(days / 30));
    return days;
  }

  function openRequestModal(item) {
    setSelectedVehicle(item);
    setRequestError("");
    setRequestDetails({
      coverage: "full_cover",
      hotel: "",
      deliveryType: "delivery",
      startDateTime: "",
      endDateTime: ""
    });
  }

  function closeRequestModal() {
    setSelectedVehicle(null);
    setRequestError("");
  }

  function updateRequestDetail(field, value) {
    setRequestError("");
    setRequestDetails((current) => ({ ...current, [field]: value }));
  }

  function getMinimumDaysForPeriod() {
    if (period === "semanal") return 7;
    if (period === "mensual") return 30;
    return 1;
  }

  function getMinimumPeriodError(days) {
    if (period === "semanal" && days < 7) {
      return "Weekly rentals require at least 7 days.";
    }

    if (period === "mensual" && days < 30) {
      return "Monthly rentals require at least 30 days.";
    }

    return "";
  }

  function addRateToCart(event) {
    event.preventDefault();

    if (!selectedVehicle) return;

    const rentalDays = getRentalDays();
    if (!rentalDays) {
      setRequestError("Please select a valid start and end date.");
      return;
    }

    const periodError = getMinimumPeriodError(rentalDays);
    if (periodError) {
      setRequestError(periodError);
      return;
    }

    const coverageLabel = coverageOptions.find((option) => option.value === requestDetails.coverage)?.label || "Full cover";
    const billingUnits = getBillingUnits(rentalDays);
    const total = selectedVehicle[requestDetails.coverage] * billingUnits;
    const deliveryLabel = requestDetails.deliveryType === "delivery"
      ? "Needs delivery"
      : "Pickup at nearest point";

    addItem({
      id: `rent-${period}-${selectedVehicle.categoria}-${selectedVehicle.ejemplo}-${requestDetails.coverage}-${requestDetails.startDateTime}-${requestDetails.endDateTime}-${requestDetails.deliveryType}`,
      type: "Rent a car",
      title: selectedVehicle.categoria,
      subtitle: selectedVehicle.ejemplo,
      price: total,
      details: {
        period,
        periodLabel,
        rates: {
          sin_seguro: selectedVehicle.sin_seguro,
          seguro_basico: selectedVehicle.seguro_basico,
          full_cover: selectedVehicle.full_cover
        },
        coverage: requestDetails.coverage,
        coverageLabel,
        hotel: requestDetails.hotel,
        deliveryType: requestDetails.deliveryType,
        deliveryLabel,
        startDateTime: requestDetails.startDateTime,
        endDateTime: requestDetails.endDateTime,
        rentalDays,
        billingUnits,
        transmission: transmissionLabel(selectedVehicle.transmision)
      },
      meta: [
        `${rentalDays} day${rentalDays === 1 ? "" : "s"}`,
        `${billingUnits} ${periodLabel.toLowerCase()} unit${billingUnits === 1 ? "" : "s"}`,
        coverageLabel,
        transmissionLabel(selectedVehicle.transmision),
        requestDetails.hotel,
        deliveryLabel,
        `From ${requestDetails.startDateTime}`,
        `To ${requestDetails.endDateTime}`
      ].filter(Boolean)
    });

    closeRequestModal();
  }

  const modalDays = getRentalDays();
  const modalUnits = getBillingUnits(modalDays);
  const modalMinimumDays = getMinimumDaysForPeriod();
  const modalMinimumError = modalDays ? getMinimumPeriodError(modalDays) : "";
  const modalCoverageLabel = coverageOptions.find((option) => option.value === requestDetails.coverage)?.label || "Full cover";
  const modalUnitPrice = selectedVehicle ? selectedVehicle[requestDetails.coverage] : 0;
  const modalTotal = modalUnitPrice * modalUnits;

  return (
    <section className="section section--alt" id="rates">
      <div className="container">
        <div className="sectionHead">
          <div>
            <h2>Rent a car rates</h2>
            <p className="muted">
              Compare vehicle categories by rental period, transmission and coverage option.
            </p>
          </div>
          <a className="btn btn--ghost" href="#contact">Request selected option</a>
        </div>

        <div className="rate-panel">
          <div className="rate-tabs" aria-label="Rental period">
            {periods.map((item) => (
              <button
                key={item.value}
                className={`rate-tab${period === item.value ? " rate-tab--active" : ""}`}
                type="button"
                onClick={() => setPeriod(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="rate-controls">
            <label className="control">
              Search vehicle
              <input
                type="search"
                placeholder="Category or model..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <label className="control">
              Transmission
              <select value={transmission} onChange={(event) => setTransmission(event.target.value)}>
                <option value="">All</option>
                {transmissionOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="control">
              Sort
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                {sortOptions.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="rate-summary">
            <div>
              <span className="rate-summary__label">Showing</span>
              <strong>{filteredRates.length} options</strong>
            </div>
            <div>
              <span className="rate-summary__label">Lowest from</span>
              <strong>{cheapest ? formatUSD(cheapest.sin_seguro) : "-"}</strong>
            </div>
            <p className="muted">Prices are shown in USD and may vary by dates, availability and final rental conditions.</p>
          </div>

          <div className="rate-tableWrap">
            <table className="rate-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Example</th>
                  <th>Transmission</th>
                  <th>No insurance</th>
                  <th>Basic insurance</th>
                  <th>Full cover</th>
                  <th>Cart</th>
                </tr>
              </thead>
              <tbody>
                {filteredRates.map((item) => (
                    <tr key={`${period}-${item.categoria}-${item.ejemplo}-${item.sin_seguro}`}>
                      <td data-label="Category">
                        <strong>{item.categoria}</strong>
                      </td>
                      <td data-label="Example">{item.ejemplo}</td>
                      <td data-label="Transmission">
                        <span className="rate-pill">{transmissionLabel(item.transmision)}</span>
                      </td>
                      <td data-label="No insurance">{formatUSD(item.sin_seguro)}</td>
                      <td data-label="Basic insurance">{formatUSD(item.seguro_basico)}</td>
                      <td data-label="Full cover">
                        <strong>{formatUSD(item.full_cover)}</strong>
                      </td>
                      <td data-label="Cart">
                        <button
                          className="btn btn--ghost rate-addBtn"
                          type="button"
                          onClick={() => openRequestModal(item)}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>

            {filteredRates.length === 0 ? (
              <div className="empty">
                <h3>No vehicle results</h3>
                <p className="muted">Try another search term or change the filters.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {selectedVehicle ? (
        <div className="rate-modal" role="dialog" aria-modal="true" aria-labelledby="rateModalTitle">
          <div className="rate-modal__backdrop" onClick={closeRequestModal} />
          <form className="rate-modal__card" onSubmit={addRateToCart}>
            <div className="rate-modal__head">
              <div>
                <p className="rent-card__tag">Rent a car</p>
                <h3 id="rateModalTitle">{selectedVehicle.categoria}</h3>
                <p className="muted">{selectedVehicle.ejemplo} | {transmissionLabel(selectedVehicle.transmision)}</p>
              </div>
              <button className="rate-modal__close" type="button" aria-label="Close" onClick={closeRequestModal}>x</button>
            </div>

            <div className="rate-modal__grid">
              <label className="control">
                Coverage
                <select
                  value={requestDetails.coverage}
                  onChange={(event) => updateRequestDetail("coverage", event.target.value)}
                >
                  {coverageOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label className="control">
                Hotel where you are staying
                <input
                  required
                  placeholder="Hotel or place name"
                  value={requestDetails.hotel}
                  onChange={(event) => updateRequestDetail("hotel", event.target.value)}
                />
              </label>
            </div>

            <div className="rate-choice">
              <label>
                <input
                  type="radio"
                  name="deliveryType"
                  value="delivery"
                  checked={requestDetails.deliveryType === "delivery"}
                  onChange={(event) => updateRequestDetail("deliveryType", event.target.value)}
                />
                <span>We need the car delivered</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryType"
                  value="pickup"
                  checked={requestDetails.deliveryType === "pickup"}
                  onChange={(event) => updateRequestDetail("deliveryType", event.target.value)}
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
                  value={requestDetails.startDateTime}
                  onChange={(event) => updateRequestDetail("startDateTime", event.target.value)}
                />
              </label>

              <label className="control">
                End date and time
                <input
                  required
                  type="datetime-local"
                  min={requestDetails.startDateTime || minDateTime}
                  value={requestDetails.endDateTime}
                  onChange={(event) => updateRequestDetail("endDateTime", event.target.value)}
                />
              </label>
            </div>

            <div className="rate-total">
              <div>
                <span className="rate-summary__label">Duration</span>
                <strong>{modalDays ? `${modalDays} day${modalDays === 1 ? "" : "s"}` : "Select dates"}</strong>
              </div>
              <div>
                <span className="rate-summary__label">Coverage</span>
                <strong>{modalCoverageLabel}</strong>
              </div>
              <div>
                <span className="rate-summary__label">Estimated total</span>
                <strong>{modalDays ? formatUSD(modalTotal) : "-"}</strong>
              </div>
            </div>

            <p className="muted rate-modal__note">
              Total uses the selected {periodLabel.toLowerCase()} rate and rounds the rental duration up to the next billing unit.
              {period !== "diario" ? ` Minimum duration: ${modalMinimumDays} days.` : ""}
            </p>

            {requestError || modalMinimumError ? (
              <p className="rate-modal__error" role="alert">{requestError || modalMinimumError}</p>
            ) : null}

            <div className="rate-modal__actions">
              <button className="btn btn--primary" type="submit" disabled={!modalDays || Boolean(modalMinimumError)}>Add to cart</button>
              <button className="btn btn--ghost" type="button" onClick={closeRequestModal}>Cancel</button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
