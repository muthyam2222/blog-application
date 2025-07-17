import {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from "../../assets/logo4.avif";
import {useClerk,useUser} from '@clerk/clerk-react'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'

function Header() {

  const {signOut}=useClerk()
  const {isSignedIn,user,isLoaded}=useUser()
  const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
  const navigate=useNavigate();

  //function to signout
  async function handleSignOut(){
    await signOut();
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <div >
      <nav className='header p-2 d-flex justify-content-between'>
        <div className="d-flex justify-content-center text-white">
          <Link to="/" className='nav-link'>
          <img src={logo} alt="" width="60px" className="ms-4" />
          </Link>
        </div>
        <ul className="d-flex justify-content-around list-unstyled w-25 text-white">
          {
            !isSignedIn?
            <>
              <li className="nav-item">
                <Link to="" className='nav-link'>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="signin" className='nav-link'>SignIn</Link>
              </li>
              <li className="nav-item">
                <Link to="signup" className='nav-link'>SignUp</Link>
              </li>
            </> :
            <div className='user-button'>
              <div style={{position:'relative'}}>
                <img src={user.imageUrl} width="40px" className='rounded-circle' alt="" />
                <p className="role" style={{position:'absolute',top:"0px",right:"-20px"}}>{currentUser.role}</p>
              </div>
              <p className="mb-0 user-name">{user.firstName}</p>

              <button className="btn btn-warning signout-btn" onClick={handleSignOut}>Signout</button>
            </div>
          }
        </ul>
      </nav>
    </div>
  )
}

export default Header