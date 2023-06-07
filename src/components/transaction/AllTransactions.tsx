/* eslint-disable prettier/prettier */
import { Box, Card, IconButton, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  allTransactions,
  deleteTransactionById
} from "../../redux/middlewares/transactionThunk"
import { allUsers } from "../../redux/middlewares/userThunk"
import { AppDispatch, RootState } from "../../redux/store"
import { Transaction } from "../../types_variables/types"
import { toast } from "react-toastify"

export const AllTransactions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { transaction, user, book } = useSelector((state: RootState) => state)

  useEffect(() => {
    if (user.item && user.item.role === "ADMIN") {
      dispatch(allTransactions())
      dispatch(allUsers())
    }
  }, [])

  const handleDelete = (transaction: Transaction) => {
    if (transaction.id) {
      dispatch(deleteTransactionById(transaction.id))
    }
  }

  return (
    <>
      <Card sx={{ mt: "2rem", pt: "3rem", pl: "4rem", pr: "3rem" }}>
        {user && (
          <div>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                color: "#323232",
                fontWeight: "200",
                fontSize: "1.6rem",
                mt: "0.3rem",
                fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"]
              }}
            >
              {" "}
              All Transactions
            </Typography>
            <Box sx={{ mt: "2rem", pt: "1rem", pl: "4rem", pr: "3rem" }}>
              {transaction.items.length > 0 && (
                <table id="books-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Books</th>
                      <th>Borrowed Date</th>
                      <th>Return Date</th>
                      <th>Should be Returned By</th>
                      <th>Reuturned</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.items.map((transaction) => (
                      <tr key={transaction.id}>
                        {user.items.length > 0 && (
                          <td>
                            {
                              user.items.find((u) => {
                                if (u.id === transaction.user) {
                                  return u.username
                                }
                              })?.username
                            }
                          </td>
                        )}
                        <td>
                          {
                            book.items.find((b) => {
                              if (b.id === transaction.book) {
                                return b.title
                              }
                            })?.title
                          }
                        </td>
                        <td>{transaction.borrowDate.substring(0, 10)}</td>
                        <td>
                          {transaction.returnDate &&
                            transaction.returnDate.substring(0, 10)}
                        </td>
                        <td>{transaction.toBeReturned.substring(0, 10)}</td>
                        <td>{transaction.returned ? "Yes" : "No"}</td>
                        <td>
                          <IconButton>
                            <DeleteIcon
                              sx={{
                                color: "#323232",
                                "&:hover": {
                                  boxShadow: "none",
                                  color: "red"
                                }
                              }}
                              onClick={() => {
                                handleDelete(transaction)
                              }}
                            ></DeleteIcon>
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Box>{" "}
          </div>
        )}
      </Card>
    </>
  )
}
