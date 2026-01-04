'use client';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type Row,
  type CellContext,
} from '@tanstack/react-table';
import Button from '@/components/common/atoms/Button';

export type ParticipantRowType =
  | '승인전'
  | '진행중'
  | '완료요청'
  | '지급전'
  | '지급중'
  | '지급완료';

export interface ParticipantData {
  number: number;
  name: string;
  email: string;
  participationId: number;
  participationStatus: '승인대기' | '진행 중' | '완료요청' | '완료';
  appliedDate: string;
  approvedDate?: string;
  rewardStatus: '미지급' | '지급대기' | '지급진행' | '지급완료';
  paidDate?: string;
  type: ParticipantRowType;
  onApprove?: () => void;
  onComplete?: () => void;
  onPay?: () => void;
}

function getParticipationBadge(status: string) {
  switch (status) {
    case '승인대기':
      return {
        bg: 'bg-blue-600',
        text: 'text-sky-50',
        label: '승인대기',
        style: 'green',
      };
    case '진행 중':
      return {
        bg: 'bg-sky-50',
        text: 'text-gray-600',
        label: '진행 중',
        style: 'blue',
      };
    case '완료요청':
      return {
        bg: 'bg-green-100',
        text: 'text-lime-700',
        label: '완료요청',
        style: 'blue',
      };
    case '완료':
      return {
        bg: 'bg-sky-50',
        text: 'text-blue-600',
        label: '완료',
        style: 'black',
      };
    default:
      return {
        bg: 'bg-gray-200',
        text: 'text-slate-500',
        label: status,
        style: 'gray',
      };
  }
}

function getRewardBadge(status: string) {
  switch (status) {
    case '미지급':
      return {
        bg: 'bg-gray-200',
        text: 'text-slate-500',
        label: '미지급',
        style: 'gray',
      };
    case '지급대기':
      return {
        bg: 'bg-gray-600',
        text: 'text-white',
        label: '지급대기',
        style: 'green',
      };
    case '지급진행':
      return {
        bg: 'bg-sky-50',
        text: 'text-gray-600',
        label: '지급진행',
        style: 'blue',
      };
    case '지급완료':
      return {
        bg: 'bg-sky-50',
        text: 'text-blue-600',
        label: '지급완료',
        style: 'black',
      };
    default:
      return {
        bg: 'bg-gray-200',
        text: 'text-slate-500',
        label: status,
        style: 'gray',
      };
  }
}

function getActionButton(row: Row<ParticipantData>) {
  const { type, onApprove, onComplete, onPay } = row.original;

  if (type === '승인전' && onApprove) {
    return (
      <div data-property-1="승인하기" className="flex justify-start items-start">
        <button
          onClick={onApprove}
          className="h-9 px-3 bg-blue-600 rounded-[1px] flex justify-center items-center gap-2.5"
        >
          <div className="justify-start text-white text-[10px] font-bold font-['SUIT_Variable'] leading-4">
            승인하기
          </div>
        </button>
      </div>
    );
  }

  if (type === '완료요청' && onComplete) {
    return (
      <div data-property-1="완료처리" className="flex justify-start items-start">
        <Button
          State="Primary"
          Size="sm"
          label="완료처리"
          onClick={onComplete}
          className="h-9 px-3 bg-lime-700 rounded-[1px] text-white"
        />
      </div>
    );
  }

  if (type === '지급전' && onPay) {
    return (
      <div data-property-1="지급하기" className="flex justify-start items-start">
        <Button
          State="Secondary"
          Size="sm"
          label="지급하기"
          onClick={onPay}
          className="h-9 px-3 bg-gray-900 rounded-[1px] text-white"
        />
      </div>
    );
  }

  return (
    <div className="w-14 pr-14 flex justify-start items-center overflow-hidden">
      <div className="justify-start text-gray-600 text-sm font-medium font-['SUIT_Variable'] leading-5">
        -
      </div>
    </div>
  );
}

