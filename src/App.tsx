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
import { AppDispatch, RootState } from "./redux/store"
import { SingleBook } from "./components/singleBook/SingleBook"
import { Authors } from "./components/author/Author"
import { AddAuthor } from "./components/author/AddAuthor"
import { UpdateAuthor } from "./components/author/UpdateAuthor"
import { Profile } from "./components/profile/Profile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchBooks } from "./redux/middlewares/fetchBooks"
import { useAdmin } from "./hook/useAdmin"
import { fetchAuthors } from "./redux/middlewares/fetchAuthors"
import { Footer } from "./components/footer/Footer"
import { fetchGenres } from "./redux/middlewares/fetchGenres"
import { Box } from "@mui/material"
import { Search } from "./components/search/Search"

function App() {
  const { isLoggedIn } = useSelector((state: RootState) => {
    return state.user
  })
  const isAdmin = useAdmin()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])
  useEffect(() => {
    dispatch(fetchAuthors())
  }, [])
  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Box sx={{ marginTop: "4rem", marginRight: "1rem" }}>
          <Search></Search>
        </Box>
        <ToastContainer />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/books">
            <Route path="" element={<Books />} />
            <Route path={":bookId"} element={<SingleBook />} />
          </Route>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/authors">
            <Route path="" element={<Authors />} />
          </Route>
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/addBook"
            element={isAdmin ? <AddBook /> : <Navigate to="/" />}
          />
          {/* <Route path="/addBook" element={<AddBook />} /> */}
          <Route
            path={":bookId/updateBook/"}
            element={isAdmin ? <UpdateBook /> : <Navigate to="/" />}
          />
          <Route
            path="/addAuthor"
            element={isAdmin ? <AddAuthor /> : <Navigate to="/" />}
          />
          <Route
            path={":authorId/updateAuthor"}
            element={isAdmin ? <UpdateAuthor /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  )
}

export default App
