import * as d3 from 'd3';
import * as Util from './util.js';
import { merge } from 'lodash';

class Chart {
  constructor(props) {
    this.points = props.nodes;
    this.colors = d3.scaleOrdinal().range(d3.schemeCategory20.concat(d3.schemeCategory20b).concat(d3.schemeCategory20c));
    this.x = 0;
    this.y = 0;
    this.get
    this.sources = {};
    this.targets = {};
    this.targeted = false;
    this.getPie = this.getPie.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setPieId = this.setPieId.bind(this);
    this.getList = this.getList.bind(this);
    this.getListInfo = this.getListInfo.bind(this);
  }

  initialize() {
    this.initializeData();
    this.initializeSVG();
    this.render();
  }

  initializeData() {
    this.data = Object.keys(this.points).map(key => { return {[key]: this.points[key]}; });
    this.keyList = Util.createKeyList(this.data);
    this.matrix = Util.createMatrix(this.data, this.keyList);
  }

  initializeSVG() {
    this.getDims();
    this.setSVG();
  }

  handleMouseOver(d) {
    const id = this.getKey(d.data);
    d3.select(`#pie${id}`).style('opacity', 0.5);
    d3.selectAll('.ribbon').style('opacity', 0.1)
    d3.selectAll(`#source${id}`)
      .style('opacity', 1)
      .style('line-width', 10);

    this.getTextSections(d.data[id]);
  }

  handleMouseOut(d) {
    const id = this.getKey(d.data);

    d3.select(`#pie${id}`).style('opacity', 1);
    d3.selectAll('.ribbon')
      .style('opacity', 0.5)
      .style('line-width', 2);
    d3.select('#details')
      .selectAll('section')
      .remove();
    d3.select('#details')
      .selectAll('article')
      .remove();
  }

  handleClick() {
    this.selected = this.selected ? false : true;

    if (this.selected) {
      d3.select('#details')
        .insert('section', ':first-child')
        .append('button')
        .attr('class', 'button')
        .text('Disable Scroll Lock')
        .on('click', this.handleClick);
    } else {
      d3.select('.button')
        .remove();
    }
  }

  parseTextElements(d) {
    return [
      { Id: d.id },
      { Label: d.label },
      { Activity: d.Activity },
      { ['Object']: d.Object }
    ]
  }

  getTextSections(d) {
    d3.select('#details')
      .selectAll('section')
      .data(this.parseTextElements(d))
      .enter()
      .append('section')
      .attr('class', 'hover-title')
        .selectAll('article')
        .data(d => [Object.keys(d)[0], d[Object.keys(d)[0]]])
        .enter()
        .append('article')
          .attr('class', (d, i) => i === 0 ? 'title' : 'info')
          .text((d, i) => i === 0 ? d + ':' : d);

    this.getList(d.parents, 'Sources');
    this.getList(d.children, 'Targets');
  }

  getList(list, label) {
    const sect = d3.select('#details')
                  .append('section')
                    .append('article')
                    .attr('class', 'title')
                    .text(`${label}:`);

    sect.selectAll('article')
      .data(list)
      .enter()
      .append('article')
      .attr('class', 'info')
      .text(d => this.getListInfo(d, label))
      .style('font-size', '0.3em')
      .exit()
      .remove();
  }

  getListInfo(d, label) {
    const labelType = label === 'Sources' ? 'Source' : 'Target';
    const name = this.points[d[labelType]].label;

    return `${name}, ${d['Type']}, ${d['Label']}`;
  }

  setPieId(d, i) {
    this.getRibbons(d, i);
    return 'pie' + Object.keys(d.data)[0].toString();
  }

  getDims() {
    this.dims = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    this.renderDims = [this.dims[0] * 2 / 3, this.dims[1] * 4 / 5];
    this.radius = Math.min(this.renderDims[0], this.renderDims[1]) / 2;
  }

  setSVG() {
    const x = this.renderDims[0], y = this.renderDims[1];
    this.svg = d3.select('#chart')
      .append('svg')
      .attr('width', x)
      .attr('height', y);
  }

  setG() {
    this.g = this.svg
      .append('g')
      .attr('width', this.renderDims[0])
      .attr('height', this.renderDims[1]);
  }

