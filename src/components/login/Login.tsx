/* eslint-disable prettier/prettier */
import { Box, Button, Card, TextField } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"

import { AppDispatch } from "../../redux/store"
import { initialUseState } from "../../types_variables/constants"
import { User } from "../../types_variables/types"
import { signin, signUp } from "../../redux/middlewares/userThunk"

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [user, setUser] = useState<User>(initialUseState)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(signin(user))
  }

  return (
    <form onSubmit={handleSubmit}>
      (
      <Box sx={{ paddingBottom: "20em", color: "#323232" }}>
        (
        <Card className="main-card-login">
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="username"
              fullWidth
              autoComplete="username"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, username: e.target.value })
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="password"
              type="text"
              fullWidth
              autoComplete="password"
              autoFocus
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              bgcolor: "#DDD0C8",
              color: "btn.text",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
            }}
          >
            Login
          </Button>
        </Card>
        )
      </Box>
      )
    </form>
  )
}
