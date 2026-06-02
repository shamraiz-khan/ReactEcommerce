import React from 'react'
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const {getCartItemsWithProducts, removeFromCart , updateProductQuantity , getCartTotal , orderPlaced} = useCart();
  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal();
  return (
    <div className='page'>
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
         <div className="checkout-items">
          <h2 className="checkout-section-title">
             Order Summary
              </h2>
             {cartItems?.map((item)=>(
              <div className="checkout-item" key={item.id}>
                <div className="checkout-item-details">
                    <img src={item.product.image} alt={item.product.name} className='checkout-item-image'/>
                    <h3 className="checkout-item-name">{item.product.name}</h3>
                    <p className="checkout-item-price">{item.product.price}</p>
                    </div>
                    <div className="checkout-item-controls">
                      <div className="quantity-controls">
                        <button className='quantity-btn' onClick={()=> updateProductQuantity(item.id , item.quantity-1)}>-</button>
                        <span className='quantity-value'>{item.quantity}</span>
                        <button className='quantity-btn' onClick={()=> updateProductQuantity(item.id , item.quantity+1)}>+</button>

                      </div>
                      <p className="checkout-item-total">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button className="btn-secondary btn-small btn" onClick={()=> removeFromCart(item.id)}> remove</button>
              </div>

              </div>
             ))}
         </div>
         <div className="checkout-summary">
           <h2 className="checkout-summary-title">Total</h2>
               <div className="checkout-total">
                <p className="checkout-total-label">Subtotal:</p>
                <p className="checkout-total-value">${total.toFixed(2)}</p>
               </div>
               <div className="checkout-total">
                <p className="checkout-total-label">total:</p>
                <p className="checkout-total-value checkout-total-final">${total?.toFixed(2)}</p>
               </div>
               <button className="btn btn-primary btn-block btn-large" onClick={()=>orderPlaced()}>Place Order</button>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
