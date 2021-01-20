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
    WidgetsCount: 0,
    InstalledWidgets: {},
}

function AddWidgetToInstalledWidgets(name, source) {
    WidgetVariables.InstalledWidgets[name] = source;
}

function RenderWidget(source) {
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
