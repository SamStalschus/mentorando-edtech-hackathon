import { google } from 'googleapis'

import config from '../config/index.js'
import userRepositories from '../repositories/usersRepositories.js'

function autheticateWithGoogle() {
  const { OAuth2 } = google.auth

  const oAuth2Client = new OAuth2(
    config.googleAPI.ACCESS_ID,
    config.googleAPI.SECRET_KEY
  )

  oAuth2Client.setCredentials({
    refresh_token: config.googleAPI.REFRESH_TOKEN,
  })

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
  return calendar
}

function sendEvent(calendar, event) {
  return calendar.events.insert(
    {
      calendarId: 'primary', resource: event, sendNotifications: true, recallOnRespondedEventsOnly: true,
      conferenceDataVersion: 1
    },
    err => {
      if (err) return console.error('Error Creating Calender Event:', err)
      return console.log(`Calendar event successfully created.`)
    }
  )
}

function createEventStructure(mentor, mentoringEmail, date) {
  return {
    summary: `Mentoria com ${mentor.name}`,
    location: `Plataforma mentorando =)`,
    description: `Você tem uma mentoria com ${mentor.name}, o link da reunião está no corpo do email =)`,
    colorId: 1,
    start: {
      dateTime: new Date(date.startDate),
      timeZone: 'Brazil/DeNoronha',
    },
    end: {
      dateTime: new Date(date.endDate),
      timeZone: 'Brazil/DeNoronha',
    },
    attendees:
      [
        { 'email': mentor.email },
        { 'email': mentoringEmail },
      ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {
          'method': 'email', 'minutes': 24 * 60
        },
        { 'method': 'popup', 'minutes': 10 },
      ],
    },
    conferenceData: {
      createRequest: {
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
        requestId: 'somerequestid',
      },
    },
    "guestsCanInviteOthers": true,
    "guestsCanModify": true,
    "guestsCanSeeOtherGuests": true,
    "anyoneCanAddSelf": true
  }

}

export default {
  async scheduleEvent(date, attendees) {
    try {
      const mentor = await userRepositories.findOne({ email: attendees.mentor }, { "name": 1, "email": 1 })

      const event = createEventStructure(mentor, attendees.mentoring, date)

      const calendar = autheticateWithGoogle()

      return sendEvent(calendar, event)
    } catch (error) {
      console.log(error)
    }
  }
}