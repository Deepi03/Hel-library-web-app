import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../../redux/reducers/userReducer"
import { AppDispatch, RootState } from "../../redux/store"
import "./NavBar.scss"

export const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => {
    return state.user.isLoggedIn
  })
  const user = useSelector((state: RootState) => {
    return state.user.items
  })

  const dispatch = useDispatch<AppDispatch>()
  console.log("nav bar", isLoggedIn)
  const handleLogout = () => {
    dispatch(logout(user))
  }
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
          <button onClick={() => handleLogout()}>Logout</button>
        )}
      </ul>
    </div>
  )
}
