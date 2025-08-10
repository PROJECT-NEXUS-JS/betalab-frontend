import React from 'react';
import PaginationElements, {
  PaginationArrowLeft,
  PaginationArrowRight,
  PaginationEllipsis,
} from '@/components/category/atoms/PaginationElements';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <PaginationArrowLeft
        onClick={handlePrevPage}
        className={currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      />
      {pageNumbers[0] > 1 && (
        <>
          <PaginationElements onClick={() => handlePageClick(1)} isActive={currentPage === 1}>
            1
          </PaginationElements>
          {pageNumbers[0] > 2 && <PaginationEllipsis />}
        </>
      )}
      {pageNumbers.map(page => (
        <PaginationElements
          key={page}
          onClick={() => handlePageClick(page)}
          isActive={currentPage === page}
        >
          {page}
        </PaginationElements>
      ))}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <PaginationEllipsis />}
          <PaginationElements
            onClick={() => handlePageClick(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationElements>
        </>
      )}
      <PaginationArrowRight
        onClick={handleNextPage}
        className={currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      />
    </div>
  );
}
