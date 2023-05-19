/* eslint-disable prettier/prettier */
import { Box, Card, IconButton, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { getUserByToken } from "../../hook/getToken"
import { RootState } from "../../redux/store"

export const AllTransactions = () => {
  const { items: transactions } = useSelector(
    (state: RootState) => state.transaction
  )
  const { items: books } = useSelector((state: RootState) => state.book)
  const user = getUserByToken()
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
