import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";
import { dataColors } from "../data";
import {
  MARGIN as margin,
  MAIN_WIDTH as mainWidth,
  MAIN_HEIGHT as mainHeight,
} from "../constants";

const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

const radius = Math.min(width, height) / 2;

// https://stackoverflow.com/a/41958108
const textRotate = (d) =>
  d.endAngle < Math.PI
    ? ((d.startAngle / 2 + d.endAngle / 2) * 180) / Math.PI
    : ((d.startAngle / 2 + d.endAngle / 2 + Math.PI) * 180) / Math.PI;

function PieChart({ data }) {
  const ref = useRef();

  const color = d3.scaleOrdinal().domain(Object.keys(data)).range(dataColors);
  const pie = d3
    .pie()
    .value(({ value }) => {
      return value;
    })
    // make sure order is constant and pieces don't flop around
    .sort((a, b) => d3.ascending(a.key, b.key));

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    const pieData = pie(
      Object.entries(data).map(([key, value]) => ({ key, value }))
    );
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll(".pie")
      .selectAll(".piece")
      .data(pieData, (d) => d.data.key)
      .join(
        (enter) => {
          const g = enter.append("g").attr("class", "piece");

          g.append("path")
            .attr("d", arcGenerator)
            .attr("fill", (d) => color(d.data.key))
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

          // Now add the annotation. Use the centroid method to get the best coordinates
          g.append("text")
            .text((d) => d.data.key)
            .attr(
              "transform",
              (d) =>
                `translate(${arcGenerator.centroid(
                  d
                )}) rotate(-90) rotate(${textRotate(d)})`
            )
            .style("text-anchor", "middle")
            .style("font-size", 17);

          return g;
        },
        (update) => {
          update.select("path").transition().attr("d", arcGenerator);

          update
            .select("text")
            .transition()
            .text((d) => d.data.key)
            .attr(
              "transform",
              (d) =>
                `translate(${arcGenerator.centroid(
                  d
                )}) rotate(-90) rotate(${textRotate(d)})`
            );
        }
      );
  }, [data, pie, color]);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return (
    <svg ref={ref} width={mainWidth} height={mainHeight}>
      <g
        className="pie"
        transform={`translate(${mainWidth / 2}, ${mainHeight / 2})`}
      />
    </svg>
  );
}

export default PieChart;
