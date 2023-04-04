/* eslint-disable prettier/prettier */
import { Button, List, ListItem, ListItemButton } from "@mui/material"
import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchUserDetails } from "../../redux/middlewares/googleLogin"

import { AppDispatch } from "../../redux/store"

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<Omit<
    TokenResponse,
    "error" | "error_description" | "error_uri"
  > | null>(null)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error)
  })

  useEffect(() => {
    dispatch(fetchUserDetails(user))
  }, [user])

  return (
    <List sx={{ textDecoration: "none" }}>
      <ListItem disablePadding>
        <Button
          onClick={() => login()}
          sx={{
            color: "#323232",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            fontWeight: "400",
            fontSize: "1rem",
            background: "#DDCFC8",
            "&:hover": {
              boxShadow: "none",
              color: "#9C28B0"
            }
          }}
        >
          Login
        </Button>
      </ListItem>
    </List>
  )
}
