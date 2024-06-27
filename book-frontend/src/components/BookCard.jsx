import React from 'react';
import BookSingleCard from "./BookSingleCard";


const BookCard = ({ books }) => {
    console.log(`BookCard is rendering ${books}`);
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
            {books.map((b) => (
                <BookSingleCard key={b._id} book={b} />
            ))}
        </div>
    );
};


export default BookCard;