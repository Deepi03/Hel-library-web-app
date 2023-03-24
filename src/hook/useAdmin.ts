import { useSelector } from "react-redux"

import { RootState } from "../redux/store"

export const useAdmin = () => {
  const user = useSelector((state: RootState) => state.user.items)
  let admin = false
  if (user?.email == "deepijai123@gmail.com") {
    admin = true
  }
  return admin
}
