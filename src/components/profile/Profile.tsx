/* eslint-disable prettier/prettier */
import { Avatar, Box, Card, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { makeStyles } from "@mui/styles"

import { RootState } from "../../redux/store"
import "./Profile.scss"
import { Book } from "../../types_variables/types"

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user.item)
  const books: Book[] = useSelector((state: RootState) => state.user.books)
  console.log(
    "user profile",
    books.map((book) => book.borrowDate)
  )

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
        <Card
          className="section"
          id="services"
          sx={{ backgroundColor: "#DDD0C8", mt: "5rem" }}
        >
          <Avatar
            alt={user.name}
            src={user.picture}
            sx={{ width: 100, height: 100 }}
          ></Avatar>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "#323232",
              fontWeight: "200"
            }}
            className={classes.typography}
          >
            {" "}
            {user.name}
          </Typography>
          <i>{user.email}</i>

          <Box>
            {books.length > 0 && (
              <table id="books">
                <thead>
                  <tr>
                    <th>Books</th>
                    <th>Borrowed Date</th>
                    <th>Should be Returned By</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => {
                    ;<tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.borrowDate}</td>
                      <td>{book.returnDate}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            )}
          </Box>
          {/* <ul>
            {books &&
              books.map((book) => <li key={book.id}>{book.borrowDate}</li>)}
          </ul> */}
        </Card>
      )}
    </div>
  )
}
