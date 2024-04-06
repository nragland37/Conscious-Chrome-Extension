chrome.runtime.sendMessage('I am loading content script', (response) => {
    console.log(response);
    console.log('I am content script')

})

window.onload = (event) => {
    console.log('page is fully loaded');
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'getText') {
          // Get text content from all <span> elements on the page
          const tweetTextElement = document.querySelector('[data-testid="tweetText"]');

          const spanTexts = Array.from(tweetTextElement.querySelectorAll('span')).map(span =>{ 
            console.log(span.innerText);
            return span.innerText});
          
          // Send the text content back to the extension
          chrome.runtime.sendMessage({ action: 'setText', text: spanTexts.join('\n') });
        }
      });
    
};

