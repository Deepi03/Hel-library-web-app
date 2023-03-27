import { List, ListItem, ListItemButton } from "@mui/material"
import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import { useEffect, useState } from "react"
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
        <ListItemButton onClick={() => login()}>Login</ListItemButton>
      </ListItem>
    </List>
  )
}
