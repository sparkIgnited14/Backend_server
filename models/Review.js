const mongoose = require('mongoose');

// Define the schema for a Query
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: 'pending', // The default status will be 'pending'
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// Create the Query model based on the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
