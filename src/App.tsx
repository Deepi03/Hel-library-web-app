/* eslint-disable prettier/prettier */
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AddBook } from "./components/books/AddBook"
import { Books } from "./components/books/Books"
import { UpdateBook } from "./components/books/UpdateBook"
import { Login } from "./components/login/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/books">
            <Route path="" element={<Books />} />
            <Route path={":bookId/updateBook/"} element={<UpdateBook />} />
          </Route>
          <Route path="/addBook" element={<AddBook />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
