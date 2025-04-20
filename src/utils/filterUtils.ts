import { DataItem, FilterState, GroupingAttribute, MetricType, TableData } from "../types/data";


export const filterData = (data: DataItem[], filters: FilterState): DataItem[] => {
  return data.filter(item => {

    if (filters.startDate && filters.endDate) {
      const itemStartDate = new Date(item.startDate);
      const itemEndDate = new Date(item.endDate);
      if (itemEndDate < filters.startDate || itemStartDate > filters.endDate) {
        return false;
      }
    }

    if (filters.sectors.length > 0 && !filters.sectors.includes(item.sector)) {
      return false;
    }

    if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
      return false;
    }

    return true;
  });
};

export const groupDataByAttributes = (
  data: DataItem[],
  groupingAttributes: GroupingAttribute[],
  selectedMetrics: MetricType[]
): TableData[] => {

  if (groupingAttributes.length === 0) {
    return data.map(item => {
      const metricsData: { [key: string]: any } = {};
      
      const metricsToInclude = selectedMetrics.length > 0 ? selectedMetrics : ['mySpend', 'sameStoreSpend', 'newStoreSpend', 'lostStoreSpend'];
      
      metricsToInclude.forEach(metric => {
        metricsData[metric] = (item as any)[metric];
      });
      
      return {
        id: item.id || `${item.country}-${item.state}-${item.city}-${item.sector}-${item.category}`,
        attribute: 'All',
        attributeValue: `${item.country}, ${item.state}, ${item.city}, ${item.sector}, ${item.category}`,
        metrics: metricsData
      };
    });
  }


  const groupedData: Map<string, DataItem[]> = new Map();
  
  data.forEach(item => {
    const attributeValues = groupingAttributes.map(attr => item[attr]).join('-');
    
    if (!groupedData.has(attributeValues)) {
      groupedData.set(attributeValues, []);
    }
    
    groupedData.get(attributeValues)?.push(item);
  });
  
  return Array.from(groupedData.entries()).map(([key, items]) => {
    
    const combinedMetrics: { [key: string]: any } = {};
    
    const metricsToInclude = selectedMetrics.length > 0 ? selectedMetrics : ['mySpend', 'sameStoreSpend', 'newStoreSpend', 'lostStoreSpend'];
    
    metricsToInclude.forEach(metric => {
      combinedMetrics[metric] = {
        current: items.reduce((sum, item) => sum + (item as any)[metric].current, 0),
        reference: items.reduce((sum, item) => sum + (item as any)[metric].reference, 0),
        absoluteChange: items.reduce((sum, item) => sum + (item as any)[metric].absoluteChange, 0),
        percentChange: calculateAveragePercentChange(items, metric)
      };
    });
    
  
    const firstItem = items[0];
    const attributeLabels = groupingAttributes.map(attr => firstItem[attr]).join(', ');
    
    return {
      id: key,
      attribute: groupingAttributes.join(', '),
      attributeValue: attributeLabels,
      metrics: combinedMetrics
    };
  });
};

const calculateAveragePercentChange = (items: DataItem[], metric: any): number => {
  const totalReference = items.reduce((sum, item) => sum + (item as any)[metric].reference, 0);
  const totalCurrent = items.reduce((sum, item) => sum + (item as any)[metric].current, 0);
  
  if (totalReference === 0) return 0;
  
  return ((totalCurrent - totalReference) / totalReference) * 100;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const prepareChartData = (
  tableData: TableData[],
  selectedMetric: MetricType = 'mySpend'
) => {
  return tableData.map(row => ({
    attributeValue: row.attributeValue,
    current: row.metrics[selectedMetric]?.current || 0,
    reference: row.metrics[selectedMetric]?.reference || 0,
    percentChange: row.metrics[selectedMetric]?.percentChange || 0
  })).sort((a, b) => b.current - a.current);
};