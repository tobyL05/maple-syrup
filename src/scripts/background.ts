let extractedPrice = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendPrice') {
      console.log('Price received from Content Script A:', message.value);
      extractedPrice = message.value;
      // Confirm the price is stored before proceeding
      sendResponse({ status: 'Price stored successfully' });
    } else if (message.action === 'getPrice') {
      console.log('Price requested by Content Script B');
      sendResponse({ price: extractedPrice }); // Respond with the stored price
    }
    return true; // Indicates asynchronous response (if needed)
  });