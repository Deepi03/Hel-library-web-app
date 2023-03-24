/* eslint-disable prettier/prettier */
import { Avatar } from "@mui/material"
import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import "./Profile.scss"

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user.items)

  return (
    <div>
      {user && (
        <section className="section" id="services">
          <Avatar
            alt={user.name}
            src={user.picture}
            sx={{ width: 100, height: 100 }}
          ></Avatar>
          <h5>{user.name}</h5>
          <i>{user.email}</i>
        </section>
      )}
    </div>
  )
}
