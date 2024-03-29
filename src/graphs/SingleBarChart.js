import * as d3 from "d3";
import React, { useCallback, useRef, useEffect } from "react";
import { dataColors } from "../data";
import {
  MARGIN as margin,
  MAIN_WIDTH as mainWidth,
  MAIN_HEIGHT as mainHeight,
} from "../constants";

const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function SingleBarChart({ data }) {
  const ref = useRef();

  const xScale = d3.scaleBand().range([0, width]).padding(0.3);
  const yScale = d3.scaleLinear().range([height, 0]);

  const sortAscending = () => {
    data.sort((a, b) => d3.ascending(a, b));
    draw();
  };

  const sortDesc = () => {
    data.sort((a, b) => d3.descending(a, b));
    draw();
  };

  const textTransform = useCallback(
    (d) => {
      return d > 10
        ? `translate(${xScale.bandwidth() / 2}, 15)`
        : `translate(${xScale.bandwidth() / 2}, -2)`;
    },
    [xScale]
  );

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    xScale.domain(Object.keys(data));
    svg
      .select(".x-axis")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .text((d) => +d + 1);

    yScale.domain([0, d3.max(data) * 1.1]);
    svg.select(".y-axis").transition().call(d3.axisLeft(yScale));

    svg
      .selectAll(".bars")
      .selectAll(".bar")
      .data(data)
      .join(
        (enter) => {
          const g = enter.append("g").attr("class", "bar");

          g.append("rect")
            .attr("x", (_, i) => xScale(i))
            .attr("y", (d) => yScale(d))
            .attr("height", (d) => height - yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("stroke-width", 1)
            .attr("stroke", "black")
            .attr("fill", dataColors[0]);

          g.append("text")
            .text((d) => d)
            .join("text")
            .attr("x", (_, i) => xScale(i))
            .attr("y", (d) => yScale(d))
            .attr("transform", textTransform)
            .attr("text-anchor", "middle");

          return g;
        },
        (update) => {
          update
            .select("rect")
            .transition()
            .attr("x", (_, i) => xScale(i))
            .attr("y", (d) => yScale(d))
            .attr("height", (d) => height - yScale(d))
            .attr("width", xScale.bandwidth());

          update
            .select("text")
            .transition()
            .text((d) => d)
            .attr("x", (_, i) => xScale(i))
            .attr("y", (d) => yScale(d))
            .attr("transform", textTransform);
        },
        (exit) => {
          exit.select("text").remove();
          exit.select("rect").transition().style("opacity", 0);
          exit.transition().remove();
        }
      );
  }, [data, textTransform, xScale, yScale]);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return (
    <div>
      <div>
        <button onClick={sortAscending}>asc</button>
        <button onClick={sortDesc}>desc</button>
      </div>
      <svg ref={ref} width={mainWidth} height={mainHeight}>
        <g
          className="main"
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          <g className="bars" />
          <g className="x-axis" transform={`translate(0, ${height})`} />
          <g className="y-axis" />
        </g>
      </svg>
    </div>
  );
}

export default SingleBarChart;
