function TitleDesc(title, desc) {
    return HTMLElements.div({ class: "components-title-desc" }, {}, [
        HTMLElements.h3({ class: "title" }, {}, title),
        HTMLElements.p({ class: "desc" }, {}, desc),
    ])
}

function List(data) {
    var list = [];
    for (const item of data) {
        list.push(HTMLElements.div({class: "item"}, {}, [
            HTMLElements.p({class: "name"}, item.events, item.name)
        ]));
    }
    return HTMLElements.div({class: "components-list"}, {}, list);
}
