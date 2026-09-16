import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Briefcase, CarFront, Cog, DoorOpen, Search, Users } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import {
  getOneBusinessDayAdvanceDateTimeInputValue,
  isDateTimeBeforeMinimumInput
} from "../lib/bookingDates";
import { getRentalRateBreakdown, rentACarRates } from "../lib/rentacarRates";
import { asset } from "../lib/site";

const periods = [
  { value: "diario", label: "Daily" },
  { value: "semanal", label: "Weekly" },
  { value: "mensual", label: "Monthly" }
];

const vehicleTypes = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "pickup", label: "Pickup" },
  { value: "van", label: "Van" }
];

const passengerOptions = [
  { value: "", label: "Quantity" },
  { value: "4", label: "4+ passengers" },
  { value: "5", label: "5+ passengers" },
  { value: "7", label: "7+ passengers" },
  { value: "9", label: "9+ passengers" }
];

const coverageOptions = [
  { value: "seguro_basico", label: "Basic insurance" },
  { value: "full_cover", label: "Full cover" }
];

const vehicleTypeOrder = {
  sedan: 1,
  suv: 2,
  pickup: 3,
  van: 4
};

const vehicleImages = {
  "TOYOTA AGYA": asset("img/Rent-a-car/toyota-agya-auto.avif"),
  "SUZUKI SWIFT": asset("img/Rent-a-car/suzuki-swift-dzire-auto.avif"),
  "VOLKSWAGEN NIVUS": asset("img/Rent-a-car/VOLKSWAGEN-NIVUS.avif"),
  "TOYOTA COROLLA": asset("img/Rent-a-car/toyota-corolla-auto.avif"),
  "TOYOTA YARIS CROSS": asset("img/Rent-a-car/Toyota-Yaris-Cross.avif"),
  "TOYOTA COROLLA CROSS": asset("img/Rent-a-car/TOYOTA-COROLLA-CROSS.avif"),
  "SUZUKI VITARA": asset("img/Rent-a-car/SUZUKI-VITARA.avif"),
  "TOYOTA RAV4": asset("img/Rent-a-car/TOYOTA-RAV4.avif"),
  "TOYOTA RUSH 4X2": asset("img/Rent-a-car/TOYOTA-RUSH-4X2.avif"),
  "FORD BRONCO": asset("img/Rent-a-car/Ford-Broncos.avif"),
  "TOYOTA BZ4X 4X4": asset("img/Rent-a-car/TOYOTA-BZ4X-4X4.avif"),
  "TOYOTA HILUX": asset("img/Rent-a-car/TOYOTA-HILUX.avif"),
  "TOYOTA FORTUNER": asset("img/Rent-a-car/TOYOTA-fortuner.avif"),
  "FORD EVEREST": asset("img/Rent-a-car/FORD-EVEREST.avif"),
  "TOYOTA HIACE": asset("img/Rent-a-car/TOYOTA-HIACE.avif"),
  "HYUNDAI STARIA": asset("img/Rent-a-car/HYUNDAI-STARIA.avif"),
  "FORD EXPEDITION": asset("img/Rent-a-car/FORD-EXPEDITION.avif")
};

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2
  }).format(value);
}

function transmissionLabel(value) {
  if (value === "AUTOMATICO") return "Automatic";
  if (value === "MANUAL") return "Manual";
  if (value === "MAN/AUT") return "Manual / automatic";
  return "Ask us";
}

function getVehicleMeta(item) {
  const category = item.categoria.toUpperCase();

  if (category.includes("MICROBUS")) {
    return {
      type: "van",
      title: "Van",
      model: item.modelo,
      passengers: 9,
      luggage: 5,
      doors: 4
    };
  }

  if (category.includes("PICK")) {
    return {
      type: "pickup",
      title: "Pickup",
      model: item.modelo,
      passengers: 5,
      luggage: 4,
      doors: 4
    };
  }

  if (category.includes("SUV") || category.includes("4X4") || category.includes("4X2")) {
    return {
      type: "suv",
      title: category.includes("FULL") || category.includes("PREMIUM") ? "Premium SUV" : "SUV",
      model: item.modelo,
      passengers: 5,
      luggage: 3,
      doors: 4
    };
  }

  if (category.includes("MINI")) {
    return {
      type: "sedan",
      title: "Mini vehicle",
      model: item.modelo,
      passengers: 4,
      luggage: 2,
      doors: 4
    };
  }

  if (category.includes("ECONOMICO")) {
    return {
      type: "sedan",
      title: "Economy vehicle",
      model: item.modelo,
      passengers: 4,
      luggage: 2,
      doors: 4
    };
  }

  if (category.includes("COMPACTO")) {
    return {
      type: "sedan",
      title: "Compact vehicle",
      model: item.modelo,
      passengers: 5,
      luggage: 2,
      doors: 4
    };
  }

  return {
    type: "sedan",
    title: category.includes("LUXURY") ? "Premium vehicle" : "Intermediate vehicle",
    model: item.modelo,
    passengers: 5,
    luggage: 2,
    doors: 4
  };
}

