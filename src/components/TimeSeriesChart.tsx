import React from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { MetricType } from "../types/data";

interface TimeSeriesChartProps {
  data: any;
  selectedMetrics: MetricType[];
  title: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  selectedMetrics,
  title,
}) => {
  const theme = useTheme();

  const metricsToDisplay =
    Array.isArray(selectedMetrics) && selectedMetrics.length > 0
      ? selectedMetrics
      : ["mySpend", "sameStoreSpend", "newStoreSpend", "lostStoreSpend"];

  const metricLabels: Record<MetricType, string> = {
    mySpend: "My Spend",
    sameStoreSpend: "Same Store Spend",
    newStoreSpend: "New Store Spend",
    lostStoreSpend: "Lost Store Spend",
  };

  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
  ];

  const chartData: any = metricsToDisplay
    .map((metric, index) => {
      const metricData = data?.[metric];

      // Defensive check: skip if data is not present or not an array
      if (!Array.isArray(metricData) || metricData.length === 0) return null;

      return {
        id: (metricLabels as any)[metric],
        color: colors[index % colors.length],
        data: metricData.map((point: any) => ({
          x: point.date,
          y: point.value,
        })),
      };
    })
    .filter(Boolean); // remove null entries

  const hasData =
    chartData.length > 0 &&
    chartData.some((series: any) => series?.data?.length > 0);

  if (!data) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid rgba(0, 0, 0, 0.12)",
        height: 400,
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        {title}
      </Typography>

      <Box sx={{ height: 320 }}>
        {/* {hasData ? (
          <ResponsiveLine
            data={chartData}
            margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "time", format: "%Y-%m-%d", useUTC: false }}
            xFormat="time:%Y-%m-%d"
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisBottom={{
              format: "%b %d",
              tickValues: "every 2 weeks",
              legend: "Date",
              legendOffset: 36,
              legendPosition: "middle",
              truncateTickAt: 0,
            }}
            axisLeft={{
              legend: "Amount",
              legendOffset: -40,
              legendPosition: "middle",
              format: (value) =>
                `$${
                  Math.abs(value) >= 1000
                    ? `${
                        Math.sign(value) * Math.floor(Math.abs(value) / 1000)
                      }k`
                    : Math.sign(value) * Math.abs(value)
                }`,
            }}
            enablePoints={false}
            enableSlices="x"
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
            motionConfig="gentle"
          />
        ) : ( */}
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No data available for the selected filters
          </Typography>
        </Box>
        {/* )} */}
      </Box>
    </Paper>
  );
};

export default TimeSeriesChart;
