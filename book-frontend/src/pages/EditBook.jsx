import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { URL } from "../api/apiConfig";
import BackButton from "../components/BackButton";
import axios from "axios";

const EditBook = () => {
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {        
      axios
      .get(`${URL}/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);        
      })
      .catch((error) => {
        alert('Data could not be updated!');
        console.log(error);      
      });
  }, [id]);

  const editBook =  async () => {

    const bookData = {
      title,
      author,
      publishYear,
    }
    await axios
    .put(`${URL}/books/${id}`, bookData )
    .then(() => {
      enqueueSnackbar('Book successfully edited', { variant: "success"});
      navigate('/');
    })
    .catch((error) => {
      enqueueSnackbar('Data could not be edited', { variant: "error"});
      console.log(error);      
    });

  }

  return (    
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit book</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={editBook} >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;