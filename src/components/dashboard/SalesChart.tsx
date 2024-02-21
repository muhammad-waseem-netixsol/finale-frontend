import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useAnalyticsStore from "../../../zustand-store/analytics/analytics";
// import { ApexOptions } from "react-apexcharts";  // Import ApexOptions
import { AnalyticsData } from "@/interfaces/interfaces";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SalesChartProps {
  spanish: number[];
  english: number[];
  intervals: any[];
  turkish: number[];
  french: number[];
}

const SalesChart: React.FC<SalesChartProps> = ({ spanish, english, intervals, turkish, french }) => {
  console.log(french);

  const chartOptions: any = {
    series: [
      {
        name: "English",
        data: english,
      },
      {
        name: "Spanish",
        data: spanish,
      },
      {
        name: "Turkish",
        data: turkish,
      },
      {
        name: "French",
        data: french,
      },
    ],
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 3,
      borderColor: "rgba(0,0,0,0.1)",
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: intervals,
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">News Analytics</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          News On Language Basis
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height={390}
          options={chartOptions}
          series={chartOptions.series}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
