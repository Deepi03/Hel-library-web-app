/* eslint-disable prettier/prettier */
import { Avatar, Box, Card, IconButton, Typography } from "@mui/material"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import { useDispatch, useSelector } from "react-redux"

import { AppDispatch, RootState } from "../../redux/store"
import "./Profile.css"
import { Book } from "../../types_variables/types"
import { returnBook } from "../../redux/reducers/booksReducer"
import { useAdmin } from "../../hook/useAdmin"

export const Profile = () => {
  const { item: user } = useSelector((state: RootState) => state.user)
  const { items: books } = useSelector((state: RootState) => state.book)
  const isAdmin = useAdmin()
  const dispatch = useDispatch<AppDispatch>()
  const borrowedBooks: Book[] = books.filter(
    (book) => book.userMail === user?.email
  )
  const handleReturn = (book: Book) => {
    dispatch(returnBook(book))
  }

  return (
    <div>
      {user && (
        <Card className="section" id="services" sx={{ mt: "5rem", p: "7rem" }}>
          <Avatar
            alt={user.name}
            src={user.picture}
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
            {user.name}
          </Typography>
          <i>{user.email}</i>

          <Box>
            {borrowedBooks.length > 0 && (
              <table id="books-table">
                <thead>
                  <tr>
                    <th>Books</th>
                    <th>Borrowed Date</th>
                    <th>Should be Returned By</th>
                    <th>Return</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.borrowDate}</td>
                      <td>{book.returnDate}</td>
                      <td>
                        <IconButton onClick={() => handleReturn(book)}>
                          <KeyboardReturnIcon
                            sx={{ color: "#323232" }}
                          ></KeyboardReturnIcon>
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Box>
        </Card>
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
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.borrowDate}</td>
                  <td>{book.returnDate}</td>
                  <td>{book.userMail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </div>
  )
}
