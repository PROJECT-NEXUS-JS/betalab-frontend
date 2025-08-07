'use client';
import { useState } from 'react';
import Tag from '@/components/common/atoms/Tag';
import Button from '@/components/common/atoms/Button';
import Chip from '@/components/common/atoms/Chip';
import Label from '@/components/common/molecules/Label';

export default function SurveyPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [enterDirectly, setEnterDirectly] = useState(false);
  const [enterDirectlyValue, setEnterDirectlyValue] = useState('');

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };
  return (
    <div className="mt-30 w-full flex justify-center">
      <div className="flex flex-col items-center gap-10 w-[556px]">
        <section className="w-full flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-Black">어떤 일을 하고 계신가요 ?</h2>
          <Label
            size="md"
            help={false}
            label={true}
            tag={false}
            tag2={false}
            textCounter={false}
            labelText="직업 입력"
            placeholder="예) 개발자, 디자이너, 대학생 등"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </section>
        <section className="w-full flex flex-col gap-6">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-bold text-Black">어떤 테스트에 관심 있으신가요 ?</h2>
            <Tag style="gray" icon={false} onClick={() => {}} label="중복선택 가능" />
          </div>
          <div className="flex flex-wrap gap-4">
            {TEST_CHIP_LIST.map((tag, index) => (
              <Chip
                key={index}
                value={tag}
                variant={selectedTags.includes(tag) ? 'active' : 'solid'}
                size="lg"
                onClick={() => {
                  handleTagClick(tag);
                }}
              >
                {tag}
              </Chip>
            ))}
            <Chip
              key={TEST_CHIP_LIST.length}
              value="직접 입력"
              variant={enterDirectly ? 'active' : 'solid'}
              size="lg"
              onClick={() => {
                setEnterDirectly(prev => !prev);
                setEnterDirectlyValue('');
              }}
            >
              직접 입력
            </Chip>
          </div>
        </section>
        <section className="w-full flex flex-col">
          <Button State="Primary" Size="md" onClick={() => {}} label="회원가입 하기" />
        </section>
      </div>
    </div>
  );
}

const TEST_CHIP_LIST = [
  '앱',
  '웹',
  '게임',
  'UX 피드백',
  'AI',
  '기능 검증',
  '설문형 테스트',
  '신규 서비스 런칭',
  '리워드 있음',
  '실시간 테스트 참여',
  '핀테크',
  '소셜/커뮤니티',
  '여행/모빌리티',
];
