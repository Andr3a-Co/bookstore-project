import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { URL } from "./api/apiConfig";
import axios from "axios";
import Home from './pages/Home';
import AddBook from "./pages/AddBook";
import DisplayBook from "./pages/DisplayBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";


const App = () => {
  useEffect( () => {
    
      axios.get(`${URL}/books`).then( response => console.log(response));
  }, []);
  
  axios.defaults.baseURL = `${URL}/books`;

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/books/new" element={<AddBook/>}/>
      <Route path="/books/details/:id" element={<DisplayBook/>}/>
      <Route path="/books/edit/:id" element={<EditBook/>}/>
      <Route path="/books/delete/:id" element={<DeleteBook/>}/>
      <Route path="*" element={ <h1>404: Page Not Found!</h1>} />
    </Routes>

  );
};

export default App;