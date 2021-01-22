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

// Copy installed widgets source from chrome.storage to the tab
chrome.storage.local.get("installedWidgets", (tmp) => {
    const obj = tmp["installedWidgets"];
    if (obj) {
        for (const i in obj) {
            WidgetVariables.InstalledWidgets[i] = obj[i];
        }
    }

    // Render widgets
    RefreshWidgetsList((list) => {
        for (const iterator of list) {
            RenderWidget(WidgetVariables.InstalledWidgets[iterator]);
        }
    })
})


editBtn.addEventListener("click", (ev) => {
    dialogController.title.set("Edit Widgets");
    dialogController.actions.clear();
    dialogController.actions.append("Close", { click: (ev) => { dialogController.close() } });
    var addedListData = [];
    for (const item of WidgetVariables.WidgetsList) {
        addedListData.push({
            events: {},
            name: item,
        })
    }
    var installedListData = [];
    for (const i in WidgetVariables.InstalledWidgets) {
        installedListData.push({
            events: {
                "click": (ev) => {
                    chrome.storage.local.get("widgetsList", (val) => {
                        val.widgetsList.push(i)
                        chrome.storage.local.set({ widgetsList: val.widgetsList }, () => {
                        });
                    })
                }
            },
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
