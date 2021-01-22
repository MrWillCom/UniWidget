AddWidgetToInstalledWidgets("WidgetDate", new WidgetSource(
    (window) => {
        var tmp = document.createElement("p");
        const monthTextShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dateTmp = new Date();
        var date = {
            year: dateTmp.getFullYear(),
            month: monthTextShort[dateTmp.getMonth()],
            date: dateTmp.getDate(),
        };
        var content = {};
        var contentTypes = ["year", "month", "date"];
        for (const iterator of contentTypes) {
            content[iterator] = document.createElement("span");
            content[iterator].innerHTML = date[iterator];
            content[iterator].classList.add(iterator);
            tmp.appendChild(content[iterator]);
        }
        var style = document.createElement("style");
        style.innerHTML = `
{ font-size: 24px; }
p { margin: 8px; }
.year { opacity: 0.4; font-weight: bold; }
.month { opacity: 0.6; margin-left: 6px; }
.date { display: block; font-size: 42px; font-weight: bold; }
        `;
        tmp.appendChild(style);
        return tmp;
    },
    {
        size: WidgetConstants.Sizes.Small,
        acrylic: true,
    }
), { builtin: true })
