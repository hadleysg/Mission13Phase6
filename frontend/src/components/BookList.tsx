import { useEffect, useState } from 'react';
import { Book } from '../Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../context/CartContext';
import { fetchBooks } from '../api/BooksAPIS';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks(
        booksPerPage,
        currentPage,
        selectedCategories
      );
      setBooks(data.books);
      setTotalBooks(data.totalCount);
    };

    loadBooks();
  }, [selectedCategories, currentPage, booksPerPage]);

  const sortBooks = () => {
    const sorted = [...books].sort((a, b) =>
      sortAscending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setBooks(sorted);
    setSortAscending(!sortAscending);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="fw-bold display-4 mb-3">Books</h1>

      <button
        className="btn text-white my-3"
        style={{ backgroundColor: '#6c7b95' }}
        onClick={sortBooks}
      >
        Sort by Title {sortAscending ? '↑' : '↓'}
      </button>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Pages</th>
              <th>Price</th>
              <th>Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookID}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>{book.pageCount}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/adminbooks" className="btn btn-dark my-3">
          Admin Panel
        </Link>
      </div>

      <Pagination
        currentPage={currentPage}
        booksPerPage={booksPerPage}
        totalBooks={totalBooks}
        onPageChange={setCurrentPage}
        onPageSizeChange={(newSize) => {
          setBooksPerPage(newSize);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}

export default BookList;
