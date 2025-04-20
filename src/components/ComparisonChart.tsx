import React, { useMemo } from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { TableData, MetricType } from '../types/data';

interface ComparisonChartProps {
  data: TableData[];
  selectedMetrics: MetricType[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, selectedMetrics }) => {
  const theme = useTheme();
  
  const metricsToDisplay = selectedMetrics.length > 0 
    ? selectedMetrics 
    : ['mySpend', 'sameStoreSpend', 'newStoreSpend', 'lostStoreSpend'];
  
  const metricLabels: Record<MetricType, string> = {
    mySpend: 'My Spend',
    sameStoreSpend: 'Same Store Spend',
    newStoreSpend: 'New Store Spend',
    lostStoreSpend: 'Lost Store Spend'
  };

  // Prepare data for percentage change comparison
  const chartData = useMemo(() => {
    // For each row, extract the percent change for each metric
    return data.slice(0, 8).map(row => {
      const result: { [key: string]: any } = {
        group: row.attributeValue
      };
      
      (metricsToDisplay as any[]).forEach((metric: any) => {
        if ((row.metrics as any)[metric]) {
          (result as any)[(metricLabels as any)[metric]] = (row.metrics as any)[metric]?.percentChange || 0;
        }
      });
      
      
      return result;
    });
  }, [data, metricsToDisplay]);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 2, 
        border: '1px solid rgba(0, 0, 0, 0.12)', 
        height: 400,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={1}>
        Percentage Change Comparison
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {data.length > 8 ? 'Top 8 groups shown' : 'All groups shown'}
      </Typography>
      
      <Box sx={{ height: 320 }}>
        {chartData.length > 0 ? (
          <ResponsiveBar
            data={chartData}
            keys={metricsToDisplay.map(m => (metricLabels as any)[m])}
            indexBy="group"
            margin={{ top: 20, right: 130, bottom: 80, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            colors={{ scheme: 'nivo' }}
            borderRadius={2}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]]
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: 'Group',
              legendPosition: 'middle',
              legendOffset: 60,
              truncateTickAt: 0
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Percentage Change',
              legendPosition: 'middle',
              legendOffset: -50,
              format: value => `${value}%`
            }}
            labelFormat={value => `${value}%`}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            markers={[
              {
                axis: 'y',
                value: 0,
                lineStyle: { stroke: theme.palette.text.secondary, strokeWidth: 1, strokeDasharray: '4 4' },
                legend: 'No Change',
                legendPosition: 'top-left',
                legendOrientation: 'horizontal',
                // legendOffsetX: -40,
                // legendOffsetY: 10
              }
            ]}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 12,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            animate={true}
          />
        ) : (
          <Box 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
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

export default ComparisonChart;