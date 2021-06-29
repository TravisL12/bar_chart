import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

const rectWidth = 30;

function SingleBarChart({ data }) {
  const ref = useRef();
  const height = Math.max(Math.max.apply(null, data), 200);
  const width = rectWidth * data.length + 100;

  const draw = () => {
    const xScale = d3
      .scaleBand()
      .domain(Object.keys(data))
      .range([0, width])
      .padding(0.3);

    const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);
    const svg = d3.select(ref.current);
    svg
      .selectAll("g")
      .data(data)
      .join(
        (enter) => {
          const g = enter.append("g");

          g.append("rect")
            .attr("x", (_, i) => xScale(i))
            .attr("y", (d) => yScale(d))
            .attr("height", (d) => d)
            .attr("width", rectWidth)
            .attr("stroke-width", 1)
            .attr("stroke", "plum")
            .attr("fill", "pink");

          g.append("text")
            .text((d) => d)
            .join("text")
            .attr("x", (_, i) => xScale(i))
            .attr("y", (d) => yScale(d))
            .attr("width", rectWidth)
            .attr("dominant-baseline", "hanging");

          return g;
        },
        (update) => {
          update
            .select("rect")
            .transition()
            .attr("y", (d) => yScale(d))
            .attr("height", (d) => d);
          update
            .select("text")
            .transition()
            .text((d) => d)
            .attr("y", (d) => yScale(d));
        }
      );
  };

  useEffect(() => {
    d3.select(ref.current).attr("width", width).attr("height", height);
  }, []);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return <svg ref={ref}></svg>;
}

export default SingleBarChart;
