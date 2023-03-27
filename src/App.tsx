/* eslint-disable prettier/prettier */
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import { AddBook } from "./components/books/AddBook"
import { Books } from "./components/books/Books"
import { Home } from "./components/home/Home"
import { Login } from "./components/login/Login"
import { RootState } from "./redux/store"
import "./App.scss"
import { SingleBook } from "./components/singleBook/SingleBook"
import { Authors } from "./components/author/Author"
import { Footer } from "./components/footer/Footer"
import { NavBar } from "./components/nav/NavBar"
import { UpdateBook } from "./components/books/UpdateBook"

function App() {
  const isLoggedIn = useSelector((state: RootState) => {
    return state.user.isLoggedIn
  })
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="/books">
            <Route path="" element={<Books />} />
            <Route path={":bookId/updateBook/"} element={<UpdateBook />} />
            {/* <Route path={":bookId/updateBook/"} element={<UpdateBook />} /> */}
            <Route path={":bookId/book"} element={<SingleBook />}></Route>
          </Route>
          <Route path="/addBook" element={<AddBook />}></Route>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/authors" element={<Authors></Authors>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  )
}

export default App
