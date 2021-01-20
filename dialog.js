var dialogElement = document.querySelector(".dialog");
var dialogChildren = {
    title: dialogElement.querySelector(".title"),
    actions: dialogElement.querySelector(".actions"),
    content: dialogElement.querySelector(".content"),
}
var dialogController = {
    toggle: () => {
        dialogElement.classList.toggle("open")
    },
    open: () => {
        dialogElement.classList.add("open")
    },
    close: () => {
        dialogElement.classList.remove("open")
    },
    title: {
        get: () => {
            if (dialogChildren.title.children.length != 0) {
                return dialogChildren.title.children;
            } else {
                return dialogChildren.title.innerHTML;
            }
        },
        set: (value) => {
            if (typeof value == "string") {
                dialogChildren.title.innerHTML = value;
            } else {
                dialogChildren.title.appendChild(value);
            }
        },
    },
    actions: {
        append: (action, events) => {
            var btn = document.createElement("button");
            btn.classList.add("action");
            if (typeof action == "string") { btn.innerHTML = action } else { btn.appendChild(action) };
            for (const i in events) {
                btn.addEventListener(i, events[i])
            }
            dialogChildren.actions.appendChild(btn);
        },
        clear: () => {
            for (const iterator of dialogChildren.actions.children) {
                dialogChildren.actions.removeChild(iterator)
            }
        }
    },
    content: {
        set: (value) => {
            for (const iterator of dialogChildren.content.children) {
                dialogChildren.content.removeChild(iterator)
            }
            dialogChildren.content.appendChild(value);
        }
    }
}

dialogElement.addEventListener("click", (ev) => {
    ev.stopPropagation();
})
