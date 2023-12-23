// Get the saved pattern list from storage on popup load
chrome.storage.sync.get("urlPattern", function (data) {
  const urlPattern = data.urlPattern || [];
  displayPattern(urlPattern);
});

// Function to display patterns in the popup
function displayPattern(urlPattern) {
  const ul = document.getElementById("urlPattern");
  ul.innerHTML = "";

  urlPattern.forEach(function (pattern) {
    const li = document.createElement("li");
    li.textContent = pattern;

    // Create a remove button for each pattern
    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.addEventListener("click", function () {
      removePattern(pattern);
    });

    li.appendChild(removeButton);
    ul.appendChild(li);
  });
}

document
  .getElementById("patternInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      const patternInput = document.getElementById("patternInput");
      const pattern = patternInput.value.trim();

      if (pattern !== "") {
        // Get the saved pattern list from storage
        chrome.storage.sync.get("urlPattern", function (data) {
          const urlPattern = data.urlPattern || [];
          urlPattern.push(pattern);

          // Save the updated pattern list to storage
          chrome.storage.sync.set({ urlPattern: urlPattern }, function () {
            displayPattern(urlPattern);
            patternInput.value = "";
          });
        });
      }
    }
  });

// Function to remove a pattern from the list
function removePattern(patternToRemove) {
  chrome.storage.sync.get("urlPattern", function (data) {
    const urlPattern = data.urlPattern || [];
    const updatedPatternList = urlPattern.filter(
      (pattern) => pattern !== patternToRemove,
    );

    // Save the updated pattern list to storage
    chrome.storage.sync.set({ urlPattern: updatedPatternList }, function () {
      displayPattern(updatedPatternList);
    });
  });
}
