/*
    wwwroot/js/componenteditor/ui/toolpalletinteractions.js
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/
*/

import { DrawingBoard, EditingState } from '../core/drawingboard.js';
import { ShapeConstruction } from '../core/shapeconstruction.js';

export default function setupToolpalletInteractions() {
    setupShapeButtons();
    setupManipulationButtons();
}

function setupShapeButtons() {
    document.querySelectorAll('.shape-button').forEach(button => {
        button.addEventListener('click', function () {
            DrawingBoard.shapeSelected = this.getAttribute('data-shape');
            DrawingBoard.clearSelection();
            DrawingBoard.updateCursor();
            EditingState.CurrentState = EditingState.AddingPart;
            if (DrawingBoard.shapeSelected === 'sp01_ln01_0001') {
                ShapeConstruction.line.reset();
            }
        });
    });
}

function setupManipulationButtons() {
    document.querySelectorAll('.manipulation-button').forEach(button => {
        button.addEventListener('click', function () {
            DrawingBoard.shapeSelected = this.getAttribute('data-manipulation');
            DrawingBoard.clearSelection();
            DrawingBoard.updateCursor();
            EditingState.CurrentState = EditingState.ManipulatingPart;
        });
    });
}