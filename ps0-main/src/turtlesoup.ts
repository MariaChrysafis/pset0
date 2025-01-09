/* Copyright (c) 2007-2023 MIT 6.102/6.031/6.005 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

import fs from 'fs';
import open from 'open';
import { Turtle, DrawableTurtle, LineSegment, PenColor, Point } from './turtle.js';

/**
 * Draw a square.
 * 
 * @param turtle the turtle context
 * @param sideLength length of each side, must be >= 0
 */
export function drawSquare(turtle: Turtle, sideLength: number): void {
    throw new Error("implement me!");
}

/**
 * Determine the length of a chord of a circle.
 * (There is a simple formula; derive it or look it up.)
 * 
 * @param radius radius of a circle, must be > 0
 * @param angle in radians, where 0 <= angle < Math.PI
 * @returns the length of the chord subtended by the given `angle` 
 *          in a circle of the given `radius`
 */
export function chordLength(radius: number, angle: number): number {
    return 2 * radius * Math.sin(angle/2);
}

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
export function drawApproximateCircle(turtle: Turtle, radius: number, numSides: number): void {
    throw new Error("implement me!");
}

/**
 * Calculate the distance between two points.
 * 
 * @param p1 one point
 * @param p2 another point
 * @returns Euclidean distance between p1 and p2
 */
export function distance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

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
export function findPath(points: Array<Point>): Array<number> {
    function angle(point: Point) {
        if (point.x == 0 && point.y == 0) {
            return 90;
        }
        return Math.atan(point.y/point.x) * 180/Math.PI;
    }
    let currentPoint: Point = new Point(0, 0);
    const initDirection: number = 90;
    let currentDirection: number = initDirection;
    let arr: Array<number> = new Array();
    for (let i = 0; i < points.length; i++) {
        let direction = angle(points[i]);
        arr.push(currentDirection - direction); // change in direction
        currentDirection = direction;
        arr.push(distance(currentPoint, points[i]));
        currentPoint = points[i];
    }
    arr.push(currentDirection - initDirection);
    return arr;
}

/**
 * Draw your personal, custom art.
 * 
 * Many interesting images can be drawn using the simple implementation of a turtle.
 * See the problem set handout for more information.
 * 
 * @param turtle the turtle context
 */
export function drawPersonalArt(turtle: Turtle): void {
    throw new Error("Implement me!");
}

/**
 * Main program.
 * 
 * This function creates a turtle and draws in a window.
 */
export function main(): void {
    const turtle: Turtle = new DrawableTurtle();

    const sideLength = 40;
    // drawSquare(turtle, sideLength);

    // draw into a file
    const svgDrawing = turtle.getSVG();
    fs.writeFileSync('output.html', `<html>\n${svgDrawing}</html>\n`);

    // open it in a web browser
    void open('output.html');
}