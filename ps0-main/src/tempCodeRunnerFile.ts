const turtle: Turtle = new DrawableTurtle();

    const sideLength = 40;
    // drawSquare(turtle, sideLength);

    // draw into a file
    const svgDrawing = turtle.getSVG();
    fs.writeFileSync('output.html', `<html>\n${svgDrawing}</html>\n`);

    // open it in a web browser
    void open('output.html');