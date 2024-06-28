import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from 'react-icons/md';
import { URL } from "../api/apiConfig";
import BookCard from "../components/BookCard";
import logo from '../assets/book-store.png';
import axios from "axios";


const Home = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    const loadBooks = async () => {
      await axios
        .get(`${URL}/books`)
        .then((response) => {
          setBooks(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    loadBooks();

  }, []);

  return (
    <>
      <div className='p-4'>
        <div className="flex justify-center items-center max-w-md">
          <img src={logo} alt='book-logo' className='link' />
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-6 font-bold text-transparent bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600'>My Books List</h1>
          <Link to='/books/new'>
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        <BookCard books={books} />
      </div>

    </>

  );
};

export default Home;