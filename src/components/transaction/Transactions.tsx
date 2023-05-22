/* eslint-disable prettier/prettier */

import { Box, Card, IconButton, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"

import {
  returnBook,
  transactionsOfUser
} from "../../redux/middlewares/transactionThunk"
import { AppDispatch, RootState } from "../../redux/store"

export const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: transactions } = useSelector(
    (state: RootState) => state.transaction
  )
  const { items: books } = useSelector((state: RootState) => state.book)

  const { item: user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (user?.id && user.role === "USER") {
      dispatch(transactionsOfUser(user.id))
    }
  }, [])

  const handleReturn = (id: string | undefined) => {
    if (id) {
      dispatch(returnBook(id))
    }
  }
  return (
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
            {user.username}´s Transactions
          </Typography>
          <Box sx={{ mt: "2rem", pt: "1rem", pl: "4rem", pr: "3rem" }}>
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
                {/*  <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
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
                </tbody> */}
                <tbody>
                  {transactions
                    .filter((transaction) => transaction.user === user.id)
                    .map((filteredTransaction) => (
                      <tr key={filteredTransaction.id}>
                        <td>
                          {
                            books.find((b) => {
                              if (b.id === filteredTransaction.book) {
                                return b.title
                              }
                            })?.title
                          }
                        </td>
                        <td>{filteredTransaction.borrowDate}</td>
                        <td>{filteredTransaction.returnDate}</td>
                        <td>{filteredTransaction.toBeReturned}</td>
                        <td>{filteredTransaction.returned ? "Yes" : "No"}</td>
                        <td>
                          {!filteredTransaction.returned && (
                            <IconButton
                              onClick={() =>
                                handleReturn(filteredTransaction.id)
                              }
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
          </Box>{" "}
        </div>
      )}
    </Card>
  )
}
