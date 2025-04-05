import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate(-1); 
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <>
          <div className="alert alert-info">Your cart is empty.</div>
          <button
            className="btn btn-secondary mt-3"
            onClick={handleContinueShopping}
          >
            ← Continue Shopping
          </button>
        </>
      ) : (
        <>
          <table className="table table-bordered table-striped text-center">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.bookID, parseInt(e.target.value))
                      }
                      className="form-control text-center"
                      style={{ width: '80px', margin: 'auto' }}
                    />
                  </td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-secondary"
              onClick={handleContinueShopping}
            >
              ← Continue Shopping
            </button>

            <h4 className="fw-bold">Total: ${total.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
