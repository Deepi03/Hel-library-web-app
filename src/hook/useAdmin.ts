import { useSelector } from "react-redux"

import { RootState } from "../redux/store"

export const useAdmin = () => {
  let admin = false
  const user = useSelector((state: RootState) => state.user.item)
  if (user?.role == "ADMIN") {
    admin = true
  }
  return admin
}
