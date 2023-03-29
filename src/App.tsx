/* eslint-disable prettier/prettier */
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { AddBook } from "./components/books/AddBook"
import { Books } from "./components/books/Books"
import { UpdateBook } from "./components/books/UpdateBook"
import { Home } from "./components/home/Home"
import { Login } from "./components/login/Login"
import { NavBar } from "./components/nav/NavBar"
import { RootState } from "./redux/store"
import { SingleBook } from "./components/singleBook/SingleBook"
import { Authors } from "./components/author/Author"
import { AddAuthor } from "./components/author/AddAuthor"
import { UpdateAuthor } from "./components/author/UpdateAuthor"
import { Profile } from "./components/profile/Profile"

function App() {
  const isLoggedIn = useSelector((state: RootState) => {
    return state.user.isLoggedIn
  })
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="/books">
            <Route path="" element={<Books />} />
            <Route path={":bookId/updateBook/"} element={<UpdateBook />} />
            <Route path={":bookId/book"} element={<SingleBook />}></Route>
          </Route>
          <Route path="/addBook" element={<AddBook />}></Route>
          <Route path="/addAuthor" element={<AddAuthor />}></Route>

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/authors">
            <Route path="" element={<Authors />} />
            <Route path={":authorId/updateAuthor"} element={<UpdateAuthor />} />
          </Route>

          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
