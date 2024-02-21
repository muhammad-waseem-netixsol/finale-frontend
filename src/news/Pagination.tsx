import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange, currentPage, totalPages }) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxButtonsToShow = 5; 

    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage || (i >= currentPage - maxButtonsToShow / 2 && i <= currentPage + maxButtonsToShow / 2)) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`relative inline-flex items-center ${
              i === currentPage
                ? 'z-10 bg-indigo-600 text-white focus:outline-none'
                : 'text-gray-900 hover:bg-gray-50 focus:outline-none'
            } px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
          >
            {i}
          </button>
        );
      } else if (pageButtons.length > 0 && pageButtons[pageButtons.length - 1].type !== 'span') {
        pageButtons.push(
          <span
            key={`ellipsis-${i}`}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
          >
            ...
          </span>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage + 9, totalPages)}</span> of{' '}
            <span className="font-medium">{totalPages}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:outline-none ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {renderPageButtons()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:outline-none ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
