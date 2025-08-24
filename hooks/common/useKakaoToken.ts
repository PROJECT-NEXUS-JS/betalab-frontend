import { useState, useEffect } from 'react';

export const useKakaoToken = () => {
  const kakaoAccessToken = localStorage.getItem('kakaoAccessToken');

  return { kakaoAccessToken: kakaoAccessToken || '' };
};
