'use client';

import useDaterCenterDetail from '@/hooks/data-center/queries/useDaterCenterDetailQuery';
import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';
const DataCenterDetail = ({ postId }: { postId: number }) => {
  const { data: dataCenterDetailData } = useDaterCenterDetail(postId, 7);
  const { data: postDetail } = useGetPostDetailQuery(postId);
  const postDetailData = postDetail?.data;

  return (
    <main>
      <h1 className="">{postDetailData?.title}</h1>
    </main>
  );
};

export default DataCenterDetail;
