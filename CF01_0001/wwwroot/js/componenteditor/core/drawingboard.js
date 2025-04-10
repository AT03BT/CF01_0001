/*
    wwwroot/js/componenteditor/drawingboard.js
    Version: 0.2.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Drawing Board Module - Refactoring to test
    =========================================

    Let the Drawing Board be primarily concerned with managing the visual layers
    of an electrical components plannar figure. It provides a logical grouping
    for the drawing within component editor.

    Containers such as Selected Item and Grouped Items that need to be
    manipulated by sub components are to be stored here or referenced here.

    A shared space.
*/


import * as data from '../data/componentlibrary.js';
import * as svgutils from './svgutils.js';
import { ShapeConstruction } from './shapeconstruction.js';
import setupToolpalletInteractions from '../ui/toolpalletinteractions.js';
import '../ui/propertyeditorinteractions.js';
import '../ui/filinginteractions.js';


const EditingState = {
    ManipulatingPart: 'ManipulatingPart',
    EditingPart: 'EditingPart',
    AddingPart: 'AddingPart',
    CurrentState: 'ManipulatingPart'
};

const DrawingBoard = {

    svg: document.getElementById("svgDrawing"),
    shapeSelected: null,
    selectedElement: null,
    selectedElements: [],
    groupButton: document.querySelector('[data-manipulation="sm01_gr01_0001"]'),
    propertyEditorContainer: document.getElementById("propertyEditorContainer"),

    init: function () {
        this.svg.addEventListener('click', this.handleSvgClick.bind(this));
        this.svg.addEventListener('mousedown', this.handleSvgMouseDown.bind(this));
        this.svg.addEventListener('mousemove', this.handleSvgMouseMove.bind(this));
        this.svg.addEventListener('mouseup', this.handleSvgMouseUp.bind(this));
        this.groupButton.addEventListener('click', this.handleGroupButtonClick.bind(this));
        this.updateGroupButtonState();
        this.updateCursor();
        //svgutils.createSvgElement(data.circuitBreakerData, this.svg);
        setupToolpalletInteractions();
    },

    updateCursor: function () {
        if (EditingState.CurrentState === EditingState.ManipulatingPart) {
            this.svg.style.cursor = "pointer";
        } else if (EditingState.CurrentState === EditingState.AddingPart) {
            if (this.shapeSelected === 'sp01_ln01_0001' && ShapeConstruction.line.currentState === 'drawingLine') {
                this.svg.style.cursor = 'crosshair';
            } else {
                this.svg.style.cursor = "crosshair";
            }
        } else {
            this.svg.style.cursor = "default";
        }
    },

    groupSelectedElements: function () {
        const group = svgutils.createGroup({ type: 'group' });
        this.svg.appendChild(group);

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        this.selectedElements.forEach(el => {
            const bbox = el.getBBox();
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);

            group.appendChild(el);
            const currentTransform = el.getAttribute('transform') || '';
            el.setAttribute('transform', `translate(${bbox.x - minX}, ${bbox.y - minY}) ${currentTransform}`);
        });
        group.setAttribute('transform', `translate(${minX}, ${minY})`);

        this.clearSelection();
    },

    clearSelection: function () {
        this.selectedElements.forEach(el => el.classList.remove('selected'));
        this.selectedElements = [];
        this.clearProperties();
    },

    updateGroupButtonState: function () {
        this.groupButton.disabled = this.selectedElements.length < 2;
    },

    selectElement: function (element) {
        this.selectedElement = element;
        this.showProperties(element);
    },

    toggleElementSelection: function (element) {
        const index = this.selectedElements.indexOf(element);
        if (index === -1) {
            this.selectedElements.push(element);
            element.classList.add('selected');
            this.selectElement(element);
        } else {
            this.selectedElements.splice(index, 1);
            element.classList.remove('selected');
            this.clearProperties();
        }
        this.updateGroupButtonState();
    },

    clearProperties: function () {
        this.propertyEditorContainer.innerHTML = '';
    },

    handleGroupButtonClick: function () {
        if (this.selectedElements.length >= 2) {
            this.groupSelectedElements();
        }
    },

    handleSvgClick: function (event) {
        const clickedElement = event.target;
        if (EditingState.CurrentState === EditingState.AddingPart && this.shapeSelected !== 'sp01_ln01_0001') {
            this.handleAddingShape(event);
        }

        if (EditingState.CurrentState === EditingState.ManipulatingPart && (clickedElement.tagName === 'rect' || clickedElement.tagName === 'circle' || clickedElement.tagName === 'line')) {
            this.toggleElementSelection(clickedElement);
        }

        this.updateGroupButtonState();
    },

    handleSvgMouseDown: function (event) {
        if (EditingState.CurrentState === EditingState.AddingPart) {
            if (this.shapeSelected === 'sp01_ln01_0001') {
                ShapeConstruction.line.handleMouseDown(event);
            } else {
                this.handleAddingShape(event);
            }
        }
    },

    handleSvgMouseMove: function (event) {
        if (EditingState.CurrentState === EditingState.AddingPart) {
            if (this.shapeSelected === 'sp01_ln01_0001' && ShapeConstruction.line.currentState === 'drawingLine') {
                ShapeConstruction.line.handleMouseMove(event);
            }
        }
    },

    handleSvgMouseUp: function (event) {
        if (EditingState.CurrentState === EditingState.AddingPart) {
            if (this.shapeSelected === 'sp01_ln01_0001' && ShapeConstruction.line.currentState === 'drawingLine') {
                ShapeConstruction.line.handleMouseUp(event);
            }
        }
    },

    handleAddingShape: function (event) {
        // Implement shape addition logic here
    },

    showProperties: function (element) {
        this.propertyEditorContainer.innerHTML = '';
        if (!element) return;

        const attributes = element.attributes;
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            if (attr.name !== 'id') {
                this.createPropertyField(element, attr.name, attr.value);
            }
        }
        const style = window.getComputedStyle(element);
        for (let i = 0; i < style.length; i++) {
            const propName = style[i];
            this.createPropertyField(element, propName, style.getPropertyValue(propName), true);
        }
    },

    createPropertyField: function (element, propertyName, value, isStyle = false) {
        const label = document.createElement('label');
        label.textContent = propertyName + ':';
        this.propertyEditorContainer.appendChild(label);

        const input = document.createElement('input');
        input.value = value;
        input.addEventListener('change', function () {
            if (isStyle) {
                element.style[propertyName] = input.value;
            } else {
                element.setAttribute(propertyName, input.value);
            }
        });
        this.propertyEditorContainer.appendChild(input);
        this.propertyEditorContainer.appendChild(document.createElement('br'));
    }
};

DrawingBoard.init();
export { DrawingBoard, EditingState };