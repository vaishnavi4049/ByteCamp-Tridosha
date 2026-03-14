const express = require('express');
const router = express.Router();
const History = require('../models/History');

// @route   POST api/history
// @desc    Save a new prediction to history
// @access  Public (for now, in production should be protected)
router.post('/', async (req, res) => {
  try {
    const {
      userEmail,
      disease_condition,
      ai_recommended_time,
      doctor_recommended_time,
      time_difference_hours,
      predicted_improvement_score,
      doctor_verification_required,
      status,
      parameters
    } = req.body;

    // Create new history entry
    const newHistory = new History({
      userEmail,
      disease_condition,
      ai_recommended_time,
      doctor_recommended_time,
      time_difference_hours,
      predicted_improvement_score,
      doctor_verification_required,
      status,
      parameters
    });

    const history = await newHistory.save();
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/history/:email
// @desc    Get all prediction history for a user
// @access  Public (for now)
router.get('/:email', async (req, res) => {
  try {
    // Sort by newest first
    const histories = await History.find({ userEmail: req.params.email }).sort({ timestamp: -1 });
    res.json(histories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/history/analytics/:email
// @desc    Get aggregated analytics data for a user
// @access  Public (for now)
router.get('/analytics/:email', async (req, res) => {
  try {
    const histories = await History.find({ userEmail: req.params.email });

    if (!histories || histories.length === 0) {
      return res.json({
        totalPredictions: 0,
        averageImprovement: 0,
        statusCounts: { SAFE: 0, WARNING: 0 },
        diseaseDistribution: {}
      });
    }

    const totalPredictions = histories.length;
    
    // Average predicted improvement score
    const avgImprovement = histories.reduce((acc, curr) => acc + curr.predicted_improvement_score, 0) / totalPredictions;

    // Status counts
    const statusCounts = histories.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, { SAFE: 0, WARNING: 0 });

    // Disease condition distribution
    const diseaseDistribution = histories.reduce((acc, curr) => {
      acc[curr.disease_condition] = (acc[curr.disease_condition] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalPredictions,
      averageImprovement: avgImprovement.toFixed(2),
      statusCounts,
      diseaseDistribution
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
