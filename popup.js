// Get the saved domain list from storage on popup load
chrome.storage.sync.get('blacklist', function(data) {
  const domainList = data.blacklist || [];
  displayDomains(domainList);
});

// Function to display domains in the popup
function displayDomains(domainList) {
  const ul = document.getElementById('domainList');
  ul.innerHTML = '';

  domainList.forEach(function(domain) {
    const li = document.createElement('li');
    li.textContent = domain;
    ul.appendChild(li);
  });
}

// Add button click event to add a new domain to the list
document.getElementById('addButton').addEventListener('click', function() {
  const domainInput = document.getElementById('domainInput');
  const domain = domainInput.value.trim();

  if (domain !== '') {
    // Get the saved domain list from storage
    chrome.storage.sync.get('blacklist', function(data) {
      const domainList = data.blacklist || [];
      domainList.push(domain);

      // Save the updated domain list to storage
      chrome.storage.sync.set({ 'blacklist': domainList }, function() {
        displayDomains(domainList);
        domainInput.value = '';
      });
    });
  }
});
