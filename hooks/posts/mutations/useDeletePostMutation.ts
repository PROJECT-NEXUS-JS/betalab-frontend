import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/common/toast/ToastHost';

const deletePost = async (postId: number) => {
  const response = await instance.delete(`/v1/users/posts/${postId}`);
  return response.data;
};

export default function useDeletePostMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      if (!postId || isNaN(postId)) {
        throw new Error('INVALID_ID');
      }
      return await deletePost(postId);
    },
    onSuccess: async () => {
      // 홈. 마이페이지 게시물 목록 초기화
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['get-posts-list-home'] }),
        queryClient.invalidateQueries({ queryKey: ['myPosts'] }),
      ]);
      // 무효화 후
      // 토스트 띄우기
      showToast({
        type: 'alert',
        message: '프로젝트가 삭제됐습니다.',
        iconName: 'check',
      });
      // 홈으로 이동, 페이지로 뒤로가기 방지
      router.replace('/');
    },
    onError: error => {
      // ID가 유효하지 않았던 경우
      if (error.message === 'INVALID_ID') {
        showToast({
          type: 'error',
          message: '유효하지 않은 접근입니다.',
          iconName: 'red',
        });
        return;
      }

      // 실제 서버 삭제 실패 경우
      console.error('프로젝트 삭제 에러:', error);
      showToast({
        type: 'error',
        message: '삭제에 실패했습니다. 다시 시도해주세요.',
        iconName: 'red',
      });
    },
  });
}
