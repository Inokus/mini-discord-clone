const { generateRandomId } = require('./utils.cjs')

module.exports = {
  buildMessage: (session, message) => {
    return {
      id: generateRandomId(),
      date: Date.now(),
      userId: session.userId,
      username: session.username,
      avatarColor: session.avatarColor,
      message,
    }
  },
}
