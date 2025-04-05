import { useState } from 'react';
import { Book } from '../Book';
import { addBook } from '../api/BooksAPIS';

interface AddBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddBookForm = ({ onSuccess, onCancel }: AddBookFormProps) => {
  const [newBook, setNewBook] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const handleSubmit = async () => {
    try {
      await addBook(newBook);
      onSuccess();
    } catch (err) {
      console.error('Add failed', err);
    }
  };

  return (
    <div className="card p-3 my-3">
      <h4>Add New Book</h4>
      <div className="row g-2">
        {Object.keys(newBook)
          .filter((k) => k !== 'bookID')
          .map((key) => (
            <div key={key} className="col-md-6">
              <label className="form-label">{key}</label>
              <input
                className="form-control"
                type={typeof (newBook as any)[key] === 'number' ? 'number' : 'text'}
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
        <button className="btn btn-primary me-2" onClick={handleSubmit}>Add</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AddBookForm;
