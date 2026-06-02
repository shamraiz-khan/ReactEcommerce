
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import Nav from './components/Nav'
import AuthProvider from './context/AuthContext'
import ProductDetails from './pages/ProductDetails'
import CartProvider from './context/CartContext'

function App() {
 
  return (
    <AuthProvider>
      <CartProvider>


    <div className='app'>
      <Nav />
     <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/auth' element = {<Auth />}/>
      <Route path='/checkout' element = {<Checkout />}/>
      <Route path = '/product/:id' element = {<ProductDetails />} />

     </Routes>
    </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
