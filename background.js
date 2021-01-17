chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case "st.get":
            chrome.storage.local.get(request.key, (value) => {
                sendResponse({ status: "OK", value });
            })
            break;

        case "st.set":
            chrome.storage.local.set(request.obj, () => {
                sendResponse({ status: "OK" })
            });
            break;

        default:
            sendResponse({ status: "error", errorMsg: "Invalid property `action`." })
            break;
    }
})