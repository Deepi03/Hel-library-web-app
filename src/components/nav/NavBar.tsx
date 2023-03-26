/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { logout } from "../../redux/reducers/userReducer"
import { AppDispatch, RootState } from "../../redux/store"
import "./NavBar.scss"
import logo from "../../assets/image/book.svg"
import { Login } from "../login/Login"

export const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const isLoggedIn = useSelector((state: RootState) => {
    return state.user.isLoggedIn
  })
  const user = useSelector((state: RootState) => {
    return state.user.item
  })
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  return (
    <div className="navBar">
      <div className="navBar-container">
        <img src={logo} alt="logo" />
        <ul className="navBar-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={() => handleLogout()}>Logout</button>
            ) : (
              <Login></Login>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
