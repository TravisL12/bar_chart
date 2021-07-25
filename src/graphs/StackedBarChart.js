import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";
import { dataColors } from "../data";

const mainWidth = 1000;
const mainHeight = 400;

const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function StackedBarChart({ data }) {
  const ref = useRef();

  const groups = data.map((d) => d.time);
  const subgroups = Object.keys(data[0]).slice(1);
  const stackedData = d3.stack().keys(subgroups)(data);
  const color = d3.scaleOrdinal().domain(subgroups).range(dataColors);

  const xScale = d3.scaleBand().range([0, width]).padding([0.2]);
  const yScale = d3.scaleLinear().rangeRound([height, 0]);

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    // update x-axis
    xScale.domain(groups);
    svg
      .select(".x-axis")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .text((d) => d.slice(11))
      .attr("transform", "translate(-13,26) rotate(-90)");

    // update y-axis
    yScale.domain([0, d3.max(data, (d) => d3.sum(Object.values(d))) * 1.2]);
    svg.select(".y-axis").transition().call(d3.axisLeft(yScale));

    svg
      .selectAll("g.stacks")
      .selectAll("g.stack")
      .data(stackedData)
      .join(
        (enter) => {
          const g = enter.append("g").attr("class", (d) => `stack ${d.key}`);

          g.append("g")
            .attr("class", "bars")
            .attr("fill", (d) => color(d.key));

          updateBars(g.select(".bars"));

          return g;
        },
        (update) => {
          updateBars(update.select(".bars"));
        }
      );
  }, [data]);

  const updateBars = (selection) => {
    selection
      .selectAll("rect")
      .data((d) => d)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "bar")
            .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
            .attr("width", xScale.bandwidth())
            .attr("x", (d) => xScale(d.data.time))
            .attr("y", (d) => yScale(d[1]))
            .attr("stroke", "grey")
            .style("opacity", 0)
            .call((enter) =>
              enter.transition().duration(500).style("opacity", 1)
            )
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave),
        (update) => {
          update
            .transition()
            .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
            .attr("width", xScale.bandwidth())
            .attr("x", (d) => xScale(d.data.time))
            .attr("y", (d) => yScale(d[1]));
        }
      );
  };

  const mouseover = function () {
    const subgroupName = d3.select(this.parentNode).datum().key;
    d3.select(ref.current).selectAll(".bar").style("opacity", 0.2);
    d3.select(ref.current)
      .selectAll(`.${subgroupName} rect`)
      .style("opacity", 1);
  };

  const mouseleave = function () {
    d3.select(ref.current).selectAll(".bar").style("opacity", 0.8);
  };

  // initialize graph
  useEffect(() => {
    const svg = d3.select(ref.current);
    // create main viewport
    svg
      .attr("width", mainWidth)
      .attr("height", mainHeight)
      .append("g")
      .attr("class", "stacks")
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
  }, [data, draw, ref.current]);

  return (
    <div style={{ padding: "10px 0" }}>
      <svg ref={ref}></svg>
    </div>
  );
}

export default StackedBarChart;
