import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchData } from "../../redux/middlewares/googleLogin"
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
    dispatch(fetchData(user))
  }, [user])

  return (
    <div>
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
    </div>
  )
}
