import {
  QueryParamsType,
  Order,
  OrdersQueryOptionsType,
} from '@framework/types';
import { ParamsType } from '@framework/utils/core-api';
import { mapPaginatorData } from '@framework/utils/data-mappers';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { OrderService } from './order.service';


type PaginatedOrder = {
  data: Order[];
  paginatorInfo: any;
};

const fetchOrders = async (pan:any): Promise<PaginatedOrder> => {
  // const {
  //   queryKey,
  //   pageParam,
  // }: QueryParamsType =pan
  // const params = queryKey[1];
  let fetchedData: any = {};
  // if (pageParam) {
  // } else {
  //   const response = await OrderService.find(params as ParamsType);
  //   fetchedData = response.data;
  // }
  const response = await OrderService.fetchUrl(`${API_ENDPOINTS.ORDERS}/user/${pan}`);
  fetchedData = response.data;
  const { docs: data, ...rest } = fetchedData;  

  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useOrdersQuery = (
  params?: OrdersQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedOrder,
    Error,
    PaginatedOrder,
    PaginatedOrder,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedOrder, Error>(
    [API_ENDPOINTS.ORDERS, params],
    () => fetchOrders(params?.userId,),
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useOrdersQuery, fetchOrders };
  
// export const fetchOrders = async (userId: string): Promise<PaginatedOrder> => {
//   const response = await OrderService.fetchUrl(`${API_ENDPOINTS.ORDERS}/user/${userId}`);
//   let fetchedData: any = {};
//   const { docs: data, ...rest } = fetchedData;  
//   return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
// }
// export const useOrdersQuery = ({ userId }: { userId: string }) => {
//   return useQuery<any, Error>(
//     [],
//     () => fetchOrders(userId),
//     { getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl },
//   )
// }

export const fetchOrder = async (orderId: string) => {
  const response = await OrderService.findOne(
    `${API_ENDPOINTS.ORDER}/${orderId}`
  );
  const { docs: data } = response.data;  
  return {
    order: data,
  };
};
export const useOrderQuery = ({
  tracking_number,
}: {
  tracking_number: string;
}) => {
  return useQuery<{ order: Order }, Error>(['order', tracking_number], () =>
    fetchOrder(tracking_number)
  );
};

export const fetchOrderStatuses = async () => {
  const response = await OrderService.fetchUrl(API_ENDPOINTS.ORDER_STATUS);
  let fetchedData = response.data
  const { docs: data, ...rest } = fetchedData;  

  return {
    order_statuses: { data, paginatorInfo: mapPaginatorData({ ...rest }) },
  };
};
export const useOrderStatusesQuery = () => {
  return useQuery<any, Error>(API_ENDPOINTS.ORDER_STATUS, fetchOrderStatuses);
};

type OrderCreateInputType = {
  [key: string]: unknown;
};

export const useCreateOrderMutation = () => {
  return useMutation((input: OrderCreateInputType) =>    
    OrderService.create(input)
  );
};
