var sidebar = document.querySelector(".sidebar");
var openSidebarBtn = document.querySelector(".open-sidebar-btn");
var widgetContainer = document.querySelector(".widget-container");
var editBtn = document.querySelector(".edit-btn");

var widgetsList;

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

chrome.storage.local.get("installedWidgets", (tmp) => {
    const obj = tmp["installedWidgets"];
    if (obj) {
        for (const i in obj) {
            WidgetVariables.InstalledWidgets[i] = obj[i];
        }
    }

    // Render widgets
    chrome.storage.local.get("widgetsList", (val) => {
        if (val.widgetsList) {
            widgetsList = val.widgetsList;
            for (const iterator of val.widgetsList) {
                RenderWidget(WidgetVariables.InstalledWidgets[iterator]);
            }
        } else {
            chrome.storage.local.set({ widgetsList: ["WidgetDate"] }, () => {
                widgetsList = ["WidgetDate"];
                RenderWidget(WidgetVariables.InstalledWidgets.WidgetDate);
            });
        }
    })
})


editBtn.addEventListener("click", (ev) => {
    dialogController.title.set("Edit Widgets");
    dialogController.actions.clear();
    dialogController.actions.append("Close", { click: (ev) => { dialogController.close() } });
    var addedListData = [];
    for (const item of widgetsList) {
        addedListData.push({
            events: {},
            name: item,
        })
    }
    var installedListData = [];
    for (const i in WidgetVariables.InstalledWidgets) {
        installedListData.push({
            events: {},
            name: i,
        })
    }
    dialogController.content.set(HTMLElements.div({}, {}, [
        TitleDesc("Edit Widgets", "Add, remove, reorder or resize the widgets."),
        HTMLElements.h4({}, {}, "Added"),
        List(addedListData),
        HTMLElements.h4({}, {}, "Installed"),
        List(installedListData),
    ]));
    dialogController.open();
})
