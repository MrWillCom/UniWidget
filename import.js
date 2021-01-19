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
    var tmp = document.createElement("div");

    const id = "widget_id_" + (WidgetVariables.WidgetsCount++).toString(10)
    tmp.id = id;
    tmp.appendChild(source.builder(id));

    var newWidget = document.createElement("div");
    newWidget.classList.add("widget");
    newWidget.classList.add(source.params.size);
    if (source.params.acrylic === true) { newWidget.classList.add("acrylic") };
    newWidget.appendChild(tmp);

    widgetContainer.appendChild(newWidget);
}
