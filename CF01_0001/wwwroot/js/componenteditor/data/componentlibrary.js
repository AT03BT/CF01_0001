/*
    wwwroot/js/componenteditor/componentLibrary.js
    (c) 2025, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    Component Libarary - Version: 0.1.0
    ===================================

      Plannar figure drawing data for electrical components. Examples.
    It can be extrapolated from the property labels what the model of an
    electrical component is. The data can be used to draw the component.
    
        This section of the components model is only concerned with it's
    plannar visual representation. There is an additional
    section to the compoents model that is concerned with logical
    interaction amoungst other electrical components.

        One of the sections concerned with the electrical components interaction
    is the model ElectroLogic.
*/


export const circuitBreakerData = [
    {
        "type": "group",
        "transform": "translate(380,60)",
        "children": [
            {
                "type": "group",
                "id": "breakerHousing",
                "transform": "translate(0,0)",
                "style": { "cursor": "grab" },
                "children": [
                    {
                        "type": "rect",
                        "x": 0,
                        "y": 0,
                        "width": 40,
                        "height": 220,
                        "stroke": "black",
                        "fill": "white",
                        "strokeWidth": 1,
                        "aria-label": "Main Body"
                    },
                    {
                        "type": "group",
                        "id": "switchOpening",
                        "transform": "translate(0,80)",
                        "style": { "cursor": "pointer" },
                        "children": [
                            {
                                "type": "rect",
                                "x": 0,
                                "y": 0,
                                "width": 40,
                                "height": 60,
                                "stroke": "black",
                                "fill": "white",
                                "aria-label": "Switch Body"
                            },
                            {
                                "type": "rect",
                                "x": 10,
                                "y": 10,
                                "width": 20,
                                "height": 40,
                                "stroke": "#C8C8C8",
                                "fill": "#C8C8C8",
                                "strokeWidth": 1,
                                "aria-label": "Switch Lever"
                            },
                            {
                                "type": "rect",
                                "id": "leverDown",
                                "x": 5,
                                "y": 45,
                                "width": 30,
                                "height": 5,
                                "fill": "#6E6E6E",
                                "aria-label": "Lever Down"
                            },
                            {
                                "type": "rect",
                                "id": "leverUp",
                                "x": 5,
                                "y": 10,
                                "width": 30,
                                "height": 5,
                                "fill": "#6E6E6E",
                                "style": { "display": "none" },
                                "aria-label": "Lever Up"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "group",
                "id": "Top Lug",
                "transform": "translate(0, 0)",
                "children": [
                    {
                        "type": "rect",
                        "x": 0,
                        "y": 0,
                        "width": 40,
                        "height": 40,
                        "stroke": "black",
                        "fill": "white",
                        "strokeWidth": 1,
                        "aria-label": "Lug Body"
                    },
                    {
                        "type": "group",
                        "id": "electricalPort",
                        "transform": "translate(20, 20)",
                        "children": [
                            {
                                "type": "circle",
                                "cx": 0,
                                "cy": 0,
                                "r": 10,
                                "fill": "black",
                                "aria-label": "Electrical Port"
                            },
                            {
                                "type": "circle",
                                "cx": 0,
                                "cy": 0,
                                "r": 5,
                                "fill": "white",
                                "aria-label": "Electrical Port Inner"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "group",
                "id": "Bottom Lug",
                "transform": "translate(0, 180)",
                "children": [
                    {
                        "type": "rect",
                        "x": 0,
                        "y": 0,
                        "width": 40,
                        "height": 40,
                        "stroke": "black",
                        "fill": "white",
                        "strokeWidth": 1,
                        "aria-label": "Lug Body"
                    },
                    {
                        "type": "group",
                        "id": "electricalPort",
                        "transform": "translate(20, 20)",
                        "children": [
                            {
                                "type": "circle",
                                "cx": 0,
                                "cy": 0,
                                "r": 10,
                                "fill": "black",
                                "aria-label": "Electrical Port"
                            },
                            {
                                "type": "circle",
                                "cx": 0,
                                "cy": 0,
                                "r": 5,
                                "fill": "white",
                                "aria-label": "Electrical Port Inner"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
