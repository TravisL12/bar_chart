import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";

const mainWidth = 800;
const mainHeight = 400;

const margin = { top: 10, right: 30, bottom: 80, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function StackedBarChart({ data }) {
  const ref = useRef();

  const subgroups = Object.keys(data[0]).slice(1);
  const groups = data.map((d) => d.time);
  const stackedData = d3.stack().keys(subgroups)(data);
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["pink", "magenta", "purple"]);

  const xAxis = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
  const yAxis = d3.scaleLinear().domain([0, 60]).range([height, 0]);

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height})`)
      .call(d3.axisBottom(xAxis))
      .selectAll("text")
      .text((d) => d.slice(11))
      .attr("transform", "translate(-13,26) rotate(-90)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left})`)
      .call(d3.axisLeft(yAxis));

    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join((enter) => {
        const g = enter.append("g");
        g.attr("fill", (d) => color(d.key));

        g.select("g")
          .selectAll("rect")
          .data(data, (d) => d)
          .join((enterRect) => {
            console.log(enterRect, "enterRect");
            return enterRect
              .append("rect")
              .attr("x", (d) => xAxis(d.time))
              .attr("transform", `translate(${margin.left})`)
              .attr("y", (d) => yAxis(d[1]))
              .attr("height", (d) => yAxis(d[0]) - yAxis(d[1]))
              .attr("width", xAxis.bandwidth());
          });

        return g;
      });

    // .selectAll("rect")
    // // enter a second time = loop subgroup per subgroup to add all rectangles
    // .data((d) => d)
    // .join("rect")
    // .attr("x", (d) => x(d.data.time))
    // .attr("transform", `translate(${margin.left})`)
    // .attr("y", (d) => y(d[1]))
    // .attr("height", (d) => y(d[0]) - y(d[1]))
    // .attr("width", x.bandwidth());
  }, [data]);

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    draw();
  }, [data, draw]);

  return <svg ref={ref}></svg>;
}

export default StackedBarChart;
