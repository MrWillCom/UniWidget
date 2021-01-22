function TitleDesc(title, desc) {
    return HTMLElements.div({ class: "components-title-desc" }, {}, [
        HTMLElements.h3({ class: "title" }, {}, title),
        HTMLElements.p({ class: "desc" }, {}, desc),
    ])
}

function List(data) {
    var list = [];
    for (const item of data) {
        list.push(HTMLElements.div({ class: "item" }, item.events, [
            (() => {
                if (item.leading) {
                    return HTMLElements.span({ class: "leading" }, {}, item.leading)
                }
            })(),
            HTMLElements.span({ class: "name" }, {}, item.name),
            (() => {
                if (item.trailing) {
                    return HTMLElements.span({ class: "trailing" }, {}, item.trailing)
                }
            })(),
        ]));
    }
    return HTMLElements.div({ class: "components-list" }, {}, list);
}
