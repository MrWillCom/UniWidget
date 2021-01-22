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
    for (const i in WidgetVariables.WidgetsList) {
        //     ^
        // The static `i` may not change when removing widgets, I gonna make an event listener.
        addedListData.push({
            events: {
                "click": (ev) => {
                    WidgetVariables.WidgetsList.splice(i, 1);
                    chrome.storage.local.set({ widgetsList: WidgetVariables.WidgetsList }, () => {
                        ev.target.parentNode.removeChild(ev.target);
                    });
                }
            },
            leading: [HTMLElements.i({ class: "bi bi-dash-circle-fill text-red" }, {}, [])],
            name: WidgetVariables.WidgetsList[i],
        })
    }
    var installedListData = [];
    for (const item in WidgetVariables.InstalledWidgets) {
        installedListData.push({
            events: {
                "click": (ev) => {
                    chrome.storage.local.get("widgetsList", (val) => {
                        val.widgetsList.push(item)
                        chrome.storage.local.set({ widgetsList: val.widgetsList }, () => {
                        });
                    })
                }
            },
            leading: [HTMLElements.i({ class: "bi bi-plus-circle-fill text-green" }, {}, [])],
            name: item,
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
