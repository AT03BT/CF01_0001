/*
    wwwroot/js/componenteditor/svgutils.js
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    SVG Utility Functions
    =====================
    Version: 0.1.0
*/

function createSvgElement(data, svgElement) {
    data.forEach(item => {
        let element;

        switch (item.type) {
            case "group":
                element = createGroup(item);
                break;
            case "rect":
                element = createRect(item);
                break;
            case "circle":
                element = createCircle(item);
                break;
            case "line":
                element = createLine(item);
                break;
            case "path":
                element = createPath(item);
                break;
            default:
                console.warn("Unknown element type:", item.type);
                return;
        }

        if (item.style) {
            applyStyles(element, item.style);
        }

        if (item["aria-label"]) {
            element.setAttribute("aria-label", item["aria-label"]);
        }

        if (item.children) {
            createSvgElement(item.children, element); // Recursive call
        }

        svgElement.appendChild(element);
    });
}

function createGroup(data) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (data.transform) g.setAttribute("transform", data.transform);
    if (data.id) g.setAttribute("id", data.id);
    return g;
}

function createRect(data) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", data.x || 0);
    rect.setAttribute("y", data.y || 0);
    rect.setAttribute("width", data.width || 0);
    rect.setAttribute("height", data.height || 0);
    if (data.stroke) rect.setAttribute("stroke", data.stroke);
    if (data.fill) rect.setAttribute("fill", data.fill);
    if (data.strokeWidth) rect.setAttribute("stroke-width", data.strokeWidth);
    if (data.id) rect.setAttribute("id", data.id);
    return rect;
}

function createCircle(data) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", data.cx || 0);
    circle.setAttribute("cy", data.cy || 0);
    circle.setAttribute("r", data.r || 0);
    if (data.stroke) circle.setAttribute("stroke", data.stroke);
    if (data.fill) circle.setAttribute("fill", data.fill);
    if (data.id) circle.setAttribute("id", data.id);
    return circle;
}

function createLine(data) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", data.x1 || 0);
    line.setAttribute("y1", data.y1 || 0);
    line.setAttribute("x2", data.x2 || 0);
    line.setAttribute("y2", data.y2 || 0);
    if (data.stroke) line.setAttribute("stroke", data.stroke);
    if (data.strokeWidth) line.setAttribute("stroke-width", data.strokeWidth);
    if (data.id) line.setAttribute("id", data.id);
    return line;
}

function createPath(data) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", data.d || "");
    if (data.stroke) path.setAttribute("stroke", data.stroke);
    if (data.fill) path.setAttribute("fill", data.fill);
    if (data.id) path.setAttribute("id", data.id);
    return path;
}

function applyStyles(element, style) {
    for (const prop in style) {
        element.style[prop] = style[prop];
    }
}

export { createSvgElement, createGroup, createRect, createCircle, createLine, createPath, applyStyles };