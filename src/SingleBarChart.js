import * as d3 from 'd3';
import React, { useRef, useEffect, useCallback } from 'react';

const mainWidth = 800;
const mainHeight = 400;

const margin = { top: 10, right: 30, bottom: 20, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

const rectWidth = 50;

function SingleBarChart({ data }) {
  const ref = useRef();

  const draw = useCallback(() => {
    d3.select(ref.current)
      .selectAll('rect')
      .data(data)
      .attr('x', (_, i) => i * rectWidth)
      .attr('height', (d) => d * 10)
      .attr('width', rectWidth)
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '5 5')
      .attr('stroke', 'plum')
      .attr('fill', 'pink');
  }, [data]);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return (
    <svg width={rectWidth * data.length} height={mainHeight} ref={ref}>
      {data.map((val, idx) => (
        <rect key={`${val}-${idx}`} />
      ))}
    </svg>
  );
}

export default SingleBarChart;
