const express = require('express');
const reviewRouter = express.Router();
const Review = require('../models/Review');

// Route to submit a query (POST request)
reviewRouter.post('/reviewpage', async (req, res) => {
  const {name, rating, comment, source } = req.body;

  try {
    const newReview = new Review({ name, rating, comment, source });
    await newReview.save(); // Save the query to the database
    res.status(201).json({ message: 'review submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting query', error });
  }
});

// Route to get all queries (GET request)
reviewRouter.get('/reviewpage', async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all queries from the database
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching queries', error });
  }
});

// Route to update the status of a query to 'done' (PUT request)
reviewRouter.put('/reviewpage/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReview = await Review.findByIdAndUpdate(id, { status: 'done' }, { new: true });
    res.status(200).json(updatedReview); // Send back the updated query
  } catch (error) {
    res.status(500).json({ message: 'Error updating query', error });
  }
});

module.exports = reviewRouter;
