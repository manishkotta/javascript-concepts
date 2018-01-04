export function loadCSS(path) {
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", path)
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

export function ReplaceCss(id, newPath) {
        var ref = document.getElementById(id);
        if (ref) {
                if (ref.getAttribute("href") != newPath)
                        ref.setAttribute("href", newPath);
        }
        // document.getElementsByTagName("head")[0].appendChild(ref)
}