import mongoose from 'mongoose'

import config from '../../../config/index.js'

export default async () => {

  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }

  mongoose.connect(config.database.URL, options)
}

