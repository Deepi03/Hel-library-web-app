import { current } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../../redux/reducers/userReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { Books } from "../books/Books"
import "./NavBar.scss"

export const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => {
    return state.user.currentUser
  })
  const user = useSelector((state: RootState) => {
    return state.user.currentUser
  })

  const dispatch = useDispatch<AppDispatch>()
  console.log("nav bar", user)
  return (
    <div className="navBar-div">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        {!isLoggedIn ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <button onClick={() => dispatch(logout(user))}>Logout</button>
        )}
      </ul>
    </div>
  )
}
