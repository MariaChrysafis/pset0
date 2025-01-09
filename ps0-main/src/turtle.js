"use strict";
/* Copyright (c) 2007-2023 MIT 6.102/6.031/6.005 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = exports.LineSegment = exports.PenColor = exports.DrawableTurtle = void 0;
// constants used by DrawableTurtle
var CANVAS_WIDTH = 512;
var CANVAS_HEIGHT = 512;
var CIRCLE_DEGREES = 360;
var HORIZONTAL_DEGREES = CIRCLE_DEGREES / 2;
var DEGREES_TO_VERTICAL = HORIZONTAL_DEGREES / 2;
/**
 * @param degrees an angle measured in degrees
 * @returns the same angle expressed in radians
 */
function degreesToRadians(degrees) {
    return degrees * (Math.PI / HORIZONTAL_DEGREES);
}
/**
 * Turtle that draws in a window on the screen.
 */
var DrawableTurtle = /** @class */ (function () {
    function DrawableTurtle() {
        this.currentPosition = new Point(0, 0);
        this.currentHeading = 0;
        this.currentColor = PenColor.Black;
        this.lines = [];
    }
    DrawableTurtle.prototype.forward = function (units) {
        var newPosition = new Point(this.currentPosition.x + Math.cos(degreesToRadians(DEGREES_TO_VERTICAL - this.currentHeading)) * units, this.currentPosition.y + Math.sin(degreesToRadians(DEGREES_TO_VERTICAL - this.currentHeading)) * units);
        this.lines.push(new LineSegment(this.currentPosition, newPosition, this.currentColor));
        this.currentPosition = newPosition;
    };
    DrawableTurtle.prototype.turn = function (degrees) {
        // shift degrees to [0, CIRCLE_DEGREES), so that currentHeading will remain in that range too
        var degreesClipped = (degrees % CIRCLE_DEGREES + CIRCLE_DEGREES) % CIRCLE_DEGREES;
        this.currentHeading = (this.currentHeading + degreesClipped) % CIRCLE_DEGREES;
    };
    DrawableTurtle.prototype.color = function (color) {
        this.currentColor = color;
    };
    DrawableTurtle.prototype.getSVG = function () {
        /**
         * @param n an x or y coordinate
         * @returns SVG coordinate corresponding to n
         */
        function coord(n) { return n.toFixed(2); }
        /**
         * @param color a PenColor
         * @returns corresponding SVG color name
         */
        function svgColor(color) { return PenColor[color].toLowerCase(); }
        var centerX = CANVAS_WIDTH / 2;
        var centerY = CANVAS_HEIGHT / 2;
        var svg = "\n<svg viewBox=\"0 0 ".concat(coord(CANVAS_WIDTH), " ").concat(coord(CANVAS_HEIGHT), "\" xmlns=\"http://www.w3.org/2000/svg\">\n<g transform=\"translate(").concat(coord(centerX), " ").concat(coord(centerY), ") scale(1 -1)\">\n");
        for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            svg += ("\n  <path fill=\"none\" stroke=\"".concat(svgColor(line.color), "\"\n        d=\"M ").concat(coord(line.start.x), ",").concat(coord(line.start.y), " L ").concat(coord(line.end.x), ",").concat(coord(line.end.y), "\"/>\n"));
        }
        svg += "\n</g>\n</svg>\n\n";
        return svg;
    };
    return DrawableTurtle;
}());
exports.DrawableTurtle = DrawableTurtle;
/**
 * Enumeration of turtle pen colors.
 */
var PenColor;
(function (PenColor) {
    PenColor[PenColor["Transparent"] = 0] = "Transparent";
    PenColor[PenColor["Black"] = 1] = "Black";
    PenColor[PenColor["Gray"] = 2] = "Gray";
    PenColor[PenColor["Red"] = 3] = "Red";
    PenColor[PenColor["Pink"] = 4] = "Pink";
    PenColor[PenColor["Orange"] = 5] = "Orange";
    PenColor[PenColor["Yellow"] = 6] = "Yellow";
    PenColor[PenColor["Green"] = 7] = "Green";
    PenColor[PenColor["Cyan"] = 8] = "Cyan";
    PenColor[PenColor["Blue"] = 9] = "Blue";
    PenColor[PenColor["Magenta"] = 10] = "Magenta";
})(PenColor || (exports.PenColor = PenColor = {}));
/**
 * An immutable line segment in floating-point pixel space.
 */
var LineSegment = /** @class */ (function () {
    /**
     * Construct a line segment from start and end points.
     *
     * @param start one end of the line segment
     * @param end the other end of the line segment
     * @param color line segment color
     */
    function LineSegment(start, end, color) {
        this.start = start;
        this.end = end;
        this.color = color;
    }
    /**
     * Construct a line segment from coordinate pairs.
     *
     * @param startx x-coordinate of start point
     * @param starty y-coordinate of start point
     * @param endx x-coordinate of end point
     * @param endy y-coordinate of end point
     * @param color line segment color
     * @returns line segment from (startx,starty) to (endx,endy) colored `color`
     */
    LineSegment.fromCoordinates = function (startx, starty, endx, endy, color) {
        return new LineSegment(new Point(startx, starty), new Point(endx, endy), color);
    };
    /**
     * Compute the length of this segment.
     *
     * @returns the length of the line segment
     */
    LineSegment.prototype.length = function () {
        return Math.sqrt(Math.pow((this.start.x - this.end.x), 2)
            + Math.pow((this.start.y - this.end.y), 2));
    };
    /**
     * @param that  line segment to compare `this` with
     * @returns true iff this and that represent the same line segment
     */
    LineSegment.prototype.equalValue = function (that) {
        return (this.start.equalValue(that.start)
            && this.end.equalValue(that.end)
            && this.color === that.color);
    };
    return LineSegment;
}());
exports.LineSegment = LineSegment;
/**
 * An immutable point in floating-point pixel space.
 */
var Point = /** @class */ (function () {
    /**
     * Construct a point from an x and y coordinate.
     *
     * @param x the x-coordinate of the point
     * @param y the y-coordinate of the point
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.toString = function () {
        return "Point(" + this.x + "," + this.y + ")";
    };
    /**
     * @param that  point to compare `this` with
     * @returns true iff this and that represent the same point
     */
    Point.prototype.equalValue = function (that) {
        return this.x === that.x && this.y === that.y;
    };
    return Point;
}());
exports.Point = Point;
