const mongoose = require('mongoose');

// Define the schema for a Query
const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // The default status will be 'pending'
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// Create the Query model based on the schema
const Query = mongoose.model('Query', querySchema);

module.exports = Query;
