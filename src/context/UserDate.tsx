
import { ReactNode, createContext } from "react"
const userDate = {
  userId: '',
}
export const UserDate = createContext(userDate)
const UserDateContext = (props: { children: ReactNode }) => {
  return (
    <UserDate.Provider value={userDate}>
      {props.children}
    </UserDate.Provider>
  )
}
export default UserDateContext