const columns: ColumnDef<ParticipantData>[] = [
  {
    accessorKey: 'number',
    header: () => (
      <div className="w-7 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          No.
        </div>
      </div>
    ),
    cell: ({ getValue }: CellContext<ParticipantData, unknown>) => (
      <div className="w-7 flex justify-start items-center overflow-hidden pl-5">
        <div className="justify-start text-gray-600 text-sm font-medium font-['SUIT_Variable'] leading-5">
          {getValue() as number}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="w-30 pr-1 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          참여자
        </div>
      </div>
    ),
    cell: ({ getValue }: CellContext<ParticipantData, unknown>) => (
      <div className="w-30 pr-1 flex justify-start items-center overflow-hidden pl-4">
        <div className="w-full justify-start text-gray-600 text-sm font-medium font-['SUIT_Variable'] leading-5 line-clamp-1">
          {getValue() as string}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: () => (
      <div className="w-44 flex-1 pr-10 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          이메일
        </div>
      </div>
    ),
    cell: ({ getValue }: CellContext<ParticipantData, unknown>) => (
      <div className="w-44 flex-1 pr-10 flex justify-start items-center overflow-hidden">
        <div className="w-full justify-start text-gray-600 text-sm font-medium font-['SUIT_Variable'] leading-5 line-clamp-1">
          {getValue() as string}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'participationStatus',
    header: () => (
      <div className="w-11 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          승인
        </div>
      </div>
    ),
    cell: ({ getValue }: CellContext<ParticipantData, unknown>) => {
      const status = getValue() as string;
      const badge = getParticipationBadge(status);
      return (
        <div className="flex justify-start items-center overflow-hidden mr-5">
          <div data-property-1={status} className="flex justify-start items-start">
            <div
              data-style={badge.style}
              data-icon="false"
              className={`h-5 px-1 ${badge.bg} rounded flex justify-center items-center gap-1`}
            >
              <div
                className={`justify-start ${badge.text} text-[10px] font-bold font-['SUIT_Variable'] leading-4`}
              >
                {badge.label}
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'appliedDate',
    header: () => (
      <div className="w-30 pr-4 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          승인 신청일
        </div>
      </div>
    ),
    cell: ({ getValue }: CellContext<ParticipantData, unknown>) => (
      <div className="w-30 pr-4 flex justify-start items-center overflow-hidden">
        <div className="w-full justify-start text-gray-600 text-sm font-medium font-['SUIT_Variable'] leading-5">
          {getValue() as string}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'approvedDate',
    header: () => (
      <div className="w-28 pr-4 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          승인일
        </div>
      </div>
    ),
    cell: ({ getValue }: CellContext<ParticipantData, unknown>) => (
      <div className="w-28 pr-4 flex justify-start items-center overflow-hidden">
        <div className="w-full justify-start text-gray-600 text-sm font-medium font-['SUIT_Variable'] leading-5">
          {(getValue() as string | undefined) || '-'}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'rewardStatus',
    header: () => (
      <div className="w-11 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          리워드
        </div>
      </div>
    ),
    cell: ({ getValue }: CellContext<ParticipantData, unknown>) => {
      const status = getValue() as string;
      const badge = getRewardBadge(status);
      return (
        <div className="flex justify-start items-center overflow-hidden -ml-4">
          <div data-property-1={status} className="flex justify-start items-start">
            <div
              data-style={badge.style}
              data-icon="false"
              className={`h-5 px-1 ${badge.bg} rounded flex justify-center items-center gap-1`}
            >
              <div
                className={`justify-start ${badge.text} text-[10px] font-bold font-['SUIT_Variable'] leading-4`}
              >
                {badge.label}
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'paidDate',
    header: () => (
      <div className="w-44 pr-4 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          리워드 지급일
        </div>
      </div>
    ),
    cell: ({ getValue }: CellContext<ParticipantData, unknown>) => (
      <div className="w-44 pr-4 flex justify-start items-center overflow-hidden">
        <div className="w-full justify-start text-gray-600 text-sm font-medium font-['SUIT_Variable'] leading-5">
          {(getValue() as string | undefined) || '-'}
        </div>
      </div>
    ),
  },
  {
    id: 'action',
    header: () => (
      <div className="w-44 pr-14 flex justify-start items-center overflow-hidden">
        <div className="justify-start text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5">
          액션
        </div>
      </div>
    ),
    cell: ({ row }: CellContext<ParticipantData, unknown>) => (
      <div className="w-44 pr-14 flex justify-start items-center overflow-hidden">
        {getActionButton(row)}
      </div>
    ),
  },
];

interface RewardStateListProps {
  data: ParticipantData[];
  onRowClick?: (row: ParticipantData) => void;
}

export default function RewardStateList({ data, onRowClick }: RewardStateListProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const gridTemplate = '32px 124px 1fr auto 136px 128px 50px 192px 232px';

  return (
    <section className="mb-6 mt-[3px] overflow-hidden rounded-[12px] bg-white">
      <div>
        <div className="scrollbar-hide overflow-x-auto">
          <div className="grid items-center p-[14px]" style={{ gridTemplateColumns: gridTemplate }}>
            {table
              .getHeaderGroups()
              .map(headerGroup =>
                headerGroup.headers.map(header => (
                  <div key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                )),
              )}
          </div>
          <div>
            {table.getRowModel().rows.map((row: Row<ParticipantData>, index: number) => {
              const baseBg = index % 2 === 0 ? 'bg-white' : 'bg-background1';
              const hasButton =
                row.original.type === '승인전' ||
                row.original.type === '완료요청' ||
                row.original.type === '지급전';
              const rowProperty = hasButton ? 'Default' : '버튼x';

              return (
                <div
                  key={row.id}
                  data-property-1={rowProperty}
                  className={`group grid items-center h-[68px] ${baseBg} ${
                    onRowClick ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'
                  }`}
                  style={{ gridTemplateColumns: gridTemplate }}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <div key={cell.id} className="flex items-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
