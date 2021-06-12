import * as d3 from 'd3';
import React, { useRef, useEffect, useCallback } from 'react';

const mainWidth = 800;
const mainHeight = 400;

const margin = { top: 10, right: 30, bottom: 20, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function StackedBarChart({ data }) {
  const ref = useRef();

  const draw = useCallback(() => {
    if (ref.current) {
      d3.select(ref.current).selectAll('*').remove();
    }

    const svg = d3.select(ref.current);

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = Object.keys(data[0]).slice(1);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map((d) => d.time);

    // Add X axis
    const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left})`)
      .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['pink', 'magenta', 'purple']);

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subgroups)(data);

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
      .attr('x', (d) => x(d.data.time))
      .attr('transform', `translate(${margin.left})`)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());
  }, [data]);

  useEffect(() => {
    d3.select(ref.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    draw();
  }, [data, draw]);

  return <svg width={mainWidth} height={mainHeight} ref={ref}></svg>;
}

export default StackedBarChart;
