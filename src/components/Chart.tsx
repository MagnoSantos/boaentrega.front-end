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
        "1",
        "2",
        "2021-03-20T00:00:00.000Z",
        "2021-03-21T00:00:00.000Z",
        "2021-03-23T00:00:00.000Z",
        "2021-03-24T00:00:00.000Z",
        "2021-03-25T00:00:00.000Z",
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

  const series = [{ name: "series1", data: [300, 120, 10, 28, 51, 18, 109] }];

  return <Chart options={options} series={series} type="area" height={160} />;
}
