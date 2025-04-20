import { filterData, groupDataByAttributes } from '../utils/filterUtils';
import { DataItem, FilterState } from '../types/data';

// Mock data for testing
const mockData: DataItem[] = [
  {
    id: '1',
    country: 'USA',
    state: 'California',
    city: 'San Francisco',
    sector: 'Retail',
    category: 'Juice',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    mySpend: {
      current: 100000,
      reference: 90000,
      absoluteChange: 10000,
      percentChange: 11.11
    },
    sameStoreSpend: {
      current: 80000,
      reference: 75000,
      absoluteChange: 5000,
      percentChange: 6.67
    },
    newStoreSpend: {
      current: 15000,
      reference: 10000,
      absoluteChange: 5000,
      percentChange: 50
    },
    lostStoreSpend: {
      current: 5000,
      reference: 10000,
      absoluteChange: -5000,
      percentChange: -50
    }
  },
  {
    id: '2',
    country: 'USA',
    state: 'New York',
    city: 'New York',
    sector: 'Food',
    category: 'Snacks',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    mySpend: {
      current: 120000,
      reference: 100000,
      absoluteChange: 20000,
      percentChange: 20
    },
    sameStoreSpend: {
      current: 90000,
      reference: 85000,
      absoluteChange: 5000,
      percentChange: 5.88
    },
    newStoreSpend: {
      current: 20000,
      reference: 10000,
      absoluteChange: 10000,
      percentChange: 100
    },
    lostStoreSpend: {
      current: 10000,
      reference: 15000,
      absoluteChange: -5000,
      percentChange: -33.33
    }
  }
];

describe('filterUtils', () => {
  describe('filterData', () => {
    test('should return all data when no filters are applied', () => {
      const filters: FilterState = {
        startDate: null,
        endDate: null,
        sectors: [],
        categories: [],
        groupingAttributes: [],
        metrics: []
      };
      
      const result = filterData(mockData, filters);
      expect(result.length).toBe(2);
    });
    
    test('should filter by date range', () => {
      const filters: FilterState = {
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-30'),
        sectors: [],
        categories: [],
        groupingAttributes: [],
        metrics: []
      };
      
      const result = filterData(mockData, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });
    
    test('should filter by sector', () => {
      const filters: FilterState = {
        startDate: null,
        endDate: null,
        sectors: ['Retail'],
        categories: [],
        groupingAttributes: [],
        metrics: []
      };
      
      const result = filterData(mockData, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });
    
    test('should filter by category', () => {
      const filters: FilterState = {
        startDate: null,
        endDate: null,
        sectors: [],
        categories: ['Snacks'],
        groupingAttributes: [],
        metrics: []
      };
      
      const result = filterData(mockData, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });
    
    test('should combine multiple filters', () => {
      const filters: FilterState = {
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-30'),
        sectors: ['Retail'],
        categories: [],
        groupingAttributes: [],
        metrics: []
      };
      
      const result = filterData(mockData, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });
  });
  
  describe('groupDataByAttributes', () => {
    test('should not group data when no attributes are selected', () => {
      const result = groupDataByAttributes(mockData, [], []);
      expect(result.length).toBe(2);
    });
    
    test('should group data by country', () => {
      const result = groupDataByAttributes(mockData, ['country'], []);
      expect(result.length).toBe(1); // Both items have the same country (USA)
      expect(result[0].attributeValue).toBe('USA');
      expect(result[0].metrics.mySpend?.current).toBe(220000); // 100000 + 120000
    });
    
    test('should group data by sector', () => {
      const result = groupDataByAttributes(mockData, ['sector'], []);
      expect(result.length).toBe(2); // Different sectors (Retail, Food)
      
      const retailGroup = result.find(item => item.attributeValue === 'Retail');
      expect(retailGroup?.metrics.mySpend?.current).toBe(100000);
      
      const foodGroup = result.find(item => item.attributeValue === 'Food');
      expect(foodGroup?.metrics.mySpend?.current).toBe(120000);
    });
    
    test('should include only selected metrics', () => {
      const result = groupDataByAttributes(mockData, ['country'], ['mySpend']);
      expect(result.length).toBe(1);
      expect(result[0].metrics.mySpend).toBeDefined();
      expect(result[0].metrics.sameStoreSpend).toBeUndefined();
    });
  });
});