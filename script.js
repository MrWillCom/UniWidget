var sidebar = document.querySelector(".sidebar");
var openSidebarBtn = document.querySelector(".open-sidebar-btn");
var widgetContainer = document.querySelector(".widget-container");

sidebar.addEventListener("click", (ev) => {
    ev.stopPropagation();
})

openSidebarBtn.addEventListener("click", (ev) => {
    sidebar.classList.add("open");
    openSidebarBtn.classList.add("hide");
    ev.stopPropagation();
})

document.addEventListener("click", (ev) => {
    if (sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        openSidebarBtn.classList.remove("hide");
    }
})

chrome.storage.local.get("widgetsList", (val) => {
    if (val.widgetsList) {
        for (const iterator of val.widgetsList) {
            RenderWidget(WidgetVariables.InstalledWidgets[iterator]);
        }
    }else{
        chrome.storage.local.set({widgetsList: ["WidgetDate"]}, () => {
            RenderWidget(WidgetVariables.InstalledWidgets.WidgetDate);
        });
    }
})
