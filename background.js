chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchData") {
    fetch('https://linux.do/new.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        sendResponse({
          data
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        sendResponse({
          error: error.message
        });
      });
    return true; // Indicates that the response will be sent asynchronously
  }
});

chrome.runtime.sendMessage({
  action: "fetchData"
}, (response) => {
  if (chrome.runtime.lastError) {
    console.error('Error:', chrome.runtime.lastError.message);
    dataList.innerHTML = '<li>先打开一个 linuxdo 网页，再使用插件。</li>';
    return;
  }

  // 处理响应
});