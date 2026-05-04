import { asset } from "./site";

export const hotelZones = [
  {
    id: "manuel-antonio",
    name: "Quepos / Manuel Antonio",
    sourceName: "HOTELES QUEPOS/MANUEL ANTONIO",
    center: [-84.155, 9.409],
    zoom: 11.4,
    image: asset("img/hotels/hotel-manuel-antonio.webp"),
    description: "Beach, rainforest and national park access for travelers who want nature, ocean views and easy tour connections.",
    hotels: [
      {
        hotel: "Hotel Manuel Antonio",
        description: "A practical Manuel Antonio option close to the beach and national park area, useful for travelers prioritizing location.",
        coordinates: [-84.159, 9.389],
        image: asset("img/hotels/hotel-manuel-antonio.webp"),
        habitaciones: [
          { tipo: "Sencilla", alta: 193.59, verde: 163.81 },
          { tipo: "Doble", alta: 211.79, verde: 182.01 },
          { tipo: "Triple", alta: 230, verde: 200.21 },
          { tipo: "Cuadruple", alta: 248.2, verde: 209.32 }
        ]
      },
      {
        hotel: "Plaza Yara",
        description: "A comfortable boutique-style stay near Manuel Antonio, convenient for couples and relaxed beach itineraries.",
        coordinates: [-84.147, 9.414],
        image: asset("img/hotels/hotel-plaza-yara.webp"),
        habitaciones: [
          { tipo: "Doble", alta: 251.51, verde: 185.32 }
        ]
      },
      {
        hotel: "Costa Verde",
        description: "A well-known Manuel Antonio stay with room styles for travelers who want forest atmosphere and coastal access.",
        coordinates: [-84.158, 9.401],
        image: asset("img/hotels/hotel-costa-verde.webp"),
        habitaciones: [
          { tipo: "Efficiency", alta: 176.5, verde: null },
          { tipo: "Studio Bungalow", alta: 242.32, verde: null },
          { tipo: "Studio CVII", alta: 272.24, verde: null },
          { tipo: "Studio Plus", alta: 260.28, verde: null },
          { tipo: "Studio Plus CVII", alta: 296.16, verde: null },
          { tipo: "Penthouse", alta: 345.52, verde: null }
        ]
      }
    ]
  },
  {
    id: "arenal",
    name: "Arenal",
    sourceName: "HOTELES ARENAL",
    center: [-84.674, 10.469],
    zoom: 11.2,
    image: asset("img/hotels/hotel-los-lagos.webp"),
    description: "Volcano, hot springs and adventure tours around La Fortuna, ideal for families and nature-focused routes.",
    hotels: [
      {
        hotel: "Hotel Los Lagos",
        description: "A classic Arenal hotel option with thermal-style amenities and room types for couples, families and small groups.",
        coordinates: [-84.705, 10.488],
        image: asset("img/hotels/hotel-los-lagos.webp"),
        habitaciones: [
          { tipo: "Estandar Doble", alta: 237.21, verde: 177.18 },
          { tipo: "Estandar Triple", alta: 279.68, verde: 219.64 },
          { tipo: "Estandar Cuadruple", alta: 323.61, verde: 263.57 },
          { tipo: "Superior Doble", alta: 288.46, verde: 232.82 },
          { tipo: "Superior Triple", alta: 330.93, verde: 276.75 },
          { tipo: "Superior Cuadruple", alta: 374.86, verde: 319.21 }
        ]
      },
      {
        hotel: "Paradise Hot Springs",
        description: "A hot springs-focused stay in Arenal, suited for travelers who want comfort and relaxation after tours.",
        coordinates: [-84.705, 10.477],
        image: asset("img/hotels/paradise-hot-springs.webp"),
        habitaciones: [
          { tipo: "Double Deluxe King", alta: 307.5, verde: 265.04 },
          { tipo: "Double Superior", alta: 316.29, verde: 269.43 },
          { tipo: "Luxury Quadruple", alta: 480.29, verde: 430.5 },
          { tipo: "Suite Deluxe", alta: 326.54, verde: 287 }
        ]
      },
      {
        hotel: "Aunty Arenal Lodge",
        description: "A simpler Arenal lodging option for travelers who want a practical base near La Fortuna activities.",
        coordinates: [-84.642, 10.468],
        image: asset("img/hotels/aunty-arenal-lodge.webp"),
        habitaciones: [
          { tipo: "Sencilla/Doble", alta: 131.79, verde: 114.21 },
          { tipo: "Triple", alta: 161.07, verde: 143.5 },
          { tipo: "Cuadruple", alta: 197.68, verde: 175.71 }
        ]
      }
    ]
  },
  {
    id: "monteverde",
    name: "Monteverde",
    sourceName: "HOTELES MONTEVERDE",
    center: [-84.825, 10.316],
    zoom: 12,
    image: asset("img/hotels/monteverde-country-lodge.webp"),
    description: "Cloud forest stays for wildlife, hanging bridges, cool weather and scenic mountain experiences.",
    hotels: [
      {
        hotel: "Country Lodge",
        description: "A cozy Monteverde base with simple room types for travelers exploring the cloud forest area.",
        coordinates: [-84.823, 10.317],
        image: asset("img/hotels/monteverde-country-lodge.webp"),
        habitaciones: [
          { tipo: "Sencilla/Doble", alta: 148.92, verde: 142.3 },
          { tipo: "Triple", alta: 204.76, verde: 193.59 }
        ]
      },
      {
        hotel: "Poco a Poco",
        description: "A polished Monteverde hotel option for travelers wanting comfort near town and nature activities.",
        coordinates: [-84.819, 10.315],
        image: asset("img/hotels/hotel-spa-poco-a-poco.webp"),
        habitaciones: [
          { tipo: "Bromelia 4 pax", alta: 265.57, verde: 239.92 },
          { tipo: "Quetzal 4 pax", alta: 310.25, verde: 281.29 },
          { tipo: "Garden Family 5 pax", alta: 434.34, verde: 402.08 }
        ]
      },
      {
        hotel: "Sibu Lodge",
        description: "A Monteverde lodge-style stay with family and forest-facing room options.",
        coordinates: [-84.813, 10.321],
        image: asset("img/hotels/sibu-lodge.webp"),
        habitaciones: [
          { tipo: "Lantana 4 pax", alta: 218.41, verde: 206.5 },
          { tipo: "Guarias 5 pax", alta: 330.93, verde: 330.93 },
          { tipo: "Forest Superior 3 pax", alta: 277.98, verde: 277.98 }
        ]
      }
    ]
  },
  {
    id: "sjo",
    name: "San Jose",
    sourceName: "HOTELES SJO",
    center: [-84.09, 9.934],
    zoom: 11.3,
    image: asset("img/hotels/irazu-hotel-studios.webp"),
    description: "City hotels for arrivals, departures, business stays and connections with airport transfers or day tours.",
    hotels: [
      {
        hotel: "Irazu Hotel & Studios",
        description: "A San Jose city hotel option useful before or after flights and for short urban stays.",
        coordinates: [-84.115, 9.947],
        image: asset("img/hotels/irazu-hotel-studios.webp"),
        habitaciones: [
          { tipo: "Sencilla/Doble", alta: 115.83, verde: null }
        ]
      },
      {
        hotel: "Real Intercontinental",
        description: "A premium San Jose hotel option near shopping and city services, ideal for a more upscale stopover.",
        coordinates: [-84.150, 9.932],
        image: asset("img/hotels/real-intercontinental-hotel.webp"),
        habitaciones: [
          { tipo: "Clasica SGL/DBL", alta: 289.56, verde: 273.02 },
          { tipo: "Premium SGL/DBL", alta: 388.84, verde: 372.29 }
        ]
      },
      {
        hotel: "Fleur de Lys",
        description: "A central San Jose hotel with multiple room styles for travelers who want city access and character.",
        coordinates: [-84.072, 9.932],
        image: asset("img/hotels/hotel-fleur-de-lys.webp"),
        habitaciones: [
          { tipo: "Estandar Sencilla", alta: 84, verde: 78 },
          { tipo: "Estandar Doble/Twin", alta: 91, verde: 88 },
          { tipo: "Superior", alta: 99, verde: 99 },
          { tipo: "Deluxe Balcon", alta: 124, verde: 124 },
          { tipo: "Suite A/C Doble", alta: 124, verde: 124 },
          { tipo: "Suite A/C Triple", alta: 146, verde: 146 },
          { tipo: "Suite A/C Cuadruple", alta: 165, verde: 165 },
          { tipo: "Master Suite Doble", alta: 149, verde: 149 },
          { tipo: "Master Suite Triple", alta: 161, verde: 161 }
        ]
      }
    ]
  },
  {
    id: "guanacaste",
    name: "Guanacaste",
    sourceName: "HOTELES GUANACASTE",
    center: [-85.652, 9.978],
    zoom: 9.6,
    image: asset("img/hotels/villas-verdes-samara.webp"),
    description: "Beach-region stays for warm weather, surf towns, family vacations and longer coastal routes.",
    hotels: [
      {
        hotel: "Villas Verdes",
        description: "A Guanacaste villa-style option with bedroom configurations for couples, families and small groups.",
        coordinates: [-85.652, 9.978],
        image: asset("img/hotels/villas-verdes-samara.webp"),
        habitaciones: [
          { tipo: "Villa 1 Bedroom", alta: 190.28, verde: 140.64 },
          { tipo: "Villa 2 Bedroom", alta: 215.1, verde: 182.01 },
          { tipo: "Villa 3 Bedroom", alta: 239.92, verde: 223.38 },
          { tipo: "Cottage 1 Bedroom", alta: 132.37, verde: 125.75 }
        ]
      }
    ]
  }
];
