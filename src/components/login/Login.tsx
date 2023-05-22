/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Stack,
  Switch,
  TextField
} from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"

import { AppDispatch } from "../../redux/store"
import { initialUseState } from "../../types_variables/constants"
import { User } from "../../types_variables/types"
import { signin, signUp } from "../../redux/middlewares/userThunk"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [user, setUser] = useState<User>(initialUseState)
  const [checked, setChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const handleSubmit = (e: any) => {
    if (checked === false) {
      e.preventDefault()
      dispatch(signin(user))
      navigate("/")
    } else {
      e.preventDefault()
      dispatch(signUp(user))
      navigate("/")
    }
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
          <Stack direction="row" spacing={2}>
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
              Login / Signup
            </Button>
          </Stack>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="SingUp"
            labelPlacement="end"
          />
        </Card>
        )
      </Box>
      )
    </form>
  )
}
