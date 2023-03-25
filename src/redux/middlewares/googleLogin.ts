/* eslint-disable prettier/prettier */
import { TokenResponse } from "@react-oauth/google"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUserDetails = createAsyncThunk(
  "login",
  async (
    user: Omit<
      TokenResponse,
      "error" | "error_description" | "error_uri"
    > | null
  ) => {
    if (user?.access_token) {
      /* localStorage.setItem("access_token", JSON.stringify(user.access_token)) */
      /* const token = localStorage.getItem("access_token") */
      /*  console.log(token) */
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            Accept: "application/json"
          }
        }
      )
      const data = await res.json()
      return data
    }
  }
)
