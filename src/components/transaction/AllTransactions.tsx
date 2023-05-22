/* eslint-disable prettier/prettier */
import { Box, Card, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allTransactions } from "../../redux/middlewares/transactionThunk"
import { allUsers } from "../../redux/middlewares/userThunk"
import { AppDispatch, RootState } from "../../redux/store"

export const AllTransactions = () => {
  const { item: user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user?.id && user.role === "ADMIN") {
      dispatch(allTransactions())
      dispatch(allUsers())
    }
  }, [])

  const { items: transactions } = useSelector(
    (state: RootState) => state.transaction
  )
  const { items: users } = useSelector((state: RootState) => state.user)

  const { items: books } = useSelector((state: RootState) => state.book)

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
              {transactions.length > 0 && (
                <table id="books-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Books</th>
                      <th>Borrowed Date</th>
                      <th>Return Date</th>
                      <th>Should be Returned By</th>
                      <th>Reuturned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        {users.length > 0 && (
                          <td>
                            {
                              users.find((u) => {
                                if (u.id === transaction.user) {
                                  return u.username
                                }
                              })?.username
                            }
                          </td>
                        )}
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
