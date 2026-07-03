import { slugify } from "./site";

export function getTourPassengerCounts(details) {
  const adults = Math.max(1, Number(details?.adults) || 1);
  const children = Math.max(0, Number(details?.children) || 0);
  return { adults, children, totalPassengers: adults + children };
}

export function getTourBookingTotal(tour, details) {
  const { totalPassengers } = getTourPassengerCounts(details);
  const basePrice = typeof tour?.price === "number" ? tour.price : Number(details?.basePrice) || 0;
  return basePrice * totalPassengers;
}

export function buildTourMeta(details) {
  const { adults, children } = getTourPassengerCounts(details);

  return [
    details?.originLabel,
    ...(details?.locations || []),
    details?.difficulty,
    details?.durationText,
    `${adults} adult${adults === 1 ? "" : "s"}`,
    `${children} child${children === 1 ? "" : "ren"}`,
    details?.tourDate ? `Date ${details.tourDate}` : "",
    details?.hotel ? `Hotel ${details.hotel}` : ""
  ].filter(Boolean);
}

export function createTourCartItem(tour, details) {
  const { adults, children } = getTourPassengerCounts(details);
  const tourDate = details.tourDate;
  const hotel = details.hotel.trim();
  const origin = tour.origin || "tour";
  const slug = tour.slug || slugify(tour.title);
  const basePrice = tour.price;
  const nextDetails = {
    type: "tour",
    slug,
    origin,
    originLabel: tour.originLabel,
    locations: tour.locations || (tour.location ? [tour.location] : []),
    difficulty: tour.difficulty,
    durationText: tour.durationText || tour.duration,
    basePrice,
    adults,
    children,
    tourDate,
    hotel
  };

  return {
    id: `tour-${origin}-${slug}-${tourDate}-${adults}-${children}-${slugify(hotel)}`,
    type: "Tour",
    title: tour.title,
    subtitle: tour.excerpt || tour.summary || "Tour request",
    price: getTourBookingTotal(tour, nextDetails),
    quantity: 1,
    details: nextDetails,
    meta: buildTourMeta(nextDetails)
  };
}