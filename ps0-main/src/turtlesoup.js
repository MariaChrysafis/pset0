"use strict";
/* Copyright (c) 2007-2023 MIT 6.102/6.031/6.005 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.drawPersonalArt = exports.findPath = exports.angle = exports.distance = exports.drawApproximateCircle = exports.chordLength = exports.drawSquare = void 0;
var fs_1 = require("fs");
var open_1 = require("open");
var turtle_js_1 = require("./turtle.js");
/**
 * Draw a square.
 *
 * @param turtle the turtle context
 * @param sideLength length of each side, must be >= 0
 */
function drawSquare(turtle, sideLength) {
    throw new Error("implement me!");
}
exports.drawSquare = drawSquare;
/**
 * Determine the length of a chord of a circle.
 * (There is a simple formula; derive it or look it up.)
 *
 * @param radius radius of a circle, must be > 0
 * @param angle in radians, where 0 <= angle < Math.PI
 * @returns the length of the chord subtended by the given `angle`
 *          in a circle of the given `radius`
 */
function chordLength(radius, angle) {
    return 2 * radius * Math.sin(angle / 2);
}
exports.chordLength = chordLength;
/**
 * Approximate a circle by drawing a many-sided regular polygon,
 * using exactly `numSides` small counterclockwise turns,
 * so that the turtle is back to its original heading and position
 * after the drawing is complete.
 *
 * @param turtle the turtle context
 * @param radius radius of the circle circumscribed around the polygon, must be > 0
 * @param numSides number of sides of the polygon to draw, must be >= 10
 */
function drawApproximateCircle(turtle, radius, numSides) {
    throw new Error("implement me!");
}
exports.drawApproximateCircle = drawApproximateCircle;
/**
 * Calculate the distance between two points.
 *
 * @param p1 one point
 * @param p2 another point
 * @returns Euclidean distance between p1 and p2
 */
function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}
exports.distance = distance;
/**
 * Given a list of points, find a sequence of turns and moves that visits the points in order,
 * ending with the turtle facing its original heading.
 *
 * @param points array of N input points.  Adjacent points must be distinct, and the array must not start with (0,0).
 * @returns an array of length 2N+1 of the form [turn_0, move_0, ..., turn_N-1, move_N-1, turn_N]
 *    such that if the turtle starts at (0,0) heading up (positive y direction),
 *    and executes turn(turn_i) and forward(move_i) actions in the same order,
 *    then it will be at points[i] after move_i for all valid i,
 *    and be back to its original upward heading after turn_N.
 */
function angle(point1, point2) {
    var delta = new turtle_js_1.Point(point1.x - point2.x, point1.y - point2.y);
    return Math.atan(delta.x / delta.y);
}
exports.angle = angle;
function findPath(points) {
    var currentPoint = points[0];
    var currentTheta = 0;
    var path = Array();
    for (var i = 0; i + 1 < points.length; i++) {
        //get angle between current and points[i]
        var theta = angle(currentPoint, points[i]);
        //add the angle
        path.push(currentTheta - theta);
        currentTheta = theta;
        //add the length
        path.push(distance(currentPoint, points[i]));
        currentPoint = points[i];
    }
    path.push(360 - currentTheta);
    return path;
}
exports.findPath = findPath;
/**
 * Draw your personal, custom art.
 *
 * Many interesting images can be drawn using the simple implementation of a turtle.
 * See the problem set handout for more information.
 *
 * @param turtle the turtle context
 */
function drawPersonalArt(turtle) {
    throw new Error("Implement me!");
}
exports.drawPersonalArt = drawPersonalArt;
/**
 * Main program.
 *
 * This function creates a turtle and draws in a window.
 */
function main() {
    var turtle = new turtle_js_1.DrawableTurtle();
    var sideLength = 40;
    // drawSquare(turtle, sideLength);
    // draw into a file
    var svgDrawing = turtle.getSVG();
    fs_1.default.writeFileSync('output.html', "<html>\n".concat(svgDrawing, "</html>\n"));
    // open it in a web browser
    void (0, open_1.default)('output.html');
}
exports.main = main;
