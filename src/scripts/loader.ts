// sc-subtotal-amount-activecart: amazon (class)

// function sendPriceToBackground(price: number) {
//     return new Promise((resolve, reject) => {
//       chrome.runtime.sendMessage({ action: 'sendPrice', value: price }, (response) => {
//         if (chrome.runtime.lastError) {
//           reject(chrome.runtime.lastError);
//         } else {
//           resolve(response);
//         }
//       });
//     });
// }

// const currentUrl = window.location.href;
// if (currentUrl.includes("amazon")) {
//     const price = parseFloat(document.getElementById("sc-subtotal-amount-activecart").innerText.replace("$", ""));
//     console.log(price);
//     (async () => {
//         try {
//           console.log('Sending price to background...');
//           const response = await sendPriceToBackground(price);
//           console.log('Background response:', response);
//           // Continue only after the background script processes the price
//         } catch (error) {
//           console.error('Error communicating with background:', error);
//         }
//       })();
// }