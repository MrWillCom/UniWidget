var st = {
    get: key => new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "st.get", key }, (response) => resolve(response))
    }),
    set: obj => new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "st.set", obj }, (response) => resolve(response))
    })
}

var widgetContainer = document.querySelector(".widget-container");
var openWidgetContainerBtn = document.querySelector(".open-widget-container-btn");

widgetContainer.addEventListener("click", (ev) => {
    ev.stopPropagation();
})

openWidgetContainerBtn.addEventListener("click", (ev) => {
    widgetContainer.classList.add("open");
    openWidgetContainerBtn.classList.add("hide");
    ev.stopPropagation();
})

document.addEventListener("click", (ev) => {
    if (widgetContainer.classList.contains("open")) {
        widgetContainer.classList.remove("open");
        openWidgetContainerBtn.classList.remove("hide");
    }
})
