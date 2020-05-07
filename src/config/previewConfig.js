export const defaultConfig = {
    markdown: {
        toc: true,
    },
    anchor: true,
    emojiPath: "https://cdn.jsdelivr.net/npm/vditor@3.1.23/dist/images/emoji",
    hljs: {
        style: "dracula",
        lineNumber: true
    },
    math: {
        inlineDigit: true
    },
    lazyLoadImage: 'https://cdn.jsdelivr.net/npm/vditor/dist/images/img-loading.svg',
    after () {
        let preview = document.getElementById("preview");
        let toc = document.getElementsByClassName("vditor-toc")[0];
        if (toc !== undefined) {
            preview.removeChild(toc);
            let brs = toc.querySelectorAll("br");
            for (let br of brs) {
                toc.removeChild(br);
            }
            let spans = toc.querySelectorAll("span");
            let ul = document.createElement("ul");
            let flag = false;
            for (let span of spans) {
                let li = document.createElement("li");
                li.innerHTML = span.innerHTML;
                li.setAttribute("class", span.getAttribute("class"));
                if (!flag) {
                    li.classList.add("current");
                    flag = true;
                }
                li.onmouseover = function() {
                    this.classList.add("current-hover");
                }
                li.onmouseout = function() {
                    this.classList.remove("current-hover");
                }
                li.onclick = function() {
                    let lis = document.getElementById("toc").querySelectorAll("ul li");
                    for (let liItem of lis) {
                        liItem.classList.remove("current");
                    }
                    this.classList.add("current");
                }
                ul.appendChild(li);
            }
            let realToc = document.getElementById("toc");
            realToc.appendChild(ul);
        }
    }
}
