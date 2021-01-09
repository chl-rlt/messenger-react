import React, { useState, useEffect } from 'react'
import SingleUser from './SingleUser'
import axios from 'axios'

const Users = ( { token, disconnect } ) => {

  const [ users, setUser ] = useState([])
  const [ isUserLoaded, setIsUserLoaded ] = useState(false)

  useEffect(() => {
    // Axios method to connect one user by using get method, (get, put, delete, post)
    axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${token}`)
    .then((res) => {
      const { user, message } = res.data.result
      if (message === 'wrong token. Access denied') {
        return disconnect()
      } else {
        setUser(user)
        setIsUserLoaded(true)
      }
    })
    .catch((err) => {
      console.log(err.response)
    })
  }, []) 

  return (
    <div className='users'>
      { isUserLoaded && users.map((user) => (
        <SingleUser name={user}  />
      ))}
    </div>
  )
}

export default Users