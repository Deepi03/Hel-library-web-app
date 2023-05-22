/* eslint-disable prettier/prettier */

import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { RootState } from "../../redux/store"
export const TransactionsButtons = () => {
  const navigate = useNavigate()
  const { item: user } = useSelector((state: RootState) => state.user)
  return (
    <>
      {user && user.role === "ADMIN" && (
        <Button onClick={() => navigate("admin/allTransactions")}>
          All Transactions
        </Button>
      )}
      <Button onClick={() => navigate("transactions")}>Own Transations</Button>
    </>
  )
}
