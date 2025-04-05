import { Book } from '../Book';

const API_URL = 'https://mission13-garff-backend-gecpfhddgcdvbefw.eastus-01.azurewebsites.net/api/Books';

export interface FetchBooksResponse {
  books: Book[];
  totalCount: number;
}

export const fetchBooks = async (
  booksPerPage: number,
  currentPage: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `category=${encodeURIComponent(cat)}`)
      .join('&');

    const url = `${API_URL}?pageSize=${booksPerPage}&pageNum=${currentPage}${
      selectedCategories.length > 0 ? `&${categoryParams}` : ''
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return await response.json();
  } catch (error) {
    console.error('fetchBooks error:', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/Add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('addBook error:', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }

    return await response.json();
  } catch (error) {
    console.error('updateBook error:', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }

    return;
  } catch (error) {
    console.error('deleteBook error:', error);
    throw error;
  }
};
