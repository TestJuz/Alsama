import { ToursListingPage } from "../components/ToursListingPage";
import { jacoTours } from "../lib/site";

export function JacoToursPage() {
  return (
    <ToursListingPage
      title="Jaco travel services and experiences"
      intro="Use Jaco as your base for day tours, private transportation, hotel support, shared shuttles and custom vacation planning."
      servicePills={["Day tours", "Private transport", "Shared shuttles", "Hotels", "Vacation packages", "Rent a car"]}
      summaryCards={[
        {
          title: "Travel planning from Jaco",
          text: "We can combine your excursions with transfers, lodging and route recommendations."
        },
        {
          title: "Flexible transport options",
          text: "Choose airport pickups, hotel-to-hotel transfers or private transportation for your group."
        },
        {
          title: "Complete trip support",
          text: "Ask for a quote that includes tours, hotels, shuttle routes and rental car options."
        }
      ]}
      tours={jacoTours}
      contactText="Tell us your dates, pickup point and if you need tours, transport, hotels or a full package."
      contactPlaceholder="Tell us the services you want from Jaco."
    />
  );
}
