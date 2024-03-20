import logo from "files/images/logo@1.5x.png"
import { Link } from "react-router-dom"
import { UserDate } from "context/UserDate"
import { useContext } from "react"
import { ReactComponent as LoginSvg } from 'files/icons/會員-icon.svg'
import { ReactComponent as UpLoad } from 'files/icons/upLoad.svg'
import { ReactComponent as ShoppingCartSvg } from 'files/icons/購物車-icon.svg'
import { userSignOut } from "method/firebase"
const Heater = () => {
  const userDate = useContext(UserDate)
  const handleSignOut = () => {
    userDate.userId = ''
    localStorage.removeItem('token')
    userSignOut()
    alert('您已登出')
    window.location.reload()
  }
  return (
    <div className=" container py-4 flex items-center">
      <div>
        <ShoppingCartSvg />
      </div>
      <div className=" w-20 h-20 mx-auto">
        <Link to='/'>
          <img src={logo} alt="loge" />
        </Link>
      </div>
      <div>
        {
          userDate.userId === '' ?
            <Link to={'/login'}>
              <LoginSvg />
            </Link> :
            <div
              className=" flex flex-col items-center cursor-pointer"
              onClick={handleSignOut}
            >
              <div>
                <UpLoad />
              </div>
              <div>登出</div>
            </div>
        }
      </div>
    </div>
  )
}
export default Heater