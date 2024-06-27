import React from 'react';
import { BiUserCircle } from 'react-icons/bi';

const CommentsList = ({ comments }) => {

    return (
        <>
        <div>
            <h3 className="text-xl font-bold text-blue-600/100 mt-4 mb-4">Comments</h3>
            {comments.length > 0 ? (
            <div>
                {comments.map(comment => (
                    <div className="comment my-4" key={comment.postedBy + ":" + comment.text}>
                        <div className='flex justify-start items-center gap-x-2'>
                            <BiUserCircle className='text-red-300 text-2xl' />
                            <h4>{comment.postedBy}</h4>
                        </div>
                        <p>{comment.comment}</p>
                        
                    </div>
                ))}
            </div>
            ) : (
                <p>No comments posted yet</p>
            )}
        </div>
        </>
    );
};

export default CommentsList;