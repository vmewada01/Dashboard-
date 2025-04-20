import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { MetricType } from "../types/data";

interface TimeSeriesChartProps {
  data: any;
  selectedMetrics: MetricType[];
  title: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  title,
}) => {


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
