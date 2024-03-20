import { ReactNode, useContext, useState } from "react"
import { InputItem, OptionItem } from "./FormItems"
import { ProductDate } from "context/ProductContext"


const SpecificationStyle = (props: { children: ReactNode, current: boolean }) => {
  const { children, current } = props
  return (
    <div
      className=" h-full hidden p-4"
      style={current ? { display: 'block' } : {}}
    >
      {children}
    </div>
  )
}
export const Introduce = (props: { current: boolean }) => {
  const productDate = useContext(ProductDate)
  const { current } = props
  const [title, setTitle] = useState('')
  const [introduce, setIntroduce] = useState('')
  productDate.title = title
  productDate.introduce = introduce
  return (
    <SpecificationStyle current={current}>
      <div className=" h-full flex flex-col">
        <div>
          <p className=" font-bold text-[1.5rem]">標題 :</p>
          <InputItem
            value={title}
            onChange={(value) => setTitle(value)}
          />
        </div>
        <div className=" grow mt-4 flex flex-col">
          <p className=" font-bold text-[1.5rem]">介紹 :</p>
          <textarea
            className=" grow max-h-[300px] w-full border border-black rounded-[.5rem] bg-gray-100 resize-none outline-none py-3 px-2"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
          >
            {introduce}
          </textarea>
        </div>
      </div>
    </SpecificationStyle>
  )
}
export const Option = (props: { current: boolean }) => {
  const productDate = useContext(ProductDate)
  const { current } = props
  const [option, setOption] = useState('')
  const [optionList, setOptionList] = useState<string[]>([])
  productDate.options = optionList
  const handleAdd = () => {
    if (option.trim().length > 0) {
      setOptionList([option, ...optionList])
      setOption('')
    }
  }
  const handleDelete = (value: string) => {
    setOptionList(prev => prev.filter(item => item !== value))
  }
  const handleEdit = (value: string) => {
    setOptionList(optionList.map(ol => {
      if (ol === value) {
        return value
      }
      return ol
    }))
  }
  return (
    <SpecificationStyle current={current}>
      <div className=" h-full flex flex-col">
        <div>
          <p className=" font-bold text-[1.5rem]">加入選項 :</p>
          <div className=" flex ">
            <InputItem
              value={option}
              onChange={(value) => setOption(value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button
              className=" shrink-0 w-[60px] hover:font-bold hover:text-[1.5rem] duration-300"
              onClick={handleAdd}
            > 新增</button>
          </div>
        </div>
        <div className=" mt-4 flex-1 flex flex-col">
          <p className=" font-bold text-[1.5rem]">選項列表 :</p>
          <ul className=" flex-1 w-full max-h-[500px] border border-black rounded-[.5rem] bg-gray-100 overflow-y-scroll">
            {optionList.map(ol =>
              <OptionItem
                key={ol}
                text={ol}
                onChange={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </ul>
        </div>
      </div>
    </SpecificationStyle>
  )
}
export const Transport = (props: { current: boolean }) => {
  const productDate = useContext(ProductDate)
  const { current } = props
  const list = ['7-11', '全家', 'OK', '萊爾富', '郵局', '宅配']
  const style = { background: 'rgb(209 213 219)' }
  const [transport, setTransport] = useState(list)
  productDate.transport = transport
  const handleClick = (li: string) => {
    if (transport.includes(li)) {
      setTransport(transport.filter(item =>
        item !== li))
      productDate.transport.filter(item => item !== li)
    } else {
      setTransport([li, ...transport])
      productDate.transport.push(li)
    }
  }
  return (
    <SpecificationStyle current={current}>
      <div>
        <div className=" flex gap-x-4">
          <div className=" flex gap-2 items-center">
            <p>已選取 : </p>
            <div className=" w-8 h-8 border border-black rounded-[.25rem] bg-gray-300 " />
          </div>
          <div className=" flex gap-2 items-center">
            <p>未選取 : </p>
            <div className=" w-8 h-8 border border-black rounded-[.25rem]" />
          </div>
        </div>
        <div className=" flex flex-wrap justify-around mt-4">
          {list.map(li =>
            <div key={li} className=" w-1/2 sm:w-1/3 aspect-square p-2">
              <div
                onClick={() => handleClick(li)}
                style={transport.includes(li) ? style : {}}
                className=" w-full h-full leading-[100%] flex justify-center items-center border-2 border-black rounded-[1rem]
              "
              >
                <p className=" font-bold text-2xl sm:text-3xl">{li}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </SpecificationStyle>
  )
}
export const Price = (props: { current: boolean }) => {
  const productDate = useContext(ProductDate)
  const { current } = props
  const [price, setPrice] = useState('')
  const [origin, setOrigin] = useState('')
  const tags = ['早鳥', '團購', '出清', '獨家', '熱賣', '少量', '缺貨', '快速']
  const [list, setList] = useState<string[]>([])
  const style = { background: 'rgb(251 146 60)' }
  productDate.price = price
  productDate.originPrice = origin
  productDate.tags = list
  const handleClickTag = (e: React.MouseEvent<HTMLLIElement>) => {
    const tagName = e.currentTarget.textContent
    if (tagName) {
      if (!list.includes(tagName)) {
        setList([tagName, ...list])
      }
      else {
        setList(list.filter(item =>
          item !== tagName))
      }
    }
  }

  return (
    <SpecificationStyle current={current}>
      <div>
        <div>
          <p className=" font-bold text-[1.5rem]">價格 :</p>
          <div className=" flex items-center">
            <span className=" font-bold text-xl pr-2">$ </span>
            <InputItem
              value={price}
              onChange={(value) => !isNaN(Number(value)) && setPrice(value)}
            />
          </div>
        </div>
        <div>
          <p className=" font-bold text-[1.5rem]">原價 :</p>
          <div className=" flex items-center">
            <span className=" font-bold text-xl pr-2">$ </span>
            <InputItem
              placeholder="非必填"
              value={origin}
              onChange={(value) => !isNaN(Number(value)) && setOrigin(value)}
            />
          </div>
        </div>
        <div className=" mt-4">
          <ul className=" flex flex-wrap">
            {
              tags.map(item =>
                <li
                  key={item}
                  onClick={handleClickTag}
                  className=" w-1/4 sm:w-1/5 md:w-1/6 p-2 flex justify-center items-center"
                >
                  <div
                    style={list.includes(item) ? style : {}}
                    className=" bg-gray-300 rounded-[1rem] text-2xl font-bold vertical text-center px-4 py-8 "
                  >
                    {item}
                  </div>
                </li>)
            }
          </ul>
        </div>
      </div>
    </SpecificationStyle>
  )
}