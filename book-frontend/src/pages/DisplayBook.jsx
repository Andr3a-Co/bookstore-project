import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../api/apiConfig";
import axios from "axios";
import BackButton from "../components/BackButton";


const DisplayBook = () => {
  
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {    
    const loadBook = async () => {
      await axios
        .get(`${URL}/books/${id}`)
        .then( (response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);      
      });
    }
    loadBook();

  }, [id]);

  return (    
    <div className='p-4'>
      <div className='flex'>
      <BackButton/>
      </div>
      <h1 className='text-3xl my-4'>Book Details</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>      
    </div>
  );
};

export default DisplayBook;