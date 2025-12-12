'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/common/atoms/Input';
import Button from '@/components/common/atoms/Button';
import Chip from '@/components/common/atoms/Chip';
import CheckTag from '@/components/common/atoms/CheckTag';
import Card from '@/components/common/atoms/Card';
import ImageStrip from '@/components/test-add/ImageStrip';

type PI = '이름' | '이메일' | '연락처' | '기타';

export type DetailInitial = {
  title?: string;
  serviceSummary?: string;
  mediaUrl?: string;
  privacyItems?: string[];
  thumbnailUrl?: string;
  mediaUrls?: string[];
};

type Files = { thumbnail?: File | null; gallery?: File[] };

type Props = {
  initial?: DetailInitial;
};

const PI_OPTIONS: PI[] = ['이름', '이메일', '연락처', '기타'];
const valueState = (v: string) => (v.trim() ? 'has value' : 'no value');

export default function DetailCheck({ initial }: Props) {
  const [piSelected, setPiSelected] = useState<PI[]>([]);
  const [piPurpose, setPiPurpose] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [mediaTab, setMediaTab] = useState<'video' | 'photo'>('video');
  const [thumbFiles, setThumbFiles] = useState<(File | string)[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<(File | string)[]>([]);

  useEffect(() => {
    setTitle(initial?.title ?? '');
    setSummary(initial?.serviceSummary ?? '');
    const mediaUrl = initial?.mediaUrl ?? '';
    setVideoUrl(mediaUrl);
    const isImageUrl =
      mediaUrl &&
      !mediaUrl.includes('youtube.com') &&
      !mediaUrl.includes('youtu.be') &&
      !mediaUrl.includes('vimeo.com');
    if (isImageUrl) {
      setMediaTab('photo');
    }

    setPiSelected(
      Array.isArray(initial?.privacyItems)
        ? (initial!.privacyItems!.filter((v): v is PI => PI_OPTIONS.includes(v as PI)) as PI[])
        : [],
    );
  }, [initial]);

  useEffect(() => {
    if (initial?.thumbnailUrl) {
      setThumbFiles([initial.thumbnailUrl]);
    } else {
      setThumbFiles([]);
    }

    if (Array.isArray(initial?.mediaUrls) && initial.mediaUrls.length) {
      setGalleryFiles(initial.mediaUrls);
    } else {
      setGalleryFiles([]);
    }
  }, [initial]);

  const togglePI = (opt: PI) =>
    setPiSelected(prev => (prev.includes(opt) ? prev.filter(v => v !== opt) : [...prev, opt]));

  return (
    <div className="mx-auto w-full max-w-[920px]">
      <section className="mb-10">
        <div className="flex items-center gap-2">
          <p className="mb-2 text-subtitle-01 font-semibold">개인 정보 수집</p>
          <CheckTag>중복 선택 가능</CheckTag>
        </div>
        <p className="mb-4 text-body-01 font-medium text-Dark-Gray">
          필요한 개인 정보 항목을 선택해주세요.
        </p>
        <div className="flex flex-wrap gap-2">
          {PI_OPTIONS.map(option => (
            <Chip
              key={option}
              variant={piSelected.includes(option) ? 'active' : 'solid'}
              size="sm"
              onClick={() => togglePI(option)}
              showArrowIcon={false}
            >
              {option}
            </Chip>
          ))}
        </div>
        <div className="mt-4 pb-5">
          <p className="mb-2 text-body-01 font-semibold">목적</p>
          <Input
            type="text"
            size="xl"
            placeholder="수집 목적을 간단히 작성해주세요."
            value={piPurpose}
            onChange={e => setPiPurpose(e.currentTarget.value)}
            state={valueState(piPurpose)}
          />
        </div>
        <Card
          title="개인정보 수집 시 유의해주세요"
          items={[
            '불필요한 항목은 요청을 자제해주세요.',
            '수집한 정보는 테스트 목적 외 사용을 금지합니다.',
            '법적 의무 준수를 위해, 테스트 종료 후 즉시 삭제해주세요.',
          ]}
          icon={<Image src="/icons/caution.svg" alt="caution" width={24} height={24} />}
        />
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-subtitle-01 font-semibold">프로젝트 제목</h2>
        <p className="mb-2 text-caption-01 text-Gray-300">
          쉽게 이해할 수 있는 제목을 입력해주세요.
        </p>
        <Input
          type="text"
          size="xl"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={e => setTitle(e.currentTarget.value)}
          state={valueState(title)}
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-2 text-subtitle-01 font-semibold">프로젝트 간단 설명</h2>
        <p className="mb-2 text-caption-01 text-Gray-300">입력한 문장은 테스트 개요로 노출돼요.</p>
        <Input
          type="text"
          size="xl"
          placeholder="한 줄 소개를 입력해주세요."
          value={summary}
          onChange={e => setSummary(e.currentTarget.value)}
          state={valueState(summary)}
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-2 text-subtitle-01 font-semibold">대표 이미지</h2>
        <Card
          title="대표 이미지 등록 가이드"
          items={['JPG, JPEG/ 10MB 이하.', '권장 1200x675px (16:9).', '편집 기능으로 자르기 가능.']}
          icon={<Image src="/icons/road.svg" alt="guide" width={24} height={24} />}
        />
        <div className="mt-3">
          <ImageStrip
            files={thumbFiles}
            total={1}
            onUpload={fl => setThumbFiles([...thumbFiles, ...Array.from(fl)].slice(0, 1))}
            onRemove={idx => setThumbFiles(thumbFiles.filter((_, i) => i !== idx))}
          />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-subtitle-01 font-semibold">소개 영상 · 사진</h2>
        <p className="mb-3 text-caption-01 text-Gray-300">
          사진과 영상 중 한 가지만 선택할 수 있어요.
        </p>
        <div className="mb-4 flex items-center gap-4">
          <Button
            State={mediaTab === 'video' ? 'Focused' : 'Solid'}
            Size="lg"
            label="소개 영상"
            onClick={() => setMediaTab('video')}
          />
          <Button
            State={mediaTab === 'photo' ? 'Focused' : 'Solid'}
            Size="lg"
            label="소개 사진"
            onClick={() => setMediaTab('photo')}
          />
        </div>
        {mediaTab === 'video' ? (
          <>
            <Card
              title="영상 등록 가이드"
              items={[
                'YouTube/Vimeo URL 입력',
                '썸네일은 스트리밍 서비스에서 설정',
                '세로형 영상 미지원',
              ]}
              icon={<Image src="/icons/road.svg" alt="guide" width={24} height={24} />}
            />
            <div className="mt-6">
              <p className="mb-2 text-body-01 font-semibold">URL</p>
              <Input
                type="text"
                size="xl"
                placeholder="영상 URL을 입력하세요."
                value={videoUrl}
                onChange={e => setVideoUrl(e.currentTarget.value)}
                state={valueState(videoUrl)}
              />
            </div>
          </>
        ) : (
          <>
            <Card
              title="사진 등록 가이드"
              items={[
                'JPG/JPEG/PNG 10MB 이하, 800×480 이상',
                'GIF 2MB 이상, 800×480~1440×864',
                '최대 10장',
              ]}
              icon={<Image src="/icons/road.svg" alt="guide" width={24} height={24} />}
            />
            <div className="mt-6">
              <ImageStrip
                files={galleryFiles}
                total={10}
                onUpload={fl => setGalleryFiles([...galleryFiles, ...Array.from(fl)].slice(0, 10))}
                onRemove={idx => setGalleryFiles(galleryFiles.filter((_, i) => i !== idx))}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
