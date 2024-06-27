import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  postedBy: {
      type: String,
      required: true
  },
  comment: {
      type: String,
      required: true
  }
},
{
  timestamps: true,
});


const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);