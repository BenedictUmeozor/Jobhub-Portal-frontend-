import { useJobContext } from "../hooks/useJobContext";

const PaginationComponent = () => {
  const { currentPage, totalPages, handlePageChange } = useJobContext();

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const Buttons = generatePageNumbers();

  return (
    <div className="pagination">
      <div className="pagination-buttons">
        {Buttons.map((button, index) => (
          <button
            key={button}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === button}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationComponent;
