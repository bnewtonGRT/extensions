document.getElementById('searchButton').addEventListener('click', async function () {

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

      chrome.tabs.update({ url: aaUrl }, function (tab) {
        if (chrome.runtime.lastError) {
          console.error("Error updating tab:", chrome.runtime.lastError.message);
          resolve();
          return;
        }

        function updateListener() {
          console.log("tab: " + JSON.stringify(tab))
          if (tab.url.startsWith(`https://www.aa.com/booking/choose-flights`)) {
            console.log("URL: " + tab.url)
            resultsArray.push(captureHtml(tab));
            chrome.tabs.onUpdated.removeListener(updateListener);
            resolve()
          }
        }

        chrome.tabs.onUpdated.addListener(updateListener);
      });
    });
  }

  async function captureHtml(tab) {
    try {
    // Check if chrome.scripting is available
    if (chrome.scripting) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          document.body.focus()
          const html = document.documentElement.outerHTML;
          console.log("html: " + html)
          return html
        }
      });
    } else {
      console.error("chrome.scripting API is not available");
    }
  } catch (error) {
    console.error("Error copying HTML:", error);
  }
  return
}

  // Process all combinations
  try {
  const promises = []
  for (let origin of originsArray) {
    for (let destination of destinationsArray) {
      promises.push(processOriginDestination(origin.trim(), destination.trim()));
    }
  }

  await Promise.all(promises)

  console.log("Results Array: " + JSON.stringify(resultsArray));
  console.log("All combinations processed");
} catch (error) {
  console.error("An error occurred during processing:", error);
}
});
