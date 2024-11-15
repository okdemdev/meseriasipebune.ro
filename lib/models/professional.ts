import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  workImages: [{
    type: String,
  }],
  rating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Professional || mongoose.model('Professional', professionalSchema);