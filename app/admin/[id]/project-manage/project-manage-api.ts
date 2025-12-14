import { instance } from '@/apis/instance';

export interface UpdatePostPayload {
  title: string;
  serviceSummary?: string;
  mediaUrl?: string;
  privacyItems?: string[];
  mainCategory: string[];
  genreCategories: string[];
  platformCategory: string[];
  feedbackMethod?: string;
  durationTime: string;
  maxParticipants: number;
  startDate?: string;
  endDate?: string;
  requirement: {
    genderRequirement: string;
    ageMin?: number;
    ageMax?: number;
    additionalRequirements?: string;
  };
  reward: {
    rewardDescription?: string;
  };
}

export async function updatePost(
  postId: number,
  payload: UpdatePostPayload,
  thumbnailFile?: File | null,
  galleryFiles?: File[],
) {
  const fd = new FormData();
  fd.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  if (thumbnailFile) {
    fd.append('thumbnail', thumbnailFile, thumbnailFile.name);
  }

  if (galleryFiles && galleryFiles.length > 0) {
    for (const img of galleryFiles) {
      fd.append('images', img, img.name);
    }
  }

  const { data } = await instance.patch(`/v1/users/posts/${postId}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
}