function enrichVehicle(item, index) {
  const meta = getVehicleMeta(item);

  return {
    ...item,
    ...meta,
    image: vehicleImages[item.modelo],
    key: `${item.categoria}-${item.transmision || "ask"}-${item.seguro_basico}-${index}`
  };
}

function formatPricingBreakdown(breakdown, language) {
  const labels = {
    en: { month: ["month", "months"], week: ["week", "weeks"], day: ["day", "days"] },
    es: { month: ["mes", "meses"], week: ["semana", "semanas"], day: ["día", "días"] },
    fr: { month: ["mois", "mois"], week: ["semaine", "semaines"], day: ["jour", "jours"] }
  }[language] || { month: ["month", "months"], week: ["week", "weeks"], day: ["day", "days"] };

  return [
    [breakdown.months, labels.month],
    [breakdown.weeks, labels.week],
    [breakdown.days, labels.day]
  ]
    .filter(([count]) => count > 0)
    .map(([count, unit]) => `${count} ${unit[count === 1 ? 0 : 1]}`)
    .join(" + ");
}
export function RentACarRates() {
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialPeriod = periods.some((item) => item.value === searchParams.get("period")) ? searchParams.get("period") : "diario";
  const [period, setPeriod] = useState(initialPeriod);
  const [activeTypes, setActiveTypes] = useState(vehicleTypes.map((item) => item.value));
  const [passengers, setPassengers] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [requestDetails, setRequestDetails] = useState({
    coverage: "full_cover",
    hotel: "",
    deliveryType: "delivery",
    startDateTime: "",
    endDateTime: ""
  });
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    const nextPeriod = periods.some((item) => item.value === searchParams.get("period")) ? searchParams.get("period") : "diario";
    setPeriod(nextPeriod);
  }, [searchParams]);

  const filteredRates = useMemo(() => {
    const minPassengers = passengers ? Number(passengers) : 0;

    return rentACarRates[period]
      .map(enrichVehicle)
      .filter((item) => {
        const matchesType = activeTypes.length === 0 || activeTypes.includes(item.type);
        const matchesPassengers = !minPassengers || item.passengers >= minPassengers;

        return matchesType && matchesPassengers;
      })
      .sort((a, b) => {
        const typeDiff = vehicleTypeOrder[a.type] - vehicleTypeOrder[b.type];
        if (typeDiff) return typeDiff;
        return a.seguro_basico - b.seguro_basico;
      });
  }, [activeTypes, passengers, period]);

  const cheapest = filteredRates[0];
  const periodLabel = t(periods.find((item) => item.value === period)?.label || period);
  const minDateTime = getOneBusinessDayAdvanceDateTimeInputValue();

  function toggleVehicleType(type) {
    setActiveTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  }

  function getRentalDays() {
    const start = new Date(requestDetails.startDateTime);
    const end = new Date(requestDetails.endDateTime);
    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      isDateTimeBeforeMinimumInput(requestDetails.startDateTime, minDateTime) ||
      end < start
    ) {
      return 0;
    }

    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
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


  function addRateToCart(event) {
    event.preventDefault();

    if (!selectedVehicle) return;

    const rentalDays = getRentalDays();
    if (!rentalDays) {
      setRequestError(t("Please select a valid start and end date."));
      return;
    }

    const coverageLabel = coverageOptions.find((option) => option.value === requestDetails.coverage)?.label || "Full cover";
    const pricing = getRentalRateBreakdown(
      selectedVehicle.categoria,
      selectedVehicle.transmision,
      requestDetails.coverage,
      rentalDays
    );
    const pricingLabel = formatPricingBreakdown(pricing, language);
    const total = pricing.total;
    const deliveryLabel = requestDetails.deliveryType === "delivery"
      ? t("Needs delivery")
      : t("Pickup at nearest point");

    addItem({
      id: `rent-${period}-${selectedVehicle.categoria}-${transmissionLabel(selectedVehicle.transmision)}-${requestDetails.coverage}-${requestDetails.startDateTime}-${requestDetails.endDateTime}-${requestDetails.deliveryType}`,
      type: "Rent a car",
      title: selectedVehicle.title,
      subtitle: selectedVehicle.model,
      price: total,
      details: {
        period,
        periodLabel,
        rates: {
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
        pricingBreakdown: pricing,
        transmission: transmissionLabel(selectedVehicle.transmision),
        transmissionCode: selectedVehicle.transmision,
        category: selectedVehicle.categoria
      },
      meta: [
        t(`${rentalDays} day${rentalDays === 1 ? "" : "s"}`),
        pricingLabel,
        coverageLabel,
        transmissionLabel(selectedVehicle.transmision),
        requestDetails.hotel,
        deliveryLabel,
        `From ${requestDetails.startDateTime}`,
        `Until ${requestDetails.endDateTime}`
      ].filter(Boolean)
    });

    closeRequestModal();
  }

  const modalDays = getRentalDays();
  const modalCoverageLabel = coverageOptions.find((option) => option.value === requestDetails.coverage)?.label || "Full cover";
  const modalPricing = selectedVehicle
    ? getRentalRateBreakdown(selectedVehicle.categoria, selectedVehicle.transmision, requestDetails.coverage, modalDays)
    : { months: 0, weeks: 0, days: 0, total: 0 };
  const modalPricingLabel = formatPricingBreakdown(modalPricing, language);
  const modalTotal = modalPricing.total;

  return (
    <section className="rent-catalog-section" id="rates">
      <div className="container rent-catalog">
        <aside className="rent-filter-panel" aria-label="Vehicle filters">
          <h2>Filters</h2>

          <div className="rent-filter-panel__group">
            {vehicleTypes.map((type) => (
              <label className="rent-check" key={type.value}>
                <input
                  type="checkbox"
                  checked={activeTypes.includes(type.value)}
                  onChange={() => toggleVehicleType(type.value)}
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>

          <label className="rent-filter-panel__field">
            Passengers
            <select value={passengers} onChange={(event) => setPassengers(event.target.value)}>
              {passengerOptions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>

          <div className="rent-filter-panel__group rent-filter-panel__group--period">
            <span>Rate</span>
            <div className="rent-periods" aria-label="Rental period">
              {periods.map((item) => (
                <button
                  key={item.value}
                  className={`rent-period${period === item.value ? " rent-period--active" : ""}`}
                  type="button"
                  onClick={() => setPeriod(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="rent-catalog__main">
          <div className="rent-catalog__head">
            <div>
              <h2>Vehicle rental options</h2>
              <p>Car rental in Costa Rica.</p>
            </div>
            <div className="rent-catalog__summary">
              <span>{filteredRates.length} options</span>
              <strong>From {cheapest ? formatUSD(cheapest.seguro_basico) : "-"}</strong>
            </div>
          </div>

          <motion.div
            className="rent-vehicle-grid"
            initial={false}
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.055
                }
              }
            }}
          >
            {filteredRates.map((item) => (
              <motion.article
                className="rent-vehicle-card"
                key={item.key}
                variants={{
                  hidden: { opacity: 1, y: 0 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.34, ease: "easeOut" }}
                whileHover={{ y: -4 }}
              >
                <div className="rent-vehicle-card__media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>

                <div className="rent-vehicle-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.model}</p>

                  <div className="rent-vehicle-card__transmission">
                    <Cog aria-hidden="true" size={16} />
                    <span>{t(transmissionLabel(item.transmision))}</span>
                  </div>

                  <div className="rent-vehicle-card__specs" aria-label="Vehicle capacity">
                    <span><Users aria-hidden="true" size={16} />{item.passengers}</span>
                    <span><Briefcase aria-hidden="true" size={16} />{item.luggage}</span>
                    <span><DoorOpen aria-hidden="true" size={16} />{item.doors}</span>
                  </div>

                  <div className="rent-vehicle-card__footer">
                    <span>From {formatUSD(item.seguro_basico)}</span>
                    <button type="button" onClick={() => openRequestModal(item)}>
                      Add
                      <Search aria-hidden="true" size={13} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredRates.length === 0 ? (
            <div className="empty rent-catalog__empty">
              <CarFront aria-hidden="true" size={28} />
              <h3>No vehicles match these filters</h3>
              <p className="muted">Try another passenger count or select more categories.</p>
            </div>
          ) : null}
        </div>
      </div>

      {selectedVehicle ? (
        <div className="rate-modal" role="dialog" aria-modal="true" aria-labelledby="rateModalTitle">
          <div className="rate-modal__backdrop" onClick={closeRequestModal} />
          <form className="rate-modal__card" onSubmit={addRateToCart}>
            <div className="rate-modal__head">
              <div>
                <p className="rent-card__tag">Rent a car</p>
                <h3 id="rateModalTitle">{selectedVehicle.title}</h3>
                <p className="muted">{selectedVehicle.model} · {transmissionLabel(selectedVehicle.transmision)}</p>
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
                <strong>{modalDays ? t(`${modalDays} day${modalDays === 1 ? "" : "s"}`) : t("Select dates")}</strong>
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
              {modalDays ? `${modalPricingLabel}. ` : ""}Pricing automatically combines complete months, complete weeks and remaining days.
            </p>

            {requestError ? (
              <p className="rate-modal__error" role="alert">{requestError}</p>
            ) : null}

            <div className="rate-modal__actions">
              <button className="btn btn--primary" type="submit" disabled={!modalDays}>Add to cart</button>
              <button className="btn btn--ghost" type="button" onClick={closeRequestModal}>Cancel</button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
