import React, { useEffect, useRef, useState } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";
import moment from "moment"; // Import Moment.js

// Import utilities
import { formatValue } from "../utils/Utils";
import { chartColors } from "./ChartjsConfig";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
);

function LineChart01({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const { tooltipBodyColor, tooltipBgColor, tooltipBorderColor, chartAreaBg } =
    chartColors;

  useEffect(() => {
    let newChart = null;

    const initializeChart = () => {
      if (!canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      newChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          chartArea: {
            backgroundColor: darkMode ? chartAreaBg.dark : chartAreaBg.light,
          },
          layout: {
            padding: 20,
          },
          scales: {
            y: {
              display: false,
              beginAtZero: true,
            },
            x: {
              type: "time",
              time: {
                parser: "MM-DD-YYYY",
                unit: "month",
                displayFormats: {
                  month: "MMM",
                },
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
              display: true,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (tooltipItem) => {
                  const date = moment(tooltipItem[0].label, "MMM YYYY");
                  return date.format("MMMM YYYY");
                },
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
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "nearest",
          },
          maintainAspectRatio: false,
          resizeDelay: 200,
        },
      });

      setChart(newChart);
    };

    initializeChart();

    // Cleanup function
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [data, darkMode]);

  useEffect(() => {
    if (!chart) return;

    chart.options.chartArea.backgroundColor = darkMode
      ? chartAreaBg.dark
      : chartAreaBg.light;
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
    chartAreaBg,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  ]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

export default LineChart01;
