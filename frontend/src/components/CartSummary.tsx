import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartSummary() {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="card p-3 shadow-sm border w-100">
      <h5 className="mb-2">Cart Summary</h5>
      <p className="mb-1">Items: {itemCount}</p>
      <p className="mb-2">Total: ${total.toFixed(2)}</p>
      <button
        className="btn btn-sm btn-outline-primary w-100"
        onClick={() => navigate('/cart')}
      >
        View Cart
      </button>
    </div>
  );
}

export default CartSummary;
