/* eslint-disable prettier/prettier */

import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const LoginButton = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={() => navigate("/signup")}
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
    </>
  )
}
