export interface SpendMetric {
  current: number;
  reference: number;
  absoluteChange: number;
  percentChange: number;
}

export interface DataItem {
  id?: string;
  country: string;
  state: string;
  city: string;
  sector: string;
  category: string;
  startDate: string;
  endDate: string;
  mySpend: SpendMetric;
  sameStoreSpend: SpendMetric;
  newStoreSpend: SpendMetric;
  lostStoreSpend: SpendMetric;
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  data: DataItem[];
}

export type GroupingAttribute = 'country' | 'state' | 'city' | 'sector' | 'category';

export type MetricType = 'mySpend' | 'sameStoreSpend' | 'newStoreSpend' | 'lostStoreSpend';

export interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  sectors: string[];
  categories: string[];
  groupingAttributes: GroupingAttribute[];
  metrics: MetricType[];
}

export interface TableData {
  id: string;
  attribute: string;
  attributeValue: string;
  metrics: {
    [key in MetricType]?: {
      current: number;
      reference: number;
      absoluteChange: number;
      percentChange: number;
    };
  };
}