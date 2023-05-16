/* eslint-disable prettier/prettier */

import { useSelector } from "react-redux"
import jwt_decode from "jwt-decode"
import { RootState } from "../redux/store"
import { getToken, getUserByToken } from "./getToken"

export const checkAdmin = () => {
  let admin = false
  // const user = useSelector((state: RootState) => state.user)
  const token = getToken()
  let user
  if (token) {
    user = getUserByToken(token)
  }
  if (user?.role == "ADMIN") {
    admin = true
  }
  return admin
}
