class WidgetSource {
    constructor(builder, params) {
        this.builder = builder;
        this.params = params;
    }
    builder;
    params;
}

const WidgetConstants = {
    Sizes: {
        Small: "small",
        Wide: "wide",
        Large: "large",
    },
}

var WidgetVariables = {
    WidgetsList: [],
    InstalledWidgets: {},
}

function AddWidgetToInstalledWidgets(name, source) {
    WidgetVariables.InstalledWidgets[name] = source;
}

function InstallWidget(name, source) {
    chrome.storage.local.get("installedWidgets", (val) => {
        if (val["installedWidgets"]) {
            val["installedWidgets"][name] = JSON.stringify(source);
            chrome.storage.local.set({ installedWidgets: val["installedWidgets"] }, () => { })
        } else {
            var tmp = {};
            tmp[name] = JSON.stringify(source);
            chrome.storage.local.set({ installedWidgets: tmp }, () => { })
        }
    })
}

function RefreshWidgetsList(callback) {
    chrome.storage.local.get("widgetsList", (val) => {
        if (val.widgetsList) {
            WidgetVariables.WidgetsList = val.widgetsList;
            callback(val.widgetsList);
        } else {
            chrome.storage.local.set({ widgetsList: ["WidgetDate"] }, () => {
                WidgetVariables.WidgetsList = ["WidgetDate"];
                callback(["WidgetDate"]);
            });
        }
    })
}

function RenderWidget(source) {
    if (typeof source == "string") { source = JSON.parse(source) }
    var frame = document.createElement("iframe");
    frame.src = "about:blank";
    frame.addEventListener("load", (ev) => {
        ev.target.contentDocument.body.appendChild((() => {
            var globalStyles = document.createElement("style");
            globalStyles.innerHTML = `
body {
    margin: 0;
    color: var(--txt-color-opacity-controls);
    font-size: 16px;
}
:root {
    --bg-color-opacity-controls: #ffffff20;
    --bg-color-opacity-controls-active: #ffffff40;
    --bg-color-opacity-controls-block: #ffffffbf;
    --txt-color-opacity-controls: #4c4f52;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg-color-opacity-controls: #00000020;
        --bg-color-opacity-controls-active: #00000040;
        --bg-color-opacity-controls-block: #000000bf;
        --txt-color-opacity-controls: #f5faff;
    }
}
            `;
            return globalStyles;
        })());
        if (typeof source.builder == "function") {
            ev.target.contentDocument.body.appendChild(source.builder(frame.contentWindow));
        } else if (typeof source.builder == "string") {
            ev.target.contentDocument.body.appendChild(
                ev.target.contentWindow.eval(source.builder)
            )
        }
    })

    var newWidget = document.createElement("div");
    newWidget.classList.add("widget");
    newWidget.classList.add(source.params.size);
    if (source.params.acrylic === true) { newWidget.classList.add("acrylic") };
    newWidget.appendChild(frame);

    widgetContainer.appendChild(newWidget);
}
