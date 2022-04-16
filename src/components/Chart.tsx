import { theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export function AnalyticsChart() {
  const options = {
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
      foreColor: theme.colors.gray[500],
    },
    grid: {
      show: true,
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      axisBorder: {
        color: theme.colors.gray[600],
      },
      axisTicks: {
        color: theme.colors.gray[600],
      },
      categories: [
        "15/04",
        "16/04",
        "17/04",
        "18/04",
        "19/04",
        "20/04"
      ],
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityGrom: "0.7",
      },
    },
  };

  const series = [{ name: "Quantidade", data: [10, 12, 25, 35, 46] }];

  return <Chart options={options} series={series} type="area" height={160} />;
}

export function DonutChart() {
  const options = {
    grid: {
      show: true,
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      axisBorder: {
        color: theme.colors.gray[600],
      },
      axisTicks: {
        color: theme.colors.gray[600],
      },
    },
    fill: {
      opacity: 0.8,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityGrom: "0.7",
      },
    },
  }
  const series = [ 10, 12, 25, 35, 46 ];
  const labels = ['A', 'B', 'C', 'D', 'E']

  return <Chart options={options} series={series} type="donut" width={380} />;
}