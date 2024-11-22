import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const professionalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  city: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  profileImage: {
    type: String,
    required: true,
  },
  workImages: [
    {
      type: String,
    },
  ],
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
  cities: [
    {
      type: String,
      required: true,
    },
  ],
});

// Hash password before saving
professionalSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check password
professionalSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Professional || mongoose.model('Professional', professionalSchema);
