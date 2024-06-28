import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { URL } from "../api/apiConfig";
import AddCommentForm from './AddComentForm';
import CommentsList from "./CommentList";

const BookInformation = ({ book, onClose }) => {

    
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

    console.log(`BookInfo is rendering ${book}`);
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
            
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[600px] bg-white rounded-xl p-4 flex flex-col relative'
                style={{overflow: 'scroll'}}
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-blue-600 cursor-pointer'
                    onClick={onClose}
                />
                <h2 className='w-fit px-4 py-1 bg-blue-300 rounded-lg'>
                    {book.publishYear}
                </h2>
                <h4 className='my-2 text-gray-500'>{book._id}</h4>
                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookOpenTextLight className='text-blue-300 text-2xl' />
                    <h2 className='my-1'>{book.title}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <BiUserCircle className='text-green-300 text-2xl' />
                    <h2 className='my-1'>{book.author}</h2>
                </div>                
                <p className='my-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
                    voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
                    necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
                    nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
                    dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
                    vitae voluptate sequi repellat!
                </p>                
                
                <CommentsList comments={book.comments} />
                <AddCommentForm bookName={book._id} onBookUpdated={updatedBook => setBooks(updatedBook)} />
            </div>
        </div>
    );
};


export default BookInformation;