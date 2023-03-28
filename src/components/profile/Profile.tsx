/* eslint-disable prettier/prettier */
import { Avatar, Box, Card, IconButton, Typography } from "@mui/material"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@mui/styles"

import { AppDispatch, RootState } from "../../redux/store"
import "./Profile.css"
import { Book } from "../../types_variables/types"
import { returnBook } from "../../redux/reducers/booksReducer"

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user.item)
  const dispatch = useDispatch<AppDispatch>()
  const books: Book[] = useSelector((state: RootState) => state.book.items)
  const borrowedBooks: Book[] = books.filter(
    (book) => book.userMail === user?.email
  )

  const handleReturn = (book: Book) => {
    dispatch(returnBook(book))
  }

  const useStyles = makeStyles({
    root: {
      "& .MuiFilledInput-underline:after": {
        borderBottomColor: "#323232"
      },
      // focused color for input with variant='outlined'
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#323232"
        }
      }
    },
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(",")
    }
  })
  const classes = useStyles()

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
              mt: "0.5rem"
            }}
            className={classes.typography}
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
    </div>
  )
}
