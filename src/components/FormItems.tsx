
import { ReactComponent as Edit } from 'files/icons/edit.svg'
import { ReactComponent as Xcircle } from 'files/icons/x-circle.svg'
import { useState } from 'react'
export const InputItem = (props: {
  id?: string,
  type?: string,
  placeholder?: string,
  value?: string | number,
  onChange: (value: string) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}) => {
  const { id, type, placeholder, value, onChange, onKeyDown } = props

  return (
    <input
      id={id}
      type={type ? type : 'text'}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => onKeyDown && onKeyDown(e)}
      className=" w-full px-3 py-2  border border-black rounded-[.5rem] bg-gray-100 outline-none"
    />
  )
}
export const OptionItem = (props: {
  onChange: (value: string) => void,
  onDelete: (value: string) => void,
  text: string,
}) => {
  const { onChange, onDelete, text } = props
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(text)

  const handleKeyDown = () => {
    onChange(value)
    setIsEdit(false)
  }
  return (
    <li className=" flex gap-x-3 py-2 px-4 border-b border-gray-500">
      <Edit
        className=" cursor-pointer"
        onClick={() => setIsEdit(true)}
      />
      {!isEdit ?
        <div className=" grow">{value}</div> :
        <input
          className=' grow outline-none'
          type="text" value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleKeyDown()}
        />
      }
      <Xcircle
        className="  [&>path]:stroke-red-800 cursor-pointer"
        onClick={() => onDelete(value)}
      />
    </li>
  )
}