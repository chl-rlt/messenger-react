import React, { useEffect, useState } from 'react'
import moment from 'moment'

const SingleMessage = ({ content, username, isMessageSend, timestamp }) => {

  const [ date, setDate ] = useState('')

  const timestampToDate = (timestamp) => {
    const timeToDate = moment.unix(timestamp).format('DD/MM/YYYY hh:mm:ss')
    setDate(timeToDate)
  } 

  // scroll to last messages with useEffect => componentDidUpdate

  useEffect(() => {
    timestampToDate(timestamp)
    const messages = document.querySelector('.messages')
    const height = messages.scrollHeight
    messages.scrollTo(0, height)
  }, [isMessageSend])

  return (
    <> {/*fragment*/}
      <div className="single">
        <p className="username">{username}</p>
        <p className="date">{date}</p>
        <p className="message">{content}</p>
      </div>
    </>
  )
}

export default SingleMessage