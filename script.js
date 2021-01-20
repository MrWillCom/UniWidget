var sidebar = document.querySelector(".sidebar");
var openSidebarBtn = document.querySelector(".open-sidebar-btn");
var widgetContainer = document.querySelector(".widget-container");
var editBtn = document.querySelector(".edit-btn");

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
    } else {
        chrome.storage.local.set({ widgetsList: ["WidgetDate"] }, () => {
            RenderWidget(WidgetVariables.InstalledWidgets.WidgetDate);
        });
    }
})

editBtn.addEventListener("click", (ev) => {
    dialogController.title.set("Edit Widgets");
    dialogController.actions.clear();
    dialogController.actions.append("Close", { click: (ev) => { dialogController.close() } });
    dialogController.content.set(TitleDesc("Edit Widgets", "Add, remove, reorder or resize the widgets."));
    dialogController.open();
})
