import { deleteBook } from '../api/BooksAPIS';

interface DeleteBookPromptProps {
  bookID: number;
  title: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const DeleteBookPrompt = ({
  bookID,
  title,
  onSuccess,
  onCancel,
}: DeleteBookPromptProps) => {
  const handleDelete = async () => {
    try {
      await deleteBook(bookID);
      onSuccess();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="alert alert-danger my-3">
      <h5>Are you sure you want to delete:</h5>
      <p>
        <strong>{title}</strong>
      </p>
      <button className="btn btn-danger me-2" onClick={handleDelete}>
        Yes, Delete
      </button>
      <button className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteBookPrompt;
