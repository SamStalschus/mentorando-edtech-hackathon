import usersServices from '../services/usersServices.js'


import { AppError } from '../shared/errors/AppError.js'


export default {

  async create(req, res) {
    try {
      const user = req.body

      await usersServices.createUser(user)

      res.send({ message: 'User created!' }).status(201)
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
      if (userType === 'MENTOR')
        return res.render('homeMentor', {
          message: {}
        });
    } catch (error) {
      if (AppError) {
        res.status(error.status || 500).json({
          message: error.message
        })
      }
    }
  },
  async home(req, res) {
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
}