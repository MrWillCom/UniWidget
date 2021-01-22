var HTMLElements = {}
const HTML_TAG_NAMES = [
    "p", "a", "span",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "hr", "br",
    "div",
    "button",
]

for (const iterator of HTML_TAG_NAMES) {
    HTMLElements[iterator] = (attrs, events, children) => {
        var tmp = document.createElement(iterator);
        for (const i in attrs) {
            tmp.setAttribute(i, attrs[i]);
        }
        for (const i in events) {
            tmp.addEventListener(i, events[i]);
        }
        if (typeof children == "string") {
            tmp.innerHTML = children;
        } else {
            for (const i of children) {
                if (i) {
                    tmp.appendChild(i);
                }
            }
        }
        return tmp;
    }
}
