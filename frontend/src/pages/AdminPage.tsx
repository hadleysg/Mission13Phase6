import { useEffect, useState } from 'react';
import { Book } from '../Book';
import { fetchBooks, deleteBook, updateBook, addBook } from '../api/BooksAPIS';
import Pagination from '../components/Pagination';
import EditBookForm from '../components/EditBookForm';
import DeleteBookForm from '../components/DeleteBookForm';
import { Link } from 'react-router-dom';

const defaultBook: Book = {
  bookID: 0,
  title: '',
  author: '',
  publisher: '',
  isbn: '',
  classification: '',
  category: '',
  pageCount: 0,
  price: 0,
};

const AdminPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState<Book>({ ...defaultBook });

  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteBookTarget, setDeleteBookTarget] = useState<Book | null>(null);

  const loadBooks = async () => {
    const data = await fetchBooks(booksPerPage, currentPage, []);
    setBooks(data.books);
    setTotalBooks(data.totalCount);
  };

  useEffect(() => {
    loadBooks();
  }, [booksPerPage, currentPage]);

  const sortBooks = () => {
    const sorted = [...books].sort((a, b) =>
      sortAscending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setBooks(sorted);
    setSortAscending(!sortAscending);
  };

  const handleAddBook = async () => {
    try {
      await addBook(newBook);
      setNewBook({ ...defaultBook });
      setShowAddForm(false);
      await loadBooks();
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="fw-bold display-4 mb-3">Admin Book Manager</h1>

      <Link to="/" className="btn btn-dark my-3">
        Back to Home
      </Link>

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
              <th>Actions</th>
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
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => setEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => setDeleteBookTarget(book)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      <div className="my-4">
        {!showAddForm ? (
          <button
            className="btn btn-success"
            onClick={() => setShowAddForm(true)}
          >
            Add New Book
          </button>
        ) : (
          <>
            <h4 className="mt-4">Add New Book</h4>
            <div className="row g-2">
              {Object.keys(defaultBook)
                .filter((key) => key !== 'bookID')
                .map((key) => (
                  <div key={key} className="col-md-6">
                    <label className="form-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      className="form-control"
                      type={
                        typeof (newBook as any)[key] === 'number'
                          ? 'number'
                          : 'text'
                      }
                      value={(newBook as any)[key]}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          [key]:
                            typeof (newBook as any)[key] === 'number'
                              ? +e.target.value
                              : e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
            </div>

            <div className="mt-3">
              <button className="btn btn-primary me-2" onClick={handleAddBook}>
                Add Book
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {editBook && (
        <EditBookForm
          book={editBook}
          onSuccess={() => {
            setEditBook(null);
            loadBooks();
          }}
          onCancel={() => setEditBook(null)}
        />
      )}

      {deleteBookTarget && (
        <DeleteBookForm
          bookID={deleteBookTarget.bookID}
          title={deleteBookTarget.title}
          onSuccess={() => {
            setDeleteBookTarget(null);
            loadBooks();
          }}
          onCancel={() => setDeleteBookTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;
