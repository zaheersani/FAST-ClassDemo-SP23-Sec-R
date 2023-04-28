import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {Routes, Route, Link, useParams, useNavigate}  from 'react-router-dom'

const App = () => {
  const [isLogin, setLogin] = useState(false)

  const loginHandler = () => {
    setLogin(true)
  }

  return (
    <>
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav> */}
      <Nav isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handlerProp={loginHandler} />} />
        <Route path="/signup" element={<Signup />} />

        {isLogin && 
          <>
          <Route path="/products">
            <Route path="" element={<ProductsList />} />
            <Route path=":id" element={<ProductDetails />} />
            <Route path="create" element={<h6>Add a New Product</h6>} />
          </Route>
          </>
        }

        <Route path="*" element={<h3>Not Found</h3>} />
      </Routes>
    </>
  )
}

const Nav = ({isLogin}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {isLogin &&
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
            }
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const Home = () => {
  return (
    <h3>Home Page</h3>
  )
}

const Login = ({handlerProp}) => {
  return (
    <>
      <h3>Login Page</h3>
      <button
        className="btn btn-primary"
        onClick={handlerProp}
      >Login</button>
      <Link to="/signup">Signup</Link>
    </>
  )
}

const Signup = () => {
  const navigate = useNavigate()
  return (
    <>
      <h3>Signup Page</h3>
      <button
        className="btn btn-primary"
      >Signup</button>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/login') }
      >Login</button>
    </>
  )
}

const ProductsList = () => {
  return (
    <>
      <Link to='/products/1'>Product # 1</Link><br />
      <Link to='/products/2'>Product # 2</Link><br />
      <Link to='/products/3'>Product # 3</Link><br /><br />
      <Link to="/products/create">Add New</Link>
    </>
  )
}

const ProductDetails = () => {
  const { id } = useParams()
  return (
    <>
      <h3>Product Details of Product # {id}</h3>
    </>
  )
}

export default App;
