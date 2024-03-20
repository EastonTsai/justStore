import { useState } from "react"
import { Introduce, Option, Price, Transport } from "./AdminSpecificationItems"

const AdminSpecification = () => {
  const [currentTag, setCurrentTag] = useState('說明')
  return (
    <div className=" flex flex-col h-full ">
      <ul className=" flex ">
        {['說明', '選項', '運送', '價格'].map(item =>
          <li
            key={item}
            className="flex-1 text-center text-[1.5rem] font-bold bg-gray-200 py-2 cursor-default"
            style={currentTag === item ? { background: 'white' } : {}}
            onClick={() => setCurrentTag(item)}
          >
            {item}
          </li>
        )}
      </ul>
      <div className=" flex-1 ">
        <Introduce current={currentTag === '說明' ? true : false} />
        <Option current={currentTag === '選項' ? true : false} />
        <Transport current={currentTag === '運送' ? true : false} />
        <Price current={currentTag === '價格' ? true : false} />
      </div>
    </div>
  )
}
export default AdminSpecification