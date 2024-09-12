document.getElementById('searchButton').addEventListener('click', function() {
  const cityCodeString = document.getElementById('cityCode').value;

  // Split the entered string by comma (",")
  const cityCodes = cityCodeString.split(',');

  // Loop through each city code
  for (const cityCode of cityCodes) {
    // Trim any leading/trailing spaces from each code
    const trimmedCityCode = cityCode.trim();

    // Build search URL using template literals
    const url = `https://www.google.com/search?q=${trimmedCityCode}`;
    const aaUrl = `https://www.aa.com/booking/search?locale=en_US&pax=1&adult=1&type=OneWay&searchType=Award&cabin=&carriers=ALL&travelType=personal&slices=%5B%7B%22orig%22:%22MDT%22,%22origNearby%22:false,%22dest%22:%22${trimmedCityCode}%22,%22destNearby%22:false,%22date%22:%222024-12-07%22%7D%5D`

    // Open search in new tab for each city code
    chrome.tabs.create({ url: aaUrl });
  }
});
