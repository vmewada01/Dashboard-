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
    .filter(Boolean);

  const hasData =
    Array.isArray(chartData) &&
    chartData.length > 0 &&
    chartData.some(
      (series: any) => Array.isArray(series?.data) && series.data.length > 0
    );

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
    </Paper>
  );
};

export default TimeSeriesChart;
