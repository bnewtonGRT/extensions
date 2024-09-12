document.getElementById('searchButton').addEventListener('click', function () {

  // Get input values
  const origins = document.getElementById("origins").value;
  const destinations = document.getElementById("destinations").value;
  const travelDate = document.getElementById("travelDate").value;
  const resultsArray = []

  // Create arrays of origin and destination cities
  const originsArray = origins.split(",");
  const destinationsArray = destinations.split(",");

    // Function to process a single origin-destination pair
    async function processOriginDestination(origin, destination) {
      return new Promise((resolve) => {
        const aaUrl = `https://www.aa.com/booking/search?locale=en_US&pax=1&adult=1&type=OneWay&searchType=Award&cabin=&carriers=ALL&travelType=personal&slices=%5B%7B%22orig%22:%22${origin}%22,%22origNearby%22:false,%22dest%22:%22${destination}%22,%22destNearby%22:false,%22date%22:%22${travelDate}%22%7D%5D`;

        console.log(`Begin: From ${origin} to ${destination} on ${travelDate}`);
        console.log("AAUrl: "  + aaUrl);
        resolve()
      });
    }
  // Process all combinations
  try {
    for (let origin of originsArray) {
      for (let destination of destinationsArray) {
        processOriginDestination(origin.trim(), destination.trim());
      }
    }
    console.log("Results Array: " + resultsArray);
    console.log("All combinations processed");
  } catch (error) {
    console.error("An error occurred during processing:", error);
  }
});
