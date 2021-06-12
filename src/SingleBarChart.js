import * as d3 from 'd3';
import React, { useRef, useEffect, useCallback, useMemo } from 'react';

const rectWidth = 30;

function SingleBarChart({ data }) {
  const ref = useRef();
  const height = useMemo(() => Math.max.apply(null, data), [data]);
  const width = rectWidth * data.length + 100;

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    if (ref.current) {
      svg.selectAll('*').remove();
    }

    const xScale = d3
      .scaleBand()
      .domain(Object.keys(data))
      .range([0, width])
      .padding(0.3);

    const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);

    const g = svg.selectAll('g').data(data).enter().append('g');
    g.append('rect')
      .data(data)
      .attr('x', (_, i) => xScale(i))
      .attr('y', (d) => yScale(d))
      .attr('height', (d) => d)
      .attr('width', rectWidth)
      .attr('stroke-width', 1)
      .attr('stroke', 'plum')
      .attr('fill', 'pink');

    g.append('text')
      .text((d) => d)
      .attr('x', (_, i) => xScale(i))
      .attr('y', 20);
  }, [data, height]);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return <svg width={width} height={height} ref={ref}></svg>;
}

export default SingleBarChart;
