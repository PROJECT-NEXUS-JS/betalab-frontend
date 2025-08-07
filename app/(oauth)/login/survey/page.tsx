'use client';
import Tag from '@/components/common/atoms/Tag';
import Button from '@/components/common/atoms/Button';
import Label from '@/components/common/molecules/Label';

export default function SurveyPage() {
  return (
    <div className="mt-30 w-full flex justify-center">
      <div className="flex flex-col items-center gap-10 w-[556px]">
        <section className="w-full flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-Black">어떤 일을 하고 계신가요 ?</h2>
          <Label
            size="md"
            help={false}
            label={true}
            tag={false}
            tag2={false}
            textCounter={false}
            labelText="직업 입력"
            placeholder="예) 개발자, 디자이너, 대학생 등"
            value=""
            onChange={() => {}}
          />
        </section>
        <section className="w-full flex flex-col gap-6">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-Black">어떤 테스트에 관심 있으신가요 ?</h2>
            <Tag style="gray" icon={false} onClick={() => {}} label="중복선택 가능" />
          </div>
        </section>
        <section className="w-full flex flex-col">
          <Button State="Primary" Size="md" onClick={() => {}} label="회원가입 하기" />
        </section>
      </div>
    </div>
  );
}
