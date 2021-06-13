import { Component, Input, ViewChild, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { XYData } from '@shared/models/xydata.model';
import { Curve } from '@shared/models/curve.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-logxlogy-graph',
  templateUrl: './logxlogygraph.component.html',
  styleUrls: ['./logxlogygraph.component.sass']
})
export class LogXLogYGraphComponent implements OnChanges {
  Ncurves = 2;

  @Input()
  curves: Curve[] = new Array(this.Ncurves);

  xymodels: XYData[][] = new Array(this.Ncurves);
  curveColors = ['black', 'red']

  @Input()
  xlabel: string = '';

  @Input()
  ylabel: string = '';

  @ViewChild('chart', { static: true })
  chartContainer!: ElementRef;


  figure!: d3.Selection<SVGGElement, unknown, null, undefined>;
  chartProps: any;

  resizeId!: ReturnType<typeof setTimeout>;

  constructor() {
    for (let i = 0; i < this.Ncurves; i++) {
      console.log("INIT")
      this.curves[i] = {x: new Float64Array(), y: new Float64Array()};
      this.xymodels[i] = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartProps) {
      this.updateChart();
    } else {
      this.buildChart();
    }

  }

  parseInputToXYData() {
    /// data is stored as x: [x_i,...], y: [y_i,...],
    /// but d3 wants [(x_i,y_i),...]
    for (let i = 0; i < this.Ncurves; i++) {
      this.xymodels[i] = [];
      if (this.curves[i].y.length > 0) {
        for (let j = 0; j < this.curves[i].x.length; j++) {
          this.xymodels[i].push({
            x: this.curves[i].x[j],
            y: this.curves[i].y[j]
          });
        }
      }
    }
  }

  mergeTypedArrays(a: Float64Array, b: Float64Array): Float64Array {
    // Checks for truthy values on both arrays
    if(!a && !b) throw 'Please specify valid arguments for parameters a and b.';

    // Checks for truthy values or empty arrays on each argument
    // to avoid the unnecessary construction of a new array and
    // the type comparison
    if(!b || b.length === 0) return a;
    if(!a || a.length === 0) return b;

    // Make sure that both typed arrays are of the same type
    if(Object.prototype.toString.call(a) !== Object.prototype.toString.call(b))
        throw 'The types of the two arguments passed for parameters a and b do not match.';

    var c = new Float64Array(a.length + b.length);
    c.set(a);
    c.set(b, a.length);

    return c;
  }


  buildChart() {
    this.parseInputToXYData();
    this.chartProps = {
      capsize: 5
    };
    const element = this.chartContainer.nativeElement;
    // let margin = { top: 30, right: 20, bottom: 30, left: 50 };
    this.chartProps.margin = { top: 30, right: 20, bottom: 60, left: 60 };
    this.chartProps.width = element.offsetWidth - this.chartProps.margin.left - this.chartProps.margin.right;
    this.chartProps.height = element.offsetHeight - this.chartProps.margin.top - this.chartProps.margin.bottom;

    this.figure = d3.select(element)
    .append('svg')
    .attr('width', element.offsetWidth)
    .attr('height', element.offsetHeight)
    .append('g')
    .attr('transform', 'translate(' + this.chartProps.margin.left + ', ' + this.chartProps.margin.top + ')');

    // xlabel
    this.figure.append('text')
    .attr('transform',
          'translate(' + (this.chartProps.width / 2) + ' ,' +
                        (this.chartProps.height + this.chartProps.margin.top + 20) + ')')
    .style('text-anchor', 'middle')
    .text(this.xlabel);

    // ylabel
    this.figure.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - this.chartProps.margin.left)
    .attr('x', 0 - (this.chartProps.height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text(this.ylabel);

    // Set the ranges
    var [minX, maxX] = d3.extent(this.mergeTypedArrays(this.curves[0].x, this.curves[1].x));
    minX ??= 0.01;
    maxX ??= 0.2;
    var [minY, maxY] = d3.extent(this.mergeTypedArrays(this.curves[0].y, this.curves[1].y));
    minY ??= 1;
    maxY ??= 10;

    this.chartProps.xscale = d3.scaleLog()
    .domain([minX, maxX])
    .range([0, this.chartProps.width]);

    this.chartProps.yscale = d3.scaleLog()
    .domain([minY, maxY])
    .range([this.chartProps.height, 0]);

    this.chartProps.line = d3.line<XYData>()
    .x(d => this.chartProps.xscale(d.x))
    .y(d => this.chartProps.yscale(d.y))
    .curve(d3.curveMonotoneX);

    this.chartProps.xAxis = d3.axisBottom(this.chartProps.xscale)
    .ticks(4, d3.format("") as any);

    this.chartProps.yAxis = d3.axisLeft(this.chartProps.yscale)
    .ticks(4, d3.format("") as any);

    for (let i = 0; i < this.Ncurves; i++) {
      this.figure.append('path')
      .datum(this.xymodels[i])
      .attr('d', this.chartProps.line)
      .attr('fill', 'none')
      .attr('stroke', this.curveColors[i])
      .attr('class', 'line');
    }

    this.figure.append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(0,${this.chartProps.height})`)
    .call(this.chartProps.xAxis);

    this.figure.append('g')
    .attr('class', 'yAxis')
    .call(this.chartProps.yAxis);

  }

  refreshChartSize() {
    if (this.chartProps) {
      d3.selectAll('svg') // remove old plot
      .remove();

      this.buildChart(); // rebuild axis
      this.updateChart(); // plot data
    }
  }

  updateChart() {
    this.parseInputToXYData();
    this.chartProps.xscale
    .domain(d3.extent(this.mergeTypedArrays(this.curves[0].x, this.curves[1].x)));

    this.chartProps.yscale
    .domain(d3.extent(this.mergeTypedArrays(this.curves[0].y, this.curves[1].y)));

    this.figure.transition();

    //clear graph
    this.figure.selectAll('circle') // remove old dots
    .remove();
    this.figure.selectAll('line') // remove old lines
    .remove();
    this.figure.selectAll('path') // update the line
    .remove();

    this.figure.select('.xAxis') // update x axis
    .attr('class', 'xAxis')
    .call(this.chartProps.xAxis);

    this.figure.select('.yAxis') // update y axis
    .attr('class', 'yAxis')
    .call(this.chartProps.yAxis);

    d3.selectAll("g.yAxis g.tick")
    .append("line")
    .attr("stroke", "lightgrey")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", this.chartProps.width)
    .attr("y2", 0);

    d3.selectAll("g.xAxis g.tick")
    .append("line")
    .attr("stroke", "lightgrey")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -this.chartProps.height);

    for (let i = 0; i < this.Ncurves; i++) {
      this.figure.append('path')
      .datum(this.xymodels[i])
      .attr('d', this.chartProps.line)
      .attr('fill', 'none')
      .attr('stroke', this.curveColors[i])
      .attr('class', 'line');
    }
  }

  onResize(event: UIEvent) {
    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(this.windowResizedDone.bind(this), 500);
  }

  windowResizedDone() {
    this.refreshChartSize();
  }
}
