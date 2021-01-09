import React, { useState, useEffect } from 'react'
import SingleMessage from './SingleMessage'
import axios from 'axios'


const Messages = ({ token, isMessageSend, disconnect }) => {

  const [ isLoadedMessages, setIsLoadedMessages ] = useState(false)
  const [ talks, setTalk ] = useState([])


  useEffect(() => {
    
  // Axios method to connect one user by using get method, (get, put, delete, post)

  axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${token}/0`)
    .then((res) => {
      const { talk, message } = res.data.result
      if(message === 'wrong token. Access denied') {
        return disconnect()
      } else {
        setIsLoadedMessages(true)
        setTalk(talk)
      }
    })
    .catch((err) => {
      console.log(err.response)
    })
  }, [isMessageSend])
 
  // map is a native javascript function iterate each element in an array (of objects) and return a modified array
  return (
    <div className='messages'>
      { isLoadedMessages && talks.map((talk) => (
          <SingleMessage timestamp={talk.timestamp} content={talk.content} username={talk.user_name} isMessageSend={isMessageSend} />
      )) }
    </div>
  )
}

export default Messages