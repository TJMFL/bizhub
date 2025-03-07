import api from './api';

// Description: Get all businesses
// Endpoint: GET /api/businesses
// Request: {}
// Response: Array<{
//   _id: string
//   name: string
//   type: string
//   revenue: number
//   expenses: number
//   employees: number
//   status: 'active' | 'inactive'
//   performance: number
//   lastUpdated: string
//   notes: string
//   website: string
// }>
export const getBusinesses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: '1',
          name: 'Tech Solutions Inc',
          type: 'Technology',
          revenue: 500000,
          expenses: 300000,
          employees: 25,
          status: 'active',
          performance: 85,
          lastUpdated: '2024-03-20',
          notes: 'Leading tech solutions provider in the region',
          website: 'https://techsolutions.com'
        },
        {
          _id: '2',
          name: 'Green Energy Co',
          type: 'Energy',
          revenue: 750000,
          expenses: 500000,
          employees: 40,
          status: 'active',
          performance: 92,
          lastUpdated: '2024-03-19',
          notes: 'Renewable energy solutions',
          website: 'https://greenenergy.com'
        },
        {
          _id: '3',
          name: 'Food Delivery Express',
          type: 'Food Service',
          revenue: 300000,
          expenses: 200000,
          employees: 15,
          status: 'inactive',
          performance: 65,
          lastUpdated: '2024-03-18',
          notes: 'Local food delivery service',
          website: 'https://foodexpress.com'
        }
      ]);
    }, 500);
  });
};

// Description: Get business analytics
// Endpoint: GET /api/businesses/analytics
// Request: {}
// Response: {
//   totalRevenue: number
//   totalExpenses: number
//   totalEmployees: number
//   averagePerformance: number
//   revenueByBusiness: Array<{ name: string, value: number }>
//   performanceOverTime: Array<{ date: string, performance: number }>
// }
export const getBusinessAnalytics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalRevenue: 1550000,
        totalExpenses: 1000000,
        totalEmployees: 80,
        averagePerformance: 80.67,
        revenueByBusiness: [
          { name: 'Tech Solutions Inc', value: 500000 },
          { name: 'Green Energy Co', value: 750000 },
          { name: 'Food Delivery Express', value: 300000 }
        ],
        performanceOverTime: [
          { date: '2024-03-15', performance: 75 },
          { date: '2024-03-16', performance: 78 },
          { date: '2024-03-17', performance: 82 },
          { date: '2024-03-18', performance: 80 },
          { date: '2024-03-19', performance: 85 },
          { date: '2024-03-20', performance: 83 }
        ]
      });
    }, 500);
  });
};

// Description: Add a new business
// Endpoint: POST /api/businesses
// Request: {
//   name: string
//   type: string
//   revenue: number
//   expenses: number
//   employees: number
//   status: 'active' | 'inactive'
//   notes: string
//   website: string
// }
// Response: {
//   business: {
//     _id: string
//     name: string
//     type: string
//     revenue: number
//     expenses: number
//     employees: number
//     status: 'active' | 'inactive'
//     performance: number
//     lastUpdated: string
//     notes: string
//     website: string
//   }
// }
export const addBusiness = async (data: {
  name: string;
  type: string;
  revenue: number;
  expenses: number;
  employees: number;
  status: 'active' | 'inactive';
  notes: string;
  website: string;
}) => {
  try {
    const response = await api.post('/api/businesses', data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Description: Update a business
// Endpoint: PUT /api/businesses/:id
// Request: {
//   name?: string
//   type?: string
//   revenue?: number
//   expenses?: number
//   employees?: number
//   status?: 'active' | 'inactive'
//   notes?: string
//   website?: string
// }
// Response: {
//   business: {
//     _id: string
//     name: string
//     type: string
//     revenue: number
//     expenses: number
//     employees: number
//     status: 'active' | 'inactive'
//     performance: number
//     lastUpdated: string
//     notes: string
//     website: string
//   }
// }
export const updateBusiness = (id: string, data: {
  name?: string;
  type?: string;
  revenue?: number;
  expenses?: number;
  employees?: number;
  status?: 'active' | 'inactive';
  notes?: string;
  website?: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        business: {
          _id: id,
          ...data,
          performance: Math.floor(Math.random() * 30) + 70,
          lastUpdated: new Date().toISOString().split('T')[0]
        }
      });
    }, 500);
  });
};

// Description: Delete a business
// Endpoint: DELETE /api/businesses/:id
// Request: {}
// Response: { success: true }
export const deleteBusiness = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};