  getKey(d) {
    return Object.keys(d)[0];
  }

  getRibbon() {
    return d3.ribbon()
      .radius(this.radius - 70);
  }

  getArc() {
    return d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 70);
  }

  getPie() {
    return d3.pie()
      .value((d, i) => {
        const key = Object.keys(d)[0];
        const item = d[key];
        const parents = item.parents.length > 0 ? item.parents.length : 1;
        const children = item.children.length > 0 ? item.children.length : 1;

        return parents + children;
      })
      .sort(null);
  }

  getChord(d, i) {
    return d3.chord()
      .padAngle(0.5);
  }

  getRibbons(d, i) {
    const data = d.data[this.getKey(d.data)];
    const children = data.children;
    const parents = data.parents;
    const angle = (d.startAngle + d.endAngle) / 2;

    children.forEach(child => this.genChildRibbon(child, angle));
    parents.forEach(parent => this.genParentRibbon(parent, angle));
  }

  genChildRibbon(child, angle) {
    child.endAngle = angle;
    const key = child.Source;
    this.sources[key] = this.sources[key] !== undefined ? this.sources[key].concat([child]) : [child];
  }

  genParentRibbon(parent, angle) {
    parent.startAngle = angle;
    const key = parent.Target;
    this.targets[key] = this.targets[key] !== undefined ? this.targets[key].concat([parent]) : [parent];
  }


  getChart() {
    this.svg.append('g')
      .attr('class', 'chart')
      .attr('transform', 'translate(' + (this.renderDims[0] / 2) + ',' + (this.renderDims[1] / 2) + ')')
      .selectAll('path')
      .data(this.getPie()(this.data))
        .enter()
        .append('path')
        .attr('d', this.getArc())
        .attr('class', 'donut')
        .attr('id', (d, i) => this.setPieId(d, i))
        .attr('fill', (d, i) => this.colors(Object.keys(d.data)[0]))
        .attr('opacity', 1)
        .on('click', this.handleClick )
        .on('mouseover', d => this.selected ? '' : this.handleMouseOver(d))
        .on('mouseout', d => this.selected ? '' : this.handleMouseOut(d));
  }

  getChord() {
    const width = this.renderDims[0], height = this.renderDims[1];
    const colors = this.colors;

    this.svg.append("g")
      .attr('class', 'chords')
      .attr('transform', 'translate(' + (this.renderDims[0] / 2) + ',' + (this.renderDims[1] / 2) + ')')
      .selectAll('path')
        .data(this.chords)
        .enter()
        .append("path")
        .attr("d", this.getRibbon())
        .attr('class', 'ribbon')
        .attr('id', d => 'source' + d.source.index.toString())
        .attr("fill", (d, i) => this.colors(i))
        .style('stroke', (d, i) => this.colors(i))
        .style('stroke-width', 1.5)
        .style('opacity', 0.5);
      }

  genChords() {
    const chord = [];
    const targets = this.targets;

    for (let prop in targets) {
      const target = targets[prop];

      for (let i = 0; i < target.length; i++) {
        const item = target[i];
        const chordItem = {
          source: {
            index: item.Source,
            subindex: item.Target,
            startAngle: item.startAngle,
            endAngle: item.startAngle,
            value: 10,
          },
          target: {
            index: item.Target,
            subindex: item.Source,
            startAngle: item.endAngle,
            endAngle: item.endAngle,
          }
        };

        chord.push(chordItem);
      }
    }

    chord.group = {};
    this.chords = chord;
  }

  getLabels() {
    d3.select('#list')
      .append('ul')
      .attr('class', 'labels')
      .attr('transform', 'translate(' + (this.renderDims[0] / 2) + ',' + (this.renderDims[1] / 2) + ')')
      .selectAll('li')
      .data(this.getPie()(this.data))
        .enter()
        .append('ul')
        .append('text')
        .attr('font-size', '1')
        .text(d => {
          const source = d.data[this.getKey(d.data)];

          return `${source.label}: ${source.children.length} targets`;
        })
  }

  render() {
    this.getChart();
    this.genChords();
    this.getChord();
    this.getLabels();
  }
}

export default Chart;
