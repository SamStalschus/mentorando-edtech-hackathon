import calendarService from '../services/calendarService.js'
import dateFormat from 'dateformat'

import usersRepository from '../repositories/usersRepositories.js'

export default {

  async create(req, res) {
    try {
      const { date, attendees, _id } = req.body

      usersRepository.update({ "email": attendees.mentor }, { $pull: { 'availableTimes': { _id: _id } } })

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
      const userId = req.session.passport.user

      const mentor = await usersRepository.findOne({ _id: id })
      const mentoring = await usersRepository.findOne({ _id: userId })

      mentor.availableTimes.forEach(time => {
        time.startDateFormatted = dateFormat(time.startDate, "dddd, mmmm dS, h:MM:ss TT");
        time.endDateFormatted = dateFormat(time.endDate, "dddd, mmmm dS, h:MM:ss TT");
      })

      return res.render('homeMentor', { message: { mentor: mentor, mentoring: mentoring } });
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
}