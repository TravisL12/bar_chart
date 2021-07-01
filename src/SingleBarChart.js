import * as d3 from "d3";
import React, { useCallback, useRef, useEffect } from "react";

const mainWidth = 1000;
const mainHeight = 300;

const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function SingleBarChart({ data }) {
  const ref = useRef();

  const xScale = d3
    .scaleBand()
    .domain(Object.keys(data))
    .range([0, width])
    .padding(0.3);

  const yScale = d3.scaleLinear().range([height, 0]);

  const sortAscending = () => {
    data.sort((a, b) => d3.ascending(a, b));
    draw();
  };

  const sortDesc = () => {
    data.sort((a, b) => d3.descending(a, b));
    draw();
  };

  const initialize = () => {
    const svg = d3.select(ref.current);

    // create viewport
    svg
      .attr("width", mainWidth)
      .attr("height", mainHeight)
      .append("g")
      .attr("class", "bars")
      .attr("transform", `translate(${margin.left})`);

    // create x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${margin.left}, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .text((d) => +d + 1);

    // create y-axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left})`);
  };

  const textTransform = (d) => {
    return d > 10
      ? `translate(${xScale.bandwidth() / 2}, 15)`
      : `translate(${xScale.bandwidth() / 2}, -2)`;
  };

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);
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
            .attr("fill", "pink");

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
            .attr("y", (d) => yScale(d))
            .attr("height", (d) => height - yScale(d));
          update
            .select("text")
            .transition()
            .text((d) => d)
            .attr("y", (d) => yScale(d))
            .attr("transform", textTransform);
        }
      );
  }, [data, height, width]);

  useEffect(() => {
    initialize();
    draw();
  }, []);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return (
    <div>
      <div>
        <button onClick={sortAscending}>asc</button>
        <button onClick={sortDesc}>desc</button>
      </div>
      <div style={{ padding: "10px 0" }}>
        <svg ref={ref}></svg>
      </div>
    </div>
  );
}

export default SingleBarChart;
