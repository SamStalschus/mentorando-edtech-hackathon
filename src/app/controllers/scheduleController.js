import calendarService from '../services/calendarService.js'

import usersRepository from '../repositories/usersRepositories.js'

export default {

  async create(req, res) {
    try {
      const { date, attendees } = req.body

      await calendarService.scheduleEvent(date, attendees)

      res.send({ message: 'User created!' }).status(201)
    } catch (error) {
      // if (AppError) {
      //   res.status(error.status || 500).json({
      //     message: error.message
      //   })
      // }
    }
  },
  async render(req, res) {
    try {
      const { id } = req.params
      const user = await usersRepository.findOne({ _id: id })

      return res.render('homeMentor', { message: { mentor: user } });
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
}