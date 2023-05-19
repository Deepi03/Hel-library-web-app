import jwt_decode from "jwt-decode"

import { DecodedUser } from "../types_variables/types"

/* eslint-disable prettier/prettier */

export const getUserByToken = () => {
  const token = localStorage.getItem("token")
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
