interface PaginationProps {
  currentPage: number;
  booksPerPage: number;
  totalBooks: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({
  currentPage,
  booksPerPage,
  totalBooks,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="d-flex justify-content-between align-items-center mt-3 w-100 flex-wrap">
      <div className="mb-2">
        <label className="me-2">Books per page:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={booksPerPage}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1); // reset to page 1 when changing size
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="mb-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-secondary mx-1 ${
              currentPage === i + 1 ? 'active' : ''
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
