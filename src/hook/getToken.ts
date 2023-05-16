import jwt_decode from "jwt-decode"

import { DecodedUser } from "../types_variables/types"

/* eslint-disable prettier/prettier */
export const getToken = () => {
  const token = localStorage.getItem("token")
  return token
}

export const getUserByToken = (token: string) => {
  if (token) {
    const decodedUser = jwt_decode(token) as DecodedUser
    const user = {
      username: decodedUser.username,
      id: decodedUser.user_id,
      role: decodedUser.role
    }
    return user
  }
}
