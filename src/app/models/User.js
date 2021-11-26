import mongoose from 'mongoose'

const Users = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['MENTOR', 'MENTORING'], require: true, default: 'MENTORING' },
    picture: { type: String, default: 'https://raw.githubusercontent.com/msalves008/hackathon_mentorando_fasam/main/src/assets/mentorando/man3.png' },
    work: {
      company: { type: String, required: false },
      position: { type: String, required: false },
      description: { type: String, required: false }
    },
    hourlyRate: { type: Number, required: false },
    availableTimes: [
      {
        startDate: { type: Date, required: false },
        endDate: { type: Date, required: false }
      }
    ]
  },
  {
    timestamps: true
  })

export default mongoose.model('Users', Users);
