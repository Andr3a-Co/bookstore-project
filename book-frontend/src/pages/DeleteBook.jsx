import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import axios from "axios";

const DeleteBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {        
      axios
      .get(`http://localhost:5000/books/${id}`)
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

  const deleteBook = async () => {

    await axios
    .delete(`http://localhost:5000/books/${id}`)
    .then(() => {
      enqueueSnackbar('Book successfully deleted', { variant: "success"});
      navigate('/');
    })
    .catch((error) => {
      enqueueSnackbar('Book could not be deleted', { variant: "error"});
      console.log(error);      
    });

  }
  
  return (    
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>    
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[650px] p-8 mx-auto'>
      <span className='text-2xl p-4 mx-auto font-medium'>{title}, {author}, {publishYear}</span>  
        <h3 className='text-xl'>Are You Sure You want to delete this book?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={deleteBook}
        > Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;