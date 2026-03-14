const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  disease_condition: {
    type: String,
    required: true
  },
  ai_recommended_time: {
    type: Number,
    required: true
  },
  doctor_recommended_time: {
    type: Number,
    required: true
  },
  time_difference_hours: {
    type: Number,
    required: true
  },
  predicted_improvement_score: {
    type: Number,
    required: true
  },
  doctor_verification_required: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  parameters: {
    age: Number,
    sleep_duration: Number,
    heart_rate: Number,
    stress: Number,
    glucose: Number,
    cholesterol: Number,
    gender: Number,
    condition: Number,
    drug: Number,
    dosage: Number,
    duration: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('history', HistorySchema);
