import React from 'react'
import { Link } from 'react-router-dom'
Link
const ProductCard = ({product}) => {
  return (
    <div className='product-card' key={product.id}>
                     <img src={product.image} className='product-card-image' alt="" />
                     <div className="product-card-content">
                        <h3 className='product-card-name'>{product.name}</h3>
                        <p className='product-card-price'>${product.price}</p>
                        <div className='product-card-actions'>
                            <Link className='btn btn-secondary' to = {`/product/${product.id}`}>View Details</Link>
                            <button className='btn btn-primary'>Add to cart</button>
                        </div>
                     </div>
                </div>
  )
}

export default ProductCard
