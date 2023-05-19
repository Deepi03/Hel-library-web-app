/* eslint-disable prettier/prettier */

import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getUserByToken } from "../../hook/getToken"
export const TransactionsButtons = () => {
  const navigate = useNavigate()
  const user = getUserByToken()
  return (
    <>
      {user.role === "ADMIN" && (
        <Button onClick={() => navigate("admin/allTransactions")}>
          All Transactions
        </Button>
      )}
      <Button onClick={() => navigate("transactions")}>Own Transations</Button>
    </>
  )
}
