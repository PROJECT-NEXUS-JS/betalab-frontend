import { DataCenterDetailResponseModel } from '../dto/dataCenterDetail';

import { instance } from '@/apis/instance';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

const BASE_PATH = (postId: number) => `v1/data-center/${postId}`;

export const getDataCenterDetail = async (postId: number, days: number) => {
  const response = await instance.get(`${BASE_PATH(postId)}`, {
    params: { days },
  });
  return DataCenterDetailResponseModel.parse(response.data);
};

export default function useGetDaterCenterDetailQuery(postId: number, days: number) {
  return useQuery({
    queryKey: queryKeys.dataCenter.detail(postId, days),
    queryFn: () => getDataCenterDetail(postId, days),
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    select: data => data.data,
  });
}
