import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import AdminPage from 'pages/AdminPage';
import LoginPage from 'pages/LoginPage';
import Register from 'pages/RegisterPage';
import UserDateContext from 'context/UserDate';
import PathSPage from 'pages/PathsPage';
import ProductPage from 'pages/ProductPage';
const basename = process.env.PUBLIC_URL

function App() {
  return (
    <div className="App font-sans">
      <BrowserRouter basename={basename}>
        <UserDateContext>
          <Routes>
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/paths' element={<PathSPage />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </UserDateContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
