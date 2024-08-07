import React from 'react'
import styled from 'styled-components'
import Robot from '/robot.gif'
const Welcome = ({currUser}) => {
    console.log(currUser)
  return (
    <>
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome, <span>{currUser.username}!</span>
            </h1>
            <h3>Please Select a chat to start Messaging</h3>
        </Container>
    </>
  )
}

const Container=styled.div`

display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:20rem;
}
    span{
        color:#4e0eff;
    }

`

export default Welcome;