import { ToursListingPage } from "../components/ToursListingPage";
import { sanJoseTours } from "../lib/site";

export function SanJoseToursPage() {
  return (
    <ToursListingPage
      title="San Jose travel services and experiences"
      intro="Plan your trip from San Jose with day tours, airport transfers, private transportation, hotels, vacation packages and rental car assistance."
      servicePills={["Airport transfers", "Day tours", "Private transport", "Hotels", "Packages", "Rent a car"]}
      summaryCards={[
        {
          title: "Base your trip in San Jose",
          text: "Coordinate city departures with beaches, volcanoes, nature parks and hotel stays."
        },
        {
          title: "Arrival to departure support",
          text: "We can help from your airport pickup to your final transfer, including tours in between."
        },
        {
          title: "Custom vacation packages",
          text: "Mix excursions, transportation, lodging and car rental into one practical itinerary."
        }
      ]}
      tours={sanJoseTours}
      contactText="Tell us your dates, arrival details and which services you want us to organize."
      contactPlaceholder="Tell us if you need tours, transfers, hotels, rent a car or a package from San Jose."
    />
  );
}
