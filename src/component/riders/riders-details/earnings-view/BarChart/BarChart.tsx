import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { colorMapping, stackKeysData } from "./Constant";
import { useContainerSize } from "../../../../../hooks/useContainerSize";

function BarChart(props: any) {
  const { chartData } = props;

  const wrappedRef = useRef<HTMLDivElement | any>(null);
  const svgRef = useRef<any>(null);

  let { height: svgHeight, width: svgWidth } = useContainerSize(wrappedRef);
  svgHeight *= 0.95;
  svgWidth *= 0.9;

  const createBarChart = (data: any) => {
    const margins = {
      top: 20,
      right: 30,
      bottom: 60,
      left: 50,
    };
    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current);
    svg.append("g").attr("class", "x-axis");
    svg.append("g").attr("class", "y-axis");
    let barData: any[] = [];
    let xDomain = [];

    data
      .sort((a: any, b: any) => (a.week > b.week ? 1 : -1))
      // eslint-disable-next-line array-callback-return
      .map((d: any, i: any) => {
        xDomain.push(d.week);
        barData.push({ ...d });
      });

    const stackGenerator = d3.stack().keys(stackKeysData);
    const layers = stackGenerator(barData) as any;
    barData = barData.filter((e) => e["Total"]);

    let barValue = Math.max(...barData.map((e) => Number(e["Total"])));
    let maxValue = barValue ? barValue : 20;

    const xScale = d3
      .scaleBand()
      .padding(0)
      .domain(barData.map((d) => d.week))
      .rangeRound([margins.left, svgWidth - margins.top])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.ceil(maxValue * 1.03)])
      .rangeRound([svgHeight - margins.bottom, margins.top]);

    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const yAxis = d3.axisLeft(yScale).ticks(6);

    svg
      .select(".x-axis")
      .attr("transform", `translate(${margins.left}, ${svgHeight})`)
      .call(xAxis as any)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${svgHeight - margins.bottom})`)
      .call(xAxis as any)
      .append("text")
      .attr("fill", "black")
      .attr("class", "x-axis-label-text")
      .attr(
        "transform",
        `translate(${(svgWidth - margins.left) / 2}, ${margins.bottom})`
      )
      .text("Year")
      .attr("font-weight", "500");

    svg
      .select(".y-axis")
      .attr("transform", `translate( ${margins.left}, 0)`)
      .call(yAxis as any)
      .append("text")
      .attr("fill", "black")
      .attr("class", "y-axis-label-text")
      .attr(
        "transform",
        `translate(-40, ${(svgHeight - margins.bottom) / 2.3}) rotate(-90)`
      )
      .text("Earnings")
      .attr("font-weight", "500");

    const rects = svg
      .append("g")
      .attr("class", "layer")
      .attr("transform", `translate(0,0)`);

    for (let stack of layers) {
      for (let bar of stack) {
        const barHeight = svgHeight - margins.bottom - yScale(bar[1] - bar[0]);
        const xDimension = xScale(bar.data.week as any);

        const keyValue = stack.key.toLowerCase();

        if (!isNaN(barHeight) && typeof barHeight === "number") {
          rects
            .append("rect")
            .attr("class", "rects")
            .attr("x", xDimension as any)
            .attr("y", yScale(bar[1]))
            .attr("width", xScale.bandwidth())
            .attr("height", barHeight)
            .attr("fill", colorMapping[keyValue])
            .append("svg:title")
            .text(bar[1] - bar[0]);
        }

        rects
          .append("text")
          .text(bar[1] - bar[0])
          .attr("x", (xDimension as any) + xScale.bandwidth() * 0.5)
          .attr("y", yScale(bar[1]) + barHeight / 2)
          .attr("style", "fill: white")
          .attr("font-size", 12)
          .attr("font-weight", 500)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central");
      }
    }
  };

  useEffect(() => {
    if (svgHeight && svgWidth && chartData) {
      createBarChart(chartData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgHeight, svgWidth, chartData]);

  return (
    <div className="barchart-container" ref={wrappedRef}>
      <svg ref={svgRef} height={svgHeight} width={svgWidth}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default BarChart;
