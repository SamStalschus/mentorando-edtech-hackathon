import usersServices from '../services/usersServices.js'
import dateFormat from 'dateformat'

import { AppError } from '../shared/errors/AppError.js'


export default {

  async create(req, res) {
    try {
      const user = req.body
      var userData = {}
      if (req.params.code == 1) {
        userData.type = "MENTOR"
        userData.name = user.name
        userData.email = user.email
        userData.password = user.password
        userData.work = {
          company: user.company,
          position: user.position,
          description: user.description
        }
        userData.hourlyRate = user.hourlyRate || 100.00
      }
      else {
        userData = user
        userData.type = "MENTORING"
      }
      await usersServices.createUser(userData)

      return res.render('login', { message: null });
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
  async createAvailableTimes(req, res) {
    try {
      const userId = req.session.passport.user
      const { date } = req.body

      await usersServices.createAvailableTimes(userId, date)

      res.send({ message: 'Available time created!' }).status(201)
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
  async mentoringScreen(req, res) {
    try {
      const userType = await usersServices.getUserType(req.session.passport.user)
      if (userType === 'MENTORING') {
        const mentors = await usersServices.getAllMentors()
        return res.render('homeMentoring', { message: { mentors } })
      }
      if (userType === 'MENTOR') {
        const mentor = await usersServices.getMentor(req.session.passport.user)
        mentor.availableTimes.forEach(time => {
          time.startDateFormatted = dateFormat(time.startDate, "dddd, mmmm dS, h:MM:ss TT");
          time.endDateFormatted = dateFormat(time.endDate, "dddd, mmmm dS, h:MM:ss TT");
        })
        return res.render('profileMentor', {
          message: { mentor }
        });
      }
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
  async login(req, res) {
    try {
      res.render('home', { message: null });
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
  async logout(req, res) {
    try {
      req.logout()
      res.redirect('/')
      // res.render('home', { message: null });
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
  async signup(req, res) {
    try {
      if (req.params.code == 1)
        return res.render('signup', { message: { mentor: true } });
      else
        return res.render('signup', { message: { mentoring: true } });
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
}