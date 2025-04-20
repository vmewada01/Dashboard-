import { DataItem, User } from '../types/data';
import { addDays } from 'date-fns';

// Generate a unique ID for each item
const addIds = (items: DataItem[]): DataItem[] => {
  return items.map((item, index) => ({
    ...item,
    id: `item-${index}`,
  }));
};

// Mock data for User 1
const user1Data: DataItem[] = addIds([
  {
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    sector: "Retail",
    category: "Juice",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 120000,
      reference: 100000,
      absoluteChange: 20000,
      percentChange: 20
    },
    sameStoreSpend: {
      current: 95000,
      reference: 90000,
      absoluteChange: 5000,
      percentChange: 5.56
    },
    newStoreSpend: {
      current: 15000,
      reference: 10000,
      absoluteChange: 5000,
      percentChange: 50
    },
    lostStoreSpend: {
      current: 10000,
      reference: 15000,
      absoluteChange: -5000,
      percentChange: -33.33
    }
  },
  {
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    sector: "Retail",
    category: "Snacks",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 90000,
      reference: 85000,
      absoluteChange: 5000,
      percentChange: 5.88
    },
    sameStoreSpend: {
      current: 70000,
      reference: 75000,
      absoluteChange: -5000,
      percentChange: -6.67
    },
    newStoreSpend: {
      current: 10000,
      reference: 5000,
      absoluteChange: 5000,
      percentChange: 100
    },
    lostStoreSpend: {
      current: 10000,
      reference: 5000,
      absoluteChange: 5000,
      percentChange: 100
    }
  },
  {
    country: "USA",
    state: "California",
    city: "San Francisco",
    sector: "Hospitality",
    category: "Beverages",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 130000,
      reference: 110000,
      absoluteChange: 20000,
      percentChange: 18.18
    },
    sameStoreSpend: {
      current: 100000,
      reference: 95000,
      absoluteChange: 5000,
      percentChange: 5.26
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
  },
  {
    country: "USA",
    state: "Texas",
    city: "Austin",
    sector: "Retail",
    category: "Frozen Foods",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 80000,
      reference: 70000,
      absoluteChange: 10000,
      percentChange: 14.29
    },
    sameStoreSpend: {
      current: 60000,
      reference: 55000,
      absoluteChange: 5000,
      percentChange: 9.09
    },
    newStoreSpend: {
      current: 10000,
      reference: 10000,
      absoluteChange: 0,
      percentChange: 0
    },
    lostStoreSpend: {
      current: 10000,
      reference: 5000,
      absoluteChange: 5000,
      percentChange: 100
    }
  }
]);

// Mock data for User 2 (modified values)
const user2Data: DataItem[] = addIds([
  {
    country: "UK",
    state: "England",
    city: "London",
    sector: "Food",
    category: "Beverages",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 150000,
      reference: 130000,
      absoluteChange: 20000,
      percentChange: 15.38
    },
    sameStoreSpend: {
      current: 120000,
      reference: 110000,
      absoluteChange: 10000,
      percentChange: 9.09
    },
    newStoreSpend: {
      current: 25000,
      reference: 15000,
      absoluteChange: 10000,
      percentChange: 66.67
    },
    lostStoreSpend: {
      current: 5000,
      reference: 10000,
      absoluteChange: -5000,
      percentChange: -50
    }
  },
  {
    country: "UK",
    state: "Scotland",
    city: "Edinburgh",
    sector: "Food",
    category: "Snacks",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 70000,
      reference: 65000,
      absoluteChange: 5000,
      percentChange: 7.69
    },
    sameStoreSpend: {
      current: 55000,
      reference: 50000,
      absoluteChange: 5000,
      percentChange: 10
    },
    newStoreSpend: {
      current: 12000,
      reference: 10000,
      absoluteChange: 2000,
      percentChange: 20
    },
    lostStoreSpend: {
      current: 8000,
      reference: 5000,
      absoluteChange: 3000,
      percentChange: 60
    }
  },
  {
    country: "Germany",
    state: "Bavaria",
    city: "Munich",
    sector: "Industrial",
    category: "Equipment",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 200000,
      reference: 185000,
      absoluteChange: 15000,
      percentChange: 8.11
    },
    sameStoreSpend: {
      current: 160000,
      reference: 155000,
      absoluteChange: 5000,
      percentChange: 3.23
    },
    newStoreSpend: {
      current: 30000,
      reference: 20000,
      absoluteChange: 10000,
      percentChange: 50
    },
    lostStoreSpend: {
      current: 10000,
      reference: 10000,
      absoluteChange: 0,
      percentChange: 0
    }
  }
]);

