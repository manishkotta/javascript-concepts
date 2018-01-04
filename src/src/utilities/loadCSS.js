export function loadCSS(path)
{
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", path)
        document.getElementsByTagName("head")[0].appendChild(fileref)
}