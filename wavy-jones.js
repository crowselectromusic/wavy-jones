class WavyJones {
  constructor(context, element, lineThickness = 3, lineColor = "#43a047") {
    let elem = document.getElementById(element);
    let analyser = context.createAnalyser();

    // set up an svg inside the target element
    let svgNamespace = "http://www.w3.org/2000/svg";
    let paper = document.createElementNS(svgNamespace, "svg");

    paper.setAttribute('width', elem.offsetWidth - Math.round(lineThickness*1.5));
    paper.setAttribute('height', elem.offsetHeight);
    paper.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    elem.appendChild(paper); 

    // add a path for our oscilloscope line to the svg
    let oscLine = document.createElementNS(svgNamespace, "path");
    oscLine.setAttribute("stroke", lineColor);
    oscLine.setAttribute("stroke-width", lineThickness);
    oscLine.setAttribute("fill","none");
    paper.appendChild(oscLine);

    let noDataPoints = 10;
    let freqData = new Uint8Array(analyser.frequencyBinCount);

    let drawLine = function () {
      analyser.getByteTimeDomainData(freqData);

      let graphPoints = [];
      let graphStr = '';

      // move the line to the first data point
      graphPoints.push('M0, ' + (freqData[0] / 128) * (elem.offsetHeight/2));

      for (let i = 0; i < freqData.length; i++) {
        if (i % noDataPoints) {
          let point = (freqData[i] / 128) * (elem.offsetHeight / 2);
          graphPoints.push('L' + i + ', ' + point); 
        }
      }

      for (let i = 0; i < graphPoints.length; i++) {
        graphStr += graphPoints[i];
      }

      oscLine.setAttribute("d", graphStr);

      setTimeout(drawLine, 100);
    };

    drawLine();

    // save these for access later
    this.oscLine = oscLine;
    this.paper = paper;
    this.elem = elem;
    this.lineColor = lineColor;
    this.lineThickness = lineThickness;
    this.analyser = analyser;
    this.updateCanvasSize();
  }


  updateStyle(lineColor, lineThickness) {
    this.oscLine.setAttribute("stroke", lineColor);
    this.oscLine.setAttribute("stroke-width", lineThickness);
  }

  updateCanvasSize() {
    this.paper.setAttribute('width', this.elem.offsetWidth - Math.round(this.lineThickness*1.5));
    this.paper.setAttribute('height', this.elem.offsetHeight);
  }
}