// Mock data for User 3 (different sectors and categories)
const user3Data: DataItem[] = addIds([
  {
    country: "Japan",
    state: "Tokyo",
    city: "Tokyo",
    sector: "Electronics",
    category: "Gadgets",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 300000,
      reference: 250000,
      absoluteChange: 50000,
      percentChange: 20
    },
    sameStoreSpend: {
      current: 240000,
      reference: 220000,
      absoluteChange: 20000,
      percentChange: 9.09
    },
    newStoreSpend: {
      current: 50000,
      reference: 20000,
      absoluteChange: 30000,
      percentChange: 150
    },
    lostStoreSpend: {
      current: 10000,
      reference: 15000,
      absoluteChange: -5000,
      percentChange: -33.33
    }
  },
  {
    country: "Japan",
    state: "Osaka",
    city: "Osaka",
    sector: "Electronics",
    category: "Appliances",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 180000,
      reference: 160000,
      absoluteChange: 20000,
      percentChange: 12.5
    },
    sameStoreSpend: {
      current: 150000,
      reference: 145000,
      absoluteChange: 5000,
      percentChange: 3.45
    },
    newStoreSpend: {
      current: 25000,
      reference: 10000,
      absoluteChange: 15000,
      percentChange: 150
    },
    lostStoreSpend: {
      current: 5000,
      reference: 10000,
      absoluteChange: -5000,
      percentChange: -50
    }
  },
  {
    country: "Australia",
    state: "New South Wales",
    city: "Sydney",
    sector: "Healthcare",
    category: "Pharmaceuticals",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: {
      current: 250000,
      reference: 230000,
      absoluteChange: 20000,
      percentChange: 8.7
    },
    sameStoreSpend: {
      current: 200000,
      reference: 190000,
      absoluteChange: 10000,
      percentChange: 5.26
    },
    newStoreSpend: {
      current: 40000,
      reference: 30000,
      absoluteChange: 10000,
      percentChange: 33.33
    },
    lostStoreSpend: {
      current: 10000,
      reference: 15000,
      absoluteChange: -5000,
      percentChange: -33.33
    }
  }
]);

// Generate time-series data for analytics view
const generateTimeSeriesData = (baseValue: number, days: number): {date: string, value: number}[] => {
  const result = [];
  const startDate = new Date('2024-03-01');
  
  for (let i = 0; i < days; i++) {
    const date = addDays(startDate, i);
    // Random fluctuation between -10% and +15%
    const fluctuation = baseValue * (Math.random() * 0.25 - 0.1);
    const value = Math.round(baseValue + fluctuation);
    result.push({
      date: date.toISOString().split('T')[0],
      value
    });
  }
  
  return result;
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Regional Manager',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    data: user1Data
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'VP Sales',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    data: user2Data
  },
  {
    id: '3',
    name: 'David Chen',
    role: 'Global Director',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    data: user3Data
  },
  {
    id: '4',
    name: 'Laura Williams',
    role: 'Marketing Director',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    data: user1Data.map(item => ({
      ...item,
      mySpend: {
        ...item.mySpend,
        current: Math.round(item.mySpend.current * 1.1),
        reference: item.mySpend.reference,
        absoluteChange: Math.round(item.mySpend.current * 1.1) - item.mySpend.reference,
        percentChange: Math.round(((Math.round(item.mySpend.current * 1.1) - item.mySpend.reference) / item.mySpend.reference) * 100)
      }
    }))
  },
  {
    id: '5',
    name: 'Michael Taylor',
    role: 'Operations Manager',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    data: user2Data.map(item => ({
      ...item,
      newStoreSpend: {
        ...item.newStoreSpend,
        current: Math.round(item.newStoreSpend.current * 1.25),
        reference: item.newStoreSpend.reference,
        absoluteChange: Math.round(item.newStoreSpend.current * 1.25) - item.newStoreSpend.reference,
        percentChange: Math.round(((Math.round(item.newStoreSpend.current * 1.25) - item.newStoreSpend.reference) / item.newStoreSpend.reference) * 100)
      }
    }))
  }
];

// Time series data for analytics view
export const timeSeriesData = {
  mySpend: generateTimeSeriesData(100000, 90),
  sameStoreSpend: generateTimeSeriesData(80000, 90),
  newStoreSpend: generateTimeSeriesData(15000, 90),
  lostStoreSpend: generateTimeSeriesData(12000, 90)
};

export const getUniqueValues = (data: DataItem[], key: keyof DataItem): string[] => {
  const valuesSet = new Set<string>();
  
  data.forEach(item => {
    if (typeof item[key] === 'string') {
      valuesSet.add(item[key] as string);
    }
  });
  
  return Array.from(valuesSet);
};

export const getAllSectors = (): string[] => {
  const sectors = new Set<string>();
  
  mockUsers.forEach(user => {
    user.data.forEach(item => {
      sectors.add(item.sector);
    });
  });
  
  return Array.from(sectors);
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  
  mockUsers.forEach(user => {
    user.data.forEach(item => {
      categories.add(item.category);
    });
  });
  
  return Array.from(categories);
};