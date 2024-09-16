const express = require('express');
const router = express.Router();
const Query = require('../models/Query'); // Import the Query model

// Route to submit a query (POST request)
router.post('/api/queries', async (req, res) => {
  const { name, email, query } = req.body;

  try {
    const newQuery = new Query({ name, email, query });
    await newQuery.save(); // Save the query to the database
    res.status(201).json({ message: 'Query submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting query', error });
  }
});

// Route to get all queries (GET request)
router.get('/api/admin/queries', async (req, res) => {
  try {
    const queries = await Query.find(); // Fetch all queries from the database
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching queries', error });
  }
});

// Route to update the status of a query to 'done' (PUT request)
router.put('/api/admin/queries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedQuery = await Query.findByIdAndUpdate(id, { status: 'done' }, { new: true });
    res.status(200).json(updatedQuery); // Send back the updated query
  } catch (error) {
    res.status(500).json({ message: 'Error updating query', error });
  }
});

module.exports = router;
