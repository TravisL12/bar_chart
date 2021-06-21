import * as d3 from 'd3';
import React, { useRef, useEffect, useCallback } from 'react';

const mainWidth = 800;
const mainHeight = 400;

const margin = { top: 10, right: 30, bottom: 80, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function StackedBarChart({ data }) {
  const ref = useRef();

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map((d) => d.time);
    // List of subgroups = header of the csv files = soil condition here
    const subgroups = Object.keys(data[0]).slice(1);
    //stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subgroups)(data);
    // color palette = one color per subgroup
    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['pink', 'magenta', 'purple']);

    // Add X axis
    const xAxis = d3
      .scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2]);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height})`)
      .call(d3.axisBottom(xAxis))
      .selectAll('text')
      .text((d) => d.slice(11))
      .attr('transform', 'translate(-13,26) rotate(-90)');

    // Add Y axis
    const yAxis = d3.scaleLinear().domain([0, 60]).range([height, 0]);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left})`)
      .call(d3.axisLeft(yAxis));

    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => xAxis(d.data.time))
      .attr('transform', `translate(${margin.left})`)
      .attr('y', (d) => yAxis(d[1]))
      .attr('height', (d) => yAxis(d[0]) - yAxis(d[1]))
      .attr('width', xAxis.bandwidth());
  }, [data]);

  useEffect(() => {
    d3.select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  }, []);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return <svg width={mainWidth} height={mainHeight} ref={ref}></svg>;
}

export default StackedBarChart;
