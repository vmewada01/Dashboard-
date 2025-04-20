import React, { useMemo } from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { TableData, MetricType } from "../types/data";
import { prepareChartData } from "../utils/filterUtils";

interface BarChartViewProps {
  data: TableData[];
  selectedMetrics: MetricType[];
}

const BarChartView: React.FC<BarChartViewProps> = ({
  data,
  selectedMetrics,
}) => {
  const theme = useTheme();

  // Use the first selected metric or default to mySpend
  const selectedMetric =
    selectedMetrics.length > 0 ? selectedMetrics[0] : "mySpend";

  const metricLabels: Record<MetricType, string> = {
    mySpend: "My Spend",
    sameStoreSpend: "Same Store Spend",
    newStoreSpend: "New Store Spend",
    lostStoreSpend: "Lost Store Spend",
  };

  const chartData = useMemo(() => {
    return prepareChartData(data, selectedMetric).slice(0, 10); // Only show the top 10 for better visualization
  }, [data, selectedMetric]);

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
      <Typography variant="h6" fontWeight={600} mb={1}>
        {metricLabels[selectedMetric]} by Group
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {data.length > 10 ? "Top 10 groups shown" : "All groups shown"}
      </Typography>

      <Box sx={{ height: 320 }}>
        {chartData.length > 0 ? (
          <ResponsiveBar
            data={chartData}
            keys={["current", "reference"]}
            indexBy="attributeValue"
            margin={{ top: 20, right: 120, bottom: 80, left: 80 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            colors={[theme.palette.primary.main, theme.palette.grey[400]]}
            borderRadius={4}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: "Group",
              legendPosition: "middle",
              legendOffset: 60,
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Amount",
              legendPosition: "middle",
              legendOffset: -60,
              format: (value) =>
                `$${
                  Math.abs(value) >= 1000
                    ? `${
                        Math.sign(value) * Math.floor(Math.abs(value) / 1000)
                      }k`
                    : Math.sign(value) * Math.abs(value)
                }`,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 12,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
            // motionStiffness={90}
            // motionDamping={15}
          />
        ) : (
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
        )}
      </Box>
    </Paper>
  );
};

export default BarChartView;
