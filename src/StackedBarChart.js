import * as d3 from 'd3';
import React, { useRef, useEffect, useCallback } from 'react';

const mainWidth = 800;
const mainHeight = 400;

const margin = { top: 10, right: 30, bottom: 80, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function StackedBarChart({ data }) {
  const ref = useRef();

  const groups = data.map((d) => d.time);
  const subgroups = Object.keys(data[0]).slice(1);
  const stackedData = d3.stack().keys(subgroups)(data);
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(['pink', 'magenta', 'purple']);

  const xAxis = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
  const yAxis = d3.scaleLinear().domain([0, 60]).range([height, 0]);

  const updateBars = (selection) => {
    selection
      .selectAll('rect')
      .data(
        (d) => d,
        (d) => d.data.time
      )
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => xAxis(d.data.time))
            .attr('transform', `translate(${margin.left})`)
            .attr('y', (d) => yAxis(d[1]))
            .attr('height', (d) => yAxis(d[0]) - yAxis(d[1]))
            .attr('width', xAxis.bandwidth()),
        (update) => {
          update
            .transition()
            .attr('y', (d) => yAxis(d[1]))
            .attr('height', (d) => yAxis(d[0]) - yAxis(d[1]));
        }
      );
  };

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    // update x-axis
    svg
      .select('.x-axis')
      .call(d3.axisBottom(xAxis))
      .selectAll('text')
      .text((d) => d.slice(11))
      .attr('transform', 'translate(-13,26) rotate(-90)');

    // update y-axis
    svg
      .select('.y-axis')
      .attr('transform', `translate(${margin.left})`)
      .call(d3.axisLeft(yAxis));

    svg
      .selectAll('g.stacks')
      .selectAll('g.stack')
      .data(stackedData)
      .join(
        (enter) => {
          const g = enter.append('g').attr('class', 'stack');
          g.append('g')
            .attr('class', 'bars')
            .attr('fill', (d) => color(d.key));

          updateBars(g.select('.bars'));

          return g;
        },
        (update) => {
          updateBars(update.select('.bars'));
        }
      );
  }, [data]);

  useEffect(() => {
    draw();
  }, [data, draw]);

  // initialize graph
  useEffect(() => {
    const svg = d3.select(ref.current);

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('class', 'stacks');

    // create x-axis
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left}, ${height})`);

    // create y-axis
    svg.append('g').attr('class', 'y-axis');

    draw();
  }, []);

  return <svg ref={ref}></svg>;
}

export default StackedBarChart;
