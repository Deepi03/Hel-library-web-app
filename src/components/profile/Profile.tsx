/* eslint-disable prettier/prettier */
import { Avatar, Card, Typography } from "@mui/material"
import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import "./Profile.css"

import { TransactionsButtons } from "../transaction/TransactionsButtons"

export const Profile = () => {
  const { item: user } = useSelector((state: RootState) => state.user)
  return (
    <div>
      {user && (
        <Card
          className="section"
          id="services"
          sx={{ mt: "2rem", pt: "3rem", pl: "4rem", pr: "3rem" }}
        >
          <Avatar alt={user.username} sx={{ width: 70, height: 70 }}></Avatar>
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
            {user.username}
          </Typography>
          <div>
            <TransactionsButtons></TransactionsButtons>
          </div>
        </Card>
      )}
    </div>
  )
}
