function TitleDesc(title, desc) {
    return HTMLElements.div({ class: "components-title-desc" }, {}, [
        HTMLElements.h3({ class: "title" }, {}, title),
        HTMLElements.p({ class: "desc" }, {}, desc),
    ])
}
