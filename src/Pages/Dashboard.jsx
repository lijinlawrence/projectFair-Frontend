import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'

const Dashboard = () => {
  const [username,setUsername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  },[])
  return (
    <div>
      
      <Header insideDashboard/>
      <Container>
      <Row style={{marginTop:'100px'}}>

         <Col sm={12} md={8}>
          <h2>Welcome <span className=' text-warning'>{username}</span></h2>
          {/* my projects */}
          <MyProjects/>
         </Col>
         
         <Col sm={12} md={4}>
          {/* profile */}
         <Profile/>
         </Col>
      </Row>
      </Container>

    </div>
  )
}

export default Dashboard