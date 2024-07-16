import React, { useRef, useEffect, useState } from "react";
import { useThemeProvider } from "../utils/ThemeContext";

import { chartColors } from "./ChartjsConfig";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig, formatValue } from "../utils/Utils";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
);

function BarChart01({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    let newChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => formatValue(value),
              color: darkMode ? textColor.dark : textColor.light,
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light,
            },
          },
          x: {
            type: "time",
            time: {
              parser: "MM-DD-YYYY",
              unit: "month",
              displayFormats: {
                month: "MMM YY",
              },
            },
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              color: darkMode ? textColor.dark : textColor.light,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => formatValue(context.parsed.y),
            },
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: "htmlLegend",
          afterUpdate(chart, args, options) {
            const ul = legend.current;
            if (!ul) return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items =
              chart.options.plugins.legend.labels.generateLabels(chart);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.marginRight = tailwindConfig().theme.margin[4];

              const button = document.createElement("button");
              button.style.display = "inline-flex";
              button.style.alignItems = "center";
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                const meta = chart.getDatasetMeta(item.datasetIndex);
                meta.hidden =
                  meta.hidden === null
                    ? !chart.data.datasets[item.datasetIndex].hidden
                    : null;
                chart.update();
              };

              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = "3px";
              box.style.borderColor = item.fillStyle;
              box.style.pointerEvents = "none";

              const labelContainer = document.createElement("span");
              labelContainer.style.display = "flex";
              labelContainer.style.alignItems = "center";

              const value = document.createElement("span");
              value.classList.add("text-slate-800", "dark:text-slate-100");
              value.style.fontSize = tailwindConfig().theme.fontSize["3xl"][0];
              value.style.lineHeight =
                tailwindConfig().theme.fontSize["3xl"][1].lineHeight;
              value.style.fontWeight = tailwindConfig().theme.fontWeight.bold;
              value.style.marginRight = tailwindConfig().theme.margin[2];
              value.style.pointerEvents = "none";

              const label = document.createElement("span");
              label.classList.add("text-slate-500", "dark:text-slate-400");
              label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
              label.style.lineHeight =
                tailwindConfig().theme.fontSize.sm[1].lineHeight;

              const theValue = chart.data.datasets[
                item.datasetIndex
              ].data.reduce((a, b) => a + b, 0);
              const valueText = document.createTextNode(formatValue(theValue));
              const labelText = document.createTextNode(item.text);

              value.appendChild(valueText);
              label.appendChild(labelText);

              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(labelContainer);
              labelContainer.appendChild(value);
              labelContainer.appendChild(label);

              ul.appendChild(li);
            });
          },
        },
      ],
    });

    setChart(newChart);

    return () => newChart.destroy();
  }, [data, darkMode]);

  useEffect(() => {
    if (!chart) return;

    chart.options.scales.x.ticks.color = darkMode
      ? textColor.dark
      : textColor.light;
    chart.options.scales.y.ticks.color = darkMode
      ? textColor.dark
      : textColor.light;
    chart.options.scales.y.grid.color = darkMode
      ? gridColor.dark
      : gridColor.light;
    chart.options.plugins.tooltip.bodyColor = darkMode
      ? tooltipBodyColor.dark
      : tooltipBodyColor.light;
    chart.options.plugins.tooltip.backgroundColor = darkMode
      ? tooltipBgColor.dark
      : tooltipBgColor.light;
    chart.options.plugins.tooltip.borderColor = darkMode
      ? tooltipBorderColor.dark
      : tooltipBorderColor.light;

    chart.update("none");
  }, [
    chart,
    darkMode,
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  ]);

  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <ul ref={legend} className="flex flex-wrap"></ul>
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default BarChart01;
