import { ReactNode } from "react"

const AdminOptionButton = (props:
  {
    text: string,
    onClick: (text: string) => void,
    current: boolean,
  }
) => {
  const { text, onClick, current } = props
  const isCurrent = current ?
    { background: 'rgb(161, 98, 7)' } : {}
  return (
    <div
      className=" flex-1 w-[2.5rem] px-4 font-bold text-[1.5rem] flex justify-center items-center px bg-gray-700 text-white cursor-default"
      style={isCurrent}
      onClick={() => onClick(text)}
    >
      <div className="leading-7">
        {text}
      </div>
    </div>
  )
}
export default AdminOptionButton