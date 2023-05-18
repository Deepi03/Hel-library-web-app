/* eslint-disable prettier/prettier */
import { Avatar, Box, Card, IconButton, Typography } from "@mui/material"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import { useDispatch, useSelector } from "react-redux"

import { AppDispatch, RootState } from "../../redux/store"
import "./Profile.css"
import { Book, User } from "../../types_variables/types"
//import { returnBook } from "../../redux/slices/bookSlice"
import { checkAdmin } from "../../hook/checkAdmin"
import { getToken, getUserByToken } from "../../hook/getToken"
import {
  returnBook,
  transactionsOfUser
} from "../../redux/middlewares/transactionThunk"
import { useEffect } from "react"

export const Profile = () => {
  const isAdmin = checkAdmin()
  const dispatch = useDispatch<AppDispatch>()
  const { items: books } = useSelector((state: RootState) => state.book)
  const token = getToken()
  let loggedUser: User | undefined = undefined
  if (token) {
    const user = getUserByToken(token)
    if (user) loggedUser = user
  }
  useEffect(() => {
    if (loggedUser?.id) {
      dispatch(transactionsOfUser(loggedUser.id))
    }
  }, [])

  const { items: transactions } = useSelector(
    (state: RootState) => state.transaction
  )

  const handleReturn = (id: string | undefined) => {
    if (id) {
      dispatch(returnBook(id))
    }
  }

  return (
    <div>
      {loggedUser && (
        <>
          <Avatar
            alt={loggedUser.username}
            src={loggedUser}
            sx={{ width: 70, height: 70, mt: "1rem" }}
          ></Avatar>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "#323232",
              fontWeight: "200",
              fontSize: "1.6rem",
              mt: "0.5rem",
              fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"]
            }}
          >
            {" "}
            {loggedUser.username}
          </Typography>

          <Box>
            {transactions.length > 0 && (
              <table id="books-table">
                <thead>
                  <tr>
                    <th>Books</th>
                    <th>Borrowed Date</th>
                    <th>Return Date</th>
                    <th>Should be Returned By</th>
                    <th>Reuturned</th>
                    <th>Return</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      {/* <td>{transaction.book}</td> */}
                      <td>
                        {
                          books.find((b) => {
                            if (b.id === transaction.book) {
                              return b.title
                            }
                          })?.title
                        }
                      </td>
                      <td>{transaction.borrowDate}</td>
                      <td>{transaction.returnDate}</td>
                      <td>{transaction.toBeReturned}</td>
                      <td>{transaction.returned ? "Yes" : "No"}</td>
                      <td>
                        {!transaction.returned && (
                          <IconButton
                            onClick={() => handleReturn(transaction.id)}
                          >
                            <KeyboardReturnIcon
                              sx={{ color: "#323232" }}
                            ></KeyboardReturnIcon>
                          </IconButton>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Box>
        </>
      )}
      {isAdmin && (
        <Box>
          <table id="books-table">
            <thead>
              <tr>
                <th>Books</th>
                <th>Borrowed Date</th>
                <th>Should be Returned By</th>
                <th>User</th>
              </tr>
            </thead>
            {/* <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.borrowDate}</td>
                  <td>{book.returnDate}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </Box>
      )}
    </div>
  )
}
