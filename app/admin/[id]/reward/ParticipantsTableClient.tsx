'use client';

import { useState } from 'react';
import { useParticipantsQuery } from '@/hooks/reward/queries/useParticipantsQuery';
import { StatusFilter, type StatusFilterValue } from '@/components/admin/reward/StatusFilter';
import RewardSearchBar from '@/components/admin/reward/RewardSearchBar';
import SortButtons from '@/components/admin/reward/SortButtons';
import ParticipantsTable from '@/components/admin/reward/ParticipantsTable';
import Pagination from '@/components/admin/reward/Pagination';

interface ParticipantsTableClientProps {
  postId: number;
}

export default function ParticipantsTableClient({ postId }: ParticipantsTableClientProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('ALL');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data, isLoading, isError } = useParticipantsQuery({
    postId,
    // status: statusFilter === 'ALL' ? null : statusFilter,
    searchKeyword: searchKeyword || undefined,
    sortDirection,
    page,
    size: pageSize,
  });

  const handleApprove = (participationId: number) => {
    console.log('승인하기:', participationId);
  };

  const handleComplete = (participationId: number) => {
    console.log('완료처리:', participationId);
  };

  const handlePay = (participationId: number) => {
    console.log('지급하기:', participationId);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !data) {
    return <div>에러 발생</div>;
  }

  const participants = data.data.content;
  const totalPages = data.data.totalPages;

  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className="flex justify-between items-center gap-5">
        <div className="flex-1">
          <RewardSearchBar value={searchKeyword} onChange={setSearchKeyword} />
        </div>
        <div className="flex items-center gap-5">
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
          <SortButtons sortDirection={sortDirection} onChange={setSortDirection} />
        </div>
      </div>
      <ParticipantsTable
        participants={participants}
        onApprove={handleApprove}
        onComplete={handleComplete}
        onPay={handlePay}
      />
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
