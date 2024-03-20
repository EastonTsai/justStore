
import { ReactComponent as FacebookSvg } from 'files/icons/iconmonstr-facebook-4.svg'
import { ReactComponent as YoutubeSvg } from 'files/icons/iconmonstr-youtube-9.svg'
import { ReactComponent as TwitterSvg } from 'files/icons/iconmonstr-twitter-4.svg'
import { ReactComponent as InstagramSvg } from 'files/icons/iconmonstr-instagram-14.svg'
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className=" bg-black text-white text-[14px]">
      <div className=" container px-4 py-8">
        <div className=' md:flex justify-between md:border-b'>

          <div className=" py-4 flex flex-col items-start gap-y-4">
            <Link to={'/register'}>
              <span>加入會員</span>
            </Link>
            <p>意見回饋</p>
          </div>

          <div className=' md:flex gap-x-12'>
            <div className=" py-4 flex flex-col gap-y-4">
              <span>取得協助</span>
              <ul className=" flex flex-col items-start gap-y-2 text-gray-400 hover:[&>li]:text-white">
                <li>訂單狀態</li>
                <li>出貨與寄貨</li>
                <li>退貨</li>
                <li>付款事項</li>
                <li>聯絡我們</li>
              </ul>
            </div>
            <div className=" py-4 flex flex-col gap-y-4">
              <span>關於 Dream</span>
              <ul className=" flex flex-col items-start gap-y-2 text-gray-400 hover:[&>li]:text-white ">
                <li>最新梢息</li>
                <li>職涯發展</li>
                <li>投資者</li>
                <li>環境永續性</li>
              </ul>
            </div>
          </div>

          <div className=' flex gap-x-4'>
            <div><TwitterSvg className=' w-8 h-8 fill-gray-400 hover:fill-white ' /></div>
            <div><FacebookSvg className=' w-8 h-8 fill-gray-400 hover:fill-white ' /></div>
            <div><InstagramSvg className=' w-8 h-8 fill-gray-400 hover:fill-white ' /></div>
            <div><YoutubeSvg className=' w-8 h-8 fill-gray-400 hover:fill-white ' /></div>
          </div>

        </div>
        <div className=' py-4 text-center text-gray-400'>	&copy; Easton Tsai 作品 </div>
      </div>
    </div>
  )
}
export default Footer