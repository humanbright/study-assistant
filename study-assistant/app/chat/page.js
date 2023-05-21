'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, TextField, Button, Typography, Stack } from '@mui/material'

function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const endOfMessagesRef = useRef(null)

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    setInput('')
    messages.push({ role: 'user', content: input })
    setMessages(messages)

    // make an post request to api/chat with message as body
    fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: messages }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        setMessages([...messages, { role: 'assistant', content: data.content }])
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          overflowY: 'scroll',
          padding: 2,
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: message.role === 'user' ? '#e2f2ff' : '#f7f7f7',
                borderRadius: 4,
                padding: 1,
                maxWidth: '70%',
                wordBreak: 'break-word',
              }}
            >
              <Typography variant="body1">
                <strong>{message.role === 'user' ? 'You: ' : 'Assistant: '}</strong>
                {message.content}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={endOfMessagesRef} />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ marginRight: 2 }}
          autoComplete="off"
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default ChatInterface
