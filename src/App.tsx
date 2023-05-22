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
import { Authors } from "./components/author/Authors"
import { AddAuthor } from "./components/author/AddAuthor"
import { UpdateAuthor } from "./components/author/UpdateAuthor"
import { Profile } from "./components/profile/Profile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchBooks } from "./redux/middlewares/bookThunk"
import { fetchAuthors } from "./redux/middlewares/authorThunk"
import { Footer } from "./components/footer/Footer"
import { fetchGenres } from "./redux/middlewares/genreThunk"
import { AllTransactions } from "./components/transaction/AllTransactions"
import { Transactions } from "./components/transaction/Transactions"
import { getUserFromStorage } from "./redux/slices/userSlice"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { item: user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthors())
    dispatch(fetchGenres())
    dispatch(getUserFromStorage())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/books">
            <Route path="" element={<Books />} />
            <Route path={":bookId"} element={<SingleBook />} />
          </Route>
          <Route
            path="/signUp"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/authors">
            <Route path="" element={<Authors />} />
          </Route>
          <Route path="/profile">
            <Route path="" element={user ? <Profile /> : <Navigate to="/" />} />
            <Route path="transactions" element={<Transactions />} />
            <Route
              path="admin/allTransactions"
              element={
                user?.role === "ADMIN" ? (
                  <AllTransactions />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Route>
          <Route
            path="/addBook"
            element={user?.role === "ADMIN" ? <AddBook /> : <Navigate to="/" />}
          />
          <Route
            path={":bookId/updateBook/"}
            element={
              user?.role === "ADMIN" ? <UpdateBook /> : <Navigate to="/" />
            }
          />
          <Route
            path="/addAuthor"
            element={
              user?.role === "ADMIN" ? <AddAuthor /> : <Navigate to="/" />
            }
          />
          <Route
            path={":authorId/updateAuthor"}
            element={
              user?.role === "ADMIN" ? <UpdateAuthor /> : <Navigate to="/" />
            }
          />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  )
}

export default App
