import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { URL } from "../api/apiConfig";
import BackButton from "../components/BackButton";
import axios from "axios";

const AddBook = () => {
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  
  const addNewBook =  async () => {

    const bookData = {
      title,
      author,
      publishYear,
    }
    await axios
    .post(`${URL}/books`, bookData )
    .then(() => {
      enqueueSnackbar('Book successfully created', { variant: "success"});
      navigate('/');
    })
    .catch((error) => {
      enqueueSnackbar('Data could not be saved!', { variant: "error"});
      console.log(error);      
    });

  }

  return (    
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add new book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={addNewBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddBook;