import { createContext, useContext, useState } from "react";
import { getProductById } from "../Data/products";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext(null)
export default function CartProvider({children}) {
   
  const [cartItems , setCartItems] = useState([]);   //{productid , quantity}
  const navigate = useNavigate();
  function addToCart(productId) {
  setCartItems((prevItems) => {
    const existing = prevItems.find(
      (item) => item.id === productId
    );

    if (existing) {
      return prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prevItems, { id: productId, quantity: 1 }];
  });
}
function getCartItemsWithProducts() {
  return cartItems.map((item)=>({
    ...item,
    product : getProductById(item.id)

  })).filter((item)=>item.product);
  
}
function updateProductQuantity(productId,quantity){
  if(quantity <= 0){
    removeFromCart(productId);
    return;

  }
   setCartItems(cartItems.map((item)=> item.id === productId ? {...item , quantity} : item));
}
function removeFromCart(productId){
   setCartItems(cartItems.filter((item)=> item.id !== productId));
}
function getCartTotal (){
 return  cartItems.reduce((total , item)=> {
    const product =  getProductById(item.id);
    return total + (product ? product.price * item.quantity : 0);
  },0)
  
}
function orderPlaced() {
  alert("Your order has been placed");
  setCartItems([]);
  navigate("/");
}
   return <CartContext.Provider value={{addToCart , cartItems,getCartItemsWithProducts ,removeFromCart , updateProductQuantity, getCartTotal , orderPlaced}}>{children}</CartContext.Provider>
}


export function useCart() {
  const context = useContext(CartContext);
  return context;
}