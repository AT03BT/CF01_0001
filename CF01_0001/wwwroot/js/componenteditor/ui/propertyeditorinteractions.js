/*
    wwwroot/js/componenteditor/propertyeditorinteractions.js
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/
*/



const propertyEditorContainer = document.getElementById("propertyEditorContainer");


function showProperties(element) {
    propertyEditorContainer.innerHTML = '';
    if (!element) return;

    const attributes = element.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (attr.name !== 'id') {
            createPropertyField(element, attr.name, attr.value);
        }
    }
    const style = window.getComputedStyle(element);
    for (let i = 0; i < style.length; i++) {
        const propName = style[i];
        createPropertyField(element, propName, style.getPropertyValue(propName), true);
    }
}


function createPropertyField(element, propertyName, value, isStyle = false) {
    const label = document.createElement('label');
    label.textContent = propertyName + ':';
    propertyEditorContainer.appendChild(label);

    const input = document.createElement('input');
    input.value = value;
    input.addEventListener('change', function () {
        if (isStyle) {
            element.style[propertyName] = input.value;
        } else {
            element.setAttribute(propertyName, input.value);
        }
    });
    propertyEditorContainer.appendChild(input);
    propertyEditorContainer.appendChild(document.createElement('br'));
}