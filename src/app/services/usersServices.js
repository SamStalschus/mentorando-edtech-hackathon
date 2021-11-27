import { hash } from 'bcrypt'

import usersRepository from '../repositories/usersRepositories.js'

import { AppError } from '../shared/errors/AppError.js'

export default {

  async createUser(user) {

    if (!user.email || !user.password || !user.name)
      throw new AppError('Missing Params', 400, 'createUser')

    const userAlreadyExists = await usersRepository.findOne({ email: user.email })
    if (userAlreadyExists) throw new AppError('User Already Exists', 404, 'createUser')

    const passwordHash = await hash(user.password, 8)

    user.password = passwordHash

    usersRepository.create(user)
  },
  async createAvailableTimes(userId, date) {
    const startDate = new Date(date)
    const endDate = new Date(date)

    endDate.setHours(endDate.getHours() + 1)

    const finalDate = {
      startDate,
      endDate
    }

    return await usersRepository.update({ _id: userId }, { $push: { availableTimes: finalDate } })
  },
  async getUserType(userId) {

    const user = await usersRepository.findOne({ _id: userId })

    if (user.type === "MENTOR") return "MENTOR"
    if (user.type === "MENTORING") return "MENTORING"

  },

  async getAllMentors() {
    const mentors = await usersRepository.findAllMentors()
    return mentors
  },
  async getMentor(id) {
    const mentor = await usersRepository.findOne({ _id: id })
    return mentor
  }
}