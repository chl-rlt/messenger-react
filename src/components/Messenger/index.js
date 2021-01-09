import React, { useState } from 'react'
import Users from './Users'
import Messages from './Messages'
import axios from 'axios'

const Messenger = ({ id, token, disconnect }) => {

  // Declaration of state variables with the useState hook 

  const [message, setMessage] = useState('')
  const [ isMessageSend, setMessageSend ] = useState(false)

   // e => javascript object return by the eventListener (onChange)

  const handleInputValue = (e) => {
    const { value } = e.target
    setMessage(value)
  }

   // e => javascript object return by the eventListener (onSubmit)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message === '') return
    
     // Axios method to connect one user by using get method, (get, put, delete, post)

    axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/say/${token}/${id}/${message}`)
      .then((res) => {
        const { message } = res.data.result
        if (message === 'wrong token. Access denied') {
          return disconnect()
        } else {
          setMessage('')
          setMessageSend(!isMessageSend)
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  return (

    // JSX => render()

    <div className='messenger'>
      <Users token={token} disconnect={disconnect} />
      <div className="chat">
        <Messages disconnect={disconnect} token={token} isMessageSend={isMessageSend} />
        <form method="get" onSubmit={handleSubmit} >
            <input onChange={handleInputValue} className="input" type="text" placeholder="Send a message" name="message" id="message" value={message} required />
        </form>
      </div>
    </div>
  )
}

export default Messenger
