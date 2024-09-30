const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const { generateRandomId } = require('./server/utils.cjs')
const { initializeStore } = require('./server/sessions.cjs')
const { initializeChannel } = require('./server/channels.cjs')
const { buildMessage } = require('./server/messages.cjs')

const app = express()

const server = http.createServer(app)
const port = process.env.PORT || 8181

const io = new socketIo.Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173', 'https://piehost.com'],
  },
})

const CHANNEL_NAMES = ['welcome', 'general', 'react', 'learners', 'casual']
const WELCOME_CHANNEL = 'welcome'

const AVATAR_COLORS = [
  '#7289da', // Blurple
  '#43b581', // Green
  '#eb459e', // Fuchsia
  '#f04747', // Red
  '#1abc9c', // Aqua
  '#95a5a6', // Grey
  '#e67e22', // Orange
  '#9b59b6', // Purple
  '#3498db', // Light Blue
  '#2ecc71', // Dark Green
  '#c0392b', // Dark Red
]

const sessions = initializeStore()
const channels = CHANNEL_NAMES.map(channel => initializeChannel(channel))

// Custom middleware to prepare the session.
io.use(async (socket, next) => {
  const sessionId = socket.handshake.auth.sessionId

  // Ability to restore session from the client, if session ID is known.
  if (sessionId) {
    const session = sessions.getSessionById(sessionId)

    if (session) {
      socket.sessionId = sessionId
      socket.userId = session.userId
      socket.username = session.username
      socket.avatarColor = session.avatarColor

      return next()
    }
  }

  // const username = socket.handshake.auth.username || `anonymous_${generateRandomId(2)}`

  const username = socket.handshake.auth.username

  if (!username) {
    const error = new Error()
    error.data = { reason: 'INVALID_CREDENTIALS' }
    return next(error)
  }

  const existingUser = sessions
    .getAllUsers()
    .find(user => user.username.toLowerCase() === username.toLowerCase())
  if (existingUser) {
    const error = new Error()
    error.data = { reason: 'USERNAME_TAKEN' }
    return next(error)
  }

  socket.sessionId = generateRandomId()
  socket.userId = generateRandomId()
  socket.username = username
  socket.avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]

  next()
})

io.on('connection', socket => {
  const userSession = sessions.getSessionByUserId(socket.userId)

  const currentSession = {
    sessionId: socket.sessionId,
    userId: socket.userId,
    username: socket.username,
    avatarColor: socket.avatarColor,
    connected: true,
  }

  sessions.setSession(socket.sessionId, currentSession)
  socket.emit('session', currentSession)

  channels.forEach(channel => socket.join(channel.name))
  socket.join(currentSession.userId)

  if (!userSession) {
    // Announce when user joins the server for the first time
    socket.in(WELCOME_CHANNEL).emit('user:join', {
      userId: currentSession.userId,
      username: currentSession.username,
      avatarColor: currentSession.avatarColor,
      connected: true,
    })
  } else {
    socket.broadcast.emit('user:reconnect', {
      userId: currentSession.userId,
      username: currentSession.username,
      avatarColor: currentSession.avatarColor,
      connected: true,
    })
  }

  socket.emit('channels', channels)
  socket.emit('users', sessions.getAllUsers())

  socket.on('user:leave', () => {
    socket.in(WELCOME_CHANNEL).emit('user:leave', {
      userId: currentSession.userId,
      username: currentSession.username,
      avatarColor: currentSession.avatarColor,
      connected: false,
    })

    sessions.deleteSession(socket.sessionId)
    socket.disconnect()
  })

  socket.on('message:channel:send', (channel, message) => {
    const registeredChannel = channels.find(it => it.name === channel)

    if (!registeredChannel) return

    const builtMessage = buildMessage(currentSession, message)

    registeredChannel.messages.push(builtMessage)

    socket.to(channel).emit('message:channel', channel, builtMessage)
    socket.emit('message:channel', channel, builtMessage) // Send to the sender as well
  })

  socket.on('disconnect', () => {
    const session = sessions.getSessionById(socket.sessionId)

    if (!session) return

    sessions.setSession(socket.sessionId, {
      ...session,
      connected: false,
    })
    socket.broadcast.emit('user:disconnect', {
      userId: session.userId,
      username: session.username,
      avatarColor: currentSession.avatarColor,
      connected: false,
    })
  })
})

server.listen(port, () => {
  console.log('Server listening at port %d', port)
})
