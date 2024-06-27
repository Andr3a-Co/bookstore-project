import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const AddCommentForm = ({ bookName, onBookUpdated }) => {

    //State hooks
    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const addComment = async (e) => {

        e.preventDefault();

        if (!name || !commentText) {
            setError('Name and comment are required');
            return;
        }

        try {
            const response = await axios.post(`${bookName}/comments`, {
                postedBy: name,
                comment: commentText,                
            });
            console.log('Comment added:', response.data);
            const updateBook = response.data; 
            onBookUpdated(updateBook); 
            setName('');
            setCommentText('');
            setError('');
            enqueueSnackbar('Comment successfully added', { variant: "success"});
        }
        catch (err) {
            console.log(err);
            setError('Error adding comment');
        }
    }

    return (
        <div id="add-comment-form">
            <h3 className="text-xl font-bold text-blue-600/100 mt-4 mb-4">Add a new Comment</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                id="name" aria-describedby="helper-text-explanation" className=" mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"/>
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment:</label>
                <textarea
                    id="comment"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4"
                    cols="50"                      
                    className=" mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."/>                
                <button 
                    onClick={addComment} 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post comment</button>
            </div>
            </form>

        </div>
    )

};

export default AddCommentForm;