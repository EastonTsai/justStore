import { InputItem } from "components/FormItems";
import Heater from "components/Heater";
import { UserDate } from "context/UserDate";
import { loginUser } from "method/firebase";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const userDate = useContext(UserDate)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    if (
      email.trim().length <= 0 ||
      password.trim().length <= 0
    ) {
      alert('輸入不可空白')
      return
    }
    const regexEmail = /^([a-zA-Z0-9-. ]+)@([a-zA-Z0-9-.]+\.com)$/
    if (!regexEmail.test(email)) {
      alert('Email 格式有誤')
      return
    }
    const res = await loginUser(email, password)
    if (res) {
      const days = 24 * 60 * 60 * 1000// 7 days
      const expirationTime = new Date().getTime() + days
      localStorage.setItem('expirationTime', JSON.stringify((expirationTime)))
      localStorage.setItem('userId', res.userId)
      alert('登入成功, 回到首頁！')
      navigate('/')
    } else {
      alert('"Email" 或 "密碼" 有誤！')
    }
  }
  return (
    <div>
      <Heater />
      <div className=" w-[80%] max-w-[600px] mx-auto bg-gray-100 rounded-lg">
        <p className=" text-[3rem] font-black text-center py-8">登入</p>
        <div className=" w-[80%] mx-auto mb-8">
          <InputItem
            placeholder="請輸入 Email"
            value={email}
            onChange={(value) => setEmail(value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <div className=" w-[80%] mx-auto ">
          <InputItem
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(value) => setPassword(value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <div className=" py-2 text-center">
          <button className=" p-4 text-[2rem] font-bold hover:text-red-500 duration-200"
            onClick={handleSubmit}
          >送出</button>
        </div>
        <div className=" p-2 flex justify-end">
          <Link to='/register'>
            <span className=" text-blue-300 hover:text-blue-600 duration-200 cursor-pointer">開新帳號</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default LoginPage;