import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { useEffect, useState } from "react"

export const Login = () => {
  const [user, setUser] = useState<any>([])
  const [profile, setProfile] = useState<any>([])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error)
  })

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      console.log("inside useeffete")
      if (user) {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json"
            }
          }
        )
        const data = await res.json()
        setProfile(data)
      }
    }
    fetchData()
  }, [user])

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }
  return (
    <div>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  )
}
