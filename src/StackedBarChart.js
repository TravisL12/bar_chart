import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";

const mainWidth = 1000;
const mainHeight = 600;

const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;
const sharedTranslate = `translate(${margin.left}, ${margin.top})`;

function StackedBarChart({ data }) {
  const ref = useRef();

  const groups = data.map((d) => d.time);
  const subgroups = Object.keys(data[0]).slice(1);
  const stackedData = d3.stack().keys(subgroups)(data);
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["pink", "magenta", "purple", "green", "lightblue"]);

  const xAxis = d3.scaleBand().range([0, width]).padding([0.2]);
  const yAxis = d3.scaleLinear().rangeRound([height - margin.top, 0]);

  const initialize = () => {
    const svg = d3.select(ref.current);

    // create main viewport
    svg
      .attr("width", mainWidth)
      .attr("height", mainHeight)
      .append("g")
      .attr("class", "stacks");

    // create x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${margin.left}, ${height})`);

    // create y-axis
    svg.append("g").attr("class", "y-axis").attr("transform", sharedTranslate);
  };

  const updateBars = (selection) => {
    selection
      .selectAll("rect")
      .data((d) => d)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "bar")
            .attr("transform", sharedTranslate)
            .attr("height", (d) => yAxis(d[0]) - yAxis(d[1]))
            .attr("width", xAxis.bandwidth())
            .attr("x", (d) => xAxis(d.data.time))
            .attr("y", (d) => yAxis(d[1]))
            .style("opacity", 0)
            .call((enter) =>
              enter.transition().duration(500).style("opacity", 1)
            ),
        (update) => {
          update
            .transition()
            .attr("height", (d) => yAxis(d[0]) - yAxis(d[1]))
            .attr("width", xAxis.bandwidth())
            .attr("x", (d) => xAxis(d.data.time))
            .attr("y", (d) => yAxis(d[1]));
        }
      );
  };

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    // update x-axis
    xAxis.domain(groups);
    svg
      .select(".x-axis")
      .call(d3.axisBottom(xAxis))
      .selectAll("text")
      .text((d) => d.slice(11))
      .attr("transform", "translate(-13,26) rotate(-90)");

    // update y-axis
    yAxis.domain([0, d3.max(data, (d) => d3.sum(Object.values(d))) * 1.2]);
    svg.select(".y-axis").transition().call(d3.axisLeft(yAxis));

    svg
      .selectAll("g.stacks")
      .selectAll("g.stack")
      .data(stackedData)
      .join(
        (enter) => {
          const g = enter.append("g").attr("class", "stack");

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

  useEffect(() => {
    draw();
  }, [data, draw]);

  // initialize graph
  useEffect(() => {
    initialize();
    draw();
  }, []);

  return (
    <div style={{ padding: "10px 0" }}>
      <svg ref={ref}></svg>
    </div>
  );
}

export default StackedBarChart;
