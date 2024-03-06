import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthorizationContext } from '../Context/TokenAuth'

const Header = ({insideDashboard}) => {
  const navigate = useNavigate()
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)


  const handleLogout=()=>{
    // remove all existing userDetails from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    // navigate to landingPage
    navigate('/')
  }
  return (
    <div>
          <Navbar className="bg-info">
        <Container
        >
          <Navbar.Brand href="#home">
           <Link to={'/'} 
              style={{textDecoration:'none',color:'white'}}
             
           ><i className='fa-brands fa-stack-overflow fa-bounce'></i>
           Project Fair</Link>
          </Navbar.Brand>
        {
          insideDashboard &&<button onClick={handleLogout} className=' btn align-items-right border'>Logout</button>
 }
        </Container>
      </Navbar>
   
    </div>
  )
}

export default Header