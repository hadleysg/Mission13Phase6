import { useState } from 'react';
import { Book } from '../Book';
import { updateBook } from '../api/BooksAPIS';

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(Number(formData[name as keyof Book])) ? value : +value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookID, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 my-3 bg-light w-100">
      <h4>Edit Book</h4>

      <div className="row g-2">
        {Object.keys(formData)
          .filter((k) => k !== 'bookID')
          .map((key) => (
            <div key={key} className="col-md-6">
              <label className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                className="form-control"
                name={key}
                type={
                  typeof formData[key as keyof Book] === 'number'
                    ? 'number'
                    : 'text'
                }
                value={formData[key as keyof Book] as any}
                onChange={handleChange}
              />
            </div>
          ))}
      </div>

      <div className="mt-3">
        <button type="submit" className="btn btn-success me-2">
          Save Changes
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
