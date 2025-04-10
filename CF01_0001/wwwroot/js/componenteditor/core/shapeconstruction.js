/*
    wwwroot/js/componenteditor/shapeconstruction.js
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Shape Construction Module
    =========================
    Version: 0.1.0
*/

import { createLine, createCircle } from './svgutils.js';
import { DrawingBoard } from './drawingboard.js';

const ShapeConstruction = {
    line: {
        currentState: 'waitingForFirstPoint',
        firstPoint: null,
        secondPoint: null,
        tempLine: null,
        markerCircle: null,
        reset: function () {
            this.currentState = 'waitingForFirstPoint';
            this.firstPoint = null;
            this.secondPoint = null;
            this.tempLine = null;
            if (this.markerCircle) {
                this.markerCircle.remove();
                this.markerCircle = null;
            }
        },
        handleMouseDown: function (event) {
            if (this.currentState === 'waitingForFirstPoint') {
                this.firstPoint = { x: event.offsetX, y: event.offsetY };
                this.tempLine = createLine({
                    x1: this.firstPoint.x,
                    y1: this.firstPoint.y,
                    x2: this.firstPoint.x,
                    y2: this.firstPoint.y,
                    stroke: 'black',
                    'stroke-dasharray': '5,5'
                });
                DrawingBoard.svg.appendChild(this.tempLine);

                this.markerCircle = createCircle({
                    cx: this.firstPoint.x,
                    cy: this.firstPoint.y,
                    r: 3,
                    fill: 'black',
                    id: 'line-start-marker'
                });
                DrawingBoard.svg.appendChild(this.markerCircle);

                this.currentState = 'drawingLine';
            }
        },
        handleMouseMove: function (event) {
            if (this.currentState === 'drawingLine') {
                this.secondPoint = { x: event.offsetX, y: event.offsetY };
                this.tempLine.setAttribute('x2', event.offsetX);
                this.tempLine.setAttribute('y2', event.offsetY);
            }
        },
        handleMouseUp: function (event) {
            if (this.currentState === 'drawingLine' && (this.secondPoint != null)) {
                this.tempLine.setAttribute('x2', event.offsetX);
                this.tempLine.setAttribute('y2', event.offsetY);
                this.tempLine.removeAttribute('stroke-dasharray');
                this.currentState = 'finished';
                this.finished();
            }
        },
        finished: function () {
            if (this.markerCircle) {
                this.markerCircle.remove();
                this.markerCircle = null;
            }
            this.reset();
        }
    },
    circle: {
        // To be implemented later
    },
    rectangle: {
        // To be implemented later
    }
};

export { ShapeConstruction };