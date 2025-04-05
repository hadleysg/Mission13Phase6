import { useState } from 'react';
import BookList from '../components/BookList';
import Welcome from '../components/Welcome';
import CategoryFilter from '../components/CategoryFilter';
import CartSummary from '../components/CartSummary'; 

function BookListPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <div className="row py-3 mb-4">
        <Welcome />
      </div>

      <div className="row">
        {/* LEFT COLUMN - Filters + Cart Summary */}
        <div className="col-md-3 d-flex flex-column gap-4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <CartSummary /> 
        </div>

        {/* RIGHT COLUMN - Book List */}
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BookListPage;
