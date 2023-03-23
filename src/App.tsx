/* eslint-disable prettier/prettier */
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import { AddBook } from "./components/books/AddBook"
import { Books } from "./components/books/Books"
import { UpdateBook } from "./components/books/UpdateBook"
import { Home } from "./components/home/Home"
import { Login } from "./components/login/Login"
import Landing from "./components/nav/Landing"
import { NavBar } from "./components/nav/NavBar"
import { RootState } from "./redux/store"

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
          </Route>
          <Route path="/addBook" element={<AddBook />}></Route>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
