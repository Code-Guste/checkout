import { UseQueryResult, useQuery } from '@tanstack/react-query';

import CheckoutItem from '@Assets/images/checkout-item.png';

export type PaymentProvider = {
  id: string;
  name: string;
  type: 'credit_card';
  icon: 'MasterCard' | 'Amex' | 'DinersClub' | 'Visa';
};

type PaymentProvidersData = {
  credit_card: PaymentProvider[];
};

const fetchPaymentProviders = async (): Promise<{ data: PaymentProvidersData }> => {
  const mockData: PaymentProvidersData = {
    credit_card: [
      { id: '1', name: 'Credit Card', type: 'credit_card', icon: 'MasterCard' },
      { id: '2', name: 'Credit Card', type: 'credit_card', icon: 'Amex' },
      { id: '3', name: 'Credit Card', type: 'credit_card', icon: 'DinersClub' },
      { id: '4', name: 'Credit Card', type: 'credit_card', icon: 'Visa' },
    ],
  };
  return new Promise((resolve) => setTimeout(() => resolve({ data: mockData }), 1500));
};

export const usePaymentProvidersQuery = (): UseQueryResult<PaymentProvider[]> => {
  return useQuery({
    queryKey: ['PaymentProviders'],
    queryFn: () => fetchPaymentProviders().then((res) => res.data.credit_card),
  });
};

type CheckoutItem = {
  itemId: string;
  name: string;
  picture: string;
  price: number;
  quantity: number;
};

export type CheckoutData = {
  checkoutId: string;
  items: CheckoutItem[];
  subtotal: number;
  shippingCost: number;
  totalCost: number;
  estimatedDelivery: string;
};

const fetchCheckoutData = async (checkoutId: string): Promise<{ data: CheckoutData }> => {
  const mockData: CheckoutData = {
    checkoutId,
    items: [
      {
        itemId: 'item001',
        name: 'LogoIpsum IPL',
        picture: CheckoutItem,
        price: 299.97,
        quantity: 1,
      },
    ],
    subtotal: 299.97,
    shippingCost: 9.99,
    totalCost: 299.97,
    estimatedDelivery: '2024-11-15',
  };
  return new Promise((resolve) => setTimeout(() => resolve({ data: mockData }), 1500));
};

export const useCheckoutDataQuery = (checkoutId: string): UseQueryResult<CheckoutData> => {
  return useQuery({
    queryKey: ['CheckoutData', checkoutId],
    queryFn: () => fetchCheckoutData(checkoutId).then((res) => res.data),
  });
};
