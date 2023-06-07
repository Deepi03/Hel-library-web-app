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
import { Transaction, User } from "../../types_variables/types"

export const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: transactions } = useSelector(
    (state: RootState) => state.transaction
  )
  const { items: books } = useSelector((state: RootState) => state.book)

  const { item: user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    console.log("transactions of user transaction tsx", user)
    if (user?.id && (user.role === "USER" || user?.role === "ADMIN")) {
      console.log("transactions of user transaction tsx", user)
      dispatch(transactionsOfUser(user.id))
    }
  }, [user])

  const handleReturn = ({
    filteredTransaction,
    user
  }: {
    filteredTransaction: Transaction
    user: User
  }) => {
    if (filteredTransaction.id && user.id) {
      dispatch(returnBook({ filteredTransaction, user }))
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
            {transactions.length > 0 ? (
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
                        <td>
                          {filteredTransaction.borrowDate.substring(0, 10)}
                        </td>
                        <td>
                          {filteredTransaction.returnDate &&
                            filteredTransaction.returnDate.substring(0, 10)}
                        </td>
                        <td>
                          {filteredTransaction.toBeReturned.substring(0, 10)}
                        </td>
                        <td>{filteredTransaction.returned ? "Yes" : "No"}</td>
                        <td>
                          {!filteredTransaction.returned && (
                            <IconButton
                              onClick={() =>
                                handleReturn({ filteredTransaction, user })
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
            ) : (
              <Box sx={{ paddingBottom: "20em", color: "#323232" }}>
                <Typography
                  variant="h4"
                  sx={{
                    paddingBottom: "1em",
                    textAlign: "center",
                    paddingTop: "2em",
                    color: "#323232",
                    fontWeight: "200",
                    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"]
                  }}
                >
                  No Transactions Made
                </Typography>
              </Box>
            )}
          </Box>{" "}
        </div>
      )}
    </Card>
  )
}
