import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";
import { animals, dataColors } from "../data";

const mainWidth = 1000;
const mainHeight = 400;

const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function LineChart({ data }) {
  const ref = useRef();

  const xScale = d3.scaleLinear().range([0, width]);
  const yScale = d3.scaleLinear().rangeRound([height, 0]);
  const color = d3.scaleOrdinal().domain(animals).range(dataColors);

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    // update x-axis
    xScale.domain([0, d3.max(data, (d) => d3.max(d[1], (d) => d.x))]);
    svg.select(".x-axis").call(d3.axisBottom(xScale));

    // update y-axis
    yScale.domain(d3.extent(data.map(([_, d]) => d).flat(), (d) => d.y));
    svg.select(".y-axis").transition().call(d3.axisLeft(yScale));

    svg
      .selectAll(".lines")
      .selectAll(".line")
      .data(data, (d) => d[0]) // <---- wrap data in array!!!!
      .join(
        (enter) => {
          const line = enter.append("g").attr("class", (d) => `line ${d[0]}`);

          return line
            .append("path")
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", (d) => color(d[0]))
            .attr("d", (dPath) => {
              return d3
                .line()
                .x((d) => xScale(d.x))
                .y((d) => yScale(d.y))(dPath[1]);
            })
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave);
        },
        (update) => {
          update
            .select("path")
            .transition()
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", (d) => color(d[0]))
            .attr("d", (dPath) => {
              return d3
                .line()
                .x((d) => xScale(d.x))
                .y((d) => yScale(d.y))(dPath[1]);
            });
        }
      );
  }, [data, xScale, yScale]);

  const mouseover = function () {
    const subgroupName = d3.select(this.parentNode).datum()[0];
    d3.select(ref.current).selectAll(".line").style("opacity", 0.2);
    d3.select(ref.current).selectAll(`.${subgroupName}`).style("opacity", 1);
  };

  const mouseleave = function () {
    d3.select(ref.current).selectAll(".line").style("opacity", 1);
  };

  // initialize graph
  useEffect(() => {
    const svg = d3.select(ref.current);
    // create main viewport
    svg
      .attr("width", mainWidth)
      .attr("height", mainHeight)
      .append("g")
      .attr("class", "lines")
      .attr("transform", `translate(${margin.left})`);

    // create x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${margin.left}, ${height})`);

    // create y-axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left})`);
  }, []);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return (
    <div style={{ padding: "10px 0" }}>
      <svg ref={ref}></svg>
    </div>
  );
}

export default LineChart;
