import * as d3 from 'd3';
import React, { useRef, useEffect, useCallback, useMemo } from 'react';

const rectWidth = 50;

function SingleBarChart({ data }) {
  const ref = useRef();
  const maxHeight = useMemo(() => Math.max.apply(null, data), [data]);

  const draw = useCallback(() => {
    d3.select(ref.current)
      .selectAll('rect')
      .data(data)
      .attr('x', (_, i) => i * rectWidth)
      .attr('y', (d) => maxHeight - d)
      .attr('height', (d) => d)
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
    <svg width={rectWidth * data.length} height={maxHeight} ref={ref}>
      {data.map((val, idx) => (
        <rect key={`${val}-${idx}`} />
      ))}
    </svg>
  );
}

export default SingleBarChart;
