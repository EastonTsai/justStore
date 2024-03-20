import ProductCard from "./ProductCard"
import arrowTop from "files/icons/chevrons-down.svg"
import { useEffect, useRef, useState } from "react"

type products = {
  id?: string,
  created?: string,
  title: string,
  introduce: string,
  options?: string[],
  transport: string[],
  price?: string,
  originPrice?: string,
  tags?: string[],
  paths?: string[],
  images: string[],
}

const HomePageSection = (props: { title: string, data: products[] }) => {
  const { title, data } = props
  const [translate, setTranslate] = useState(0)
  const [checkIsLast, setCheckIsList] = useState(false)
  const ulRef = useRef<HTMLUListElement>(null)
  const liRef = useRef<HTMLLIElement>(null)


  const handleClickLeft = () => {
    if (checkIsLast) {
      setCheckIsList(false)
    }
    if (translate > 0) {
      setTranslate((prev) => prev - 1)
    }
  }
  const handleClickRight = () => {
    if (checkIsLast) {
      return
    }
    if (translate >= 0) {
      setTranslate((prev) => prev + 1)
    }
    if (translate >= data.length - 5) {
      const ulRight = ulRef.current?.getBoundingClientRect().right
      const liLeft = liRef.current?.getBoundingClientRect().left
      if (ulRight && liLeft) {
        if (liLeft <= ulRight) {
          setCheckIsList(true)
        }
      }
    }
  }

  return (
    <div className=" container py-4">
      <div className=" font-bold text-2xl text-center py-2 bg-gray-200">{title}</div>
      <div className=" relative">
        <ul
          ref={ulRef}
          className=" flex transition  overflow-hidden"
        >
          {data?.map((dp, index) =>
            <ProductCard
              key={dp.id}
              id={dp.id}
              title={dp.title}
              introduce={dp.introduce}
              options={dp.options}
              transport={dp.transport}
              price={dp.price}
              tags={dp.tags}
              paths={dp.paths}
              images={dp.images}
              translate={translate}
              liRef={index === data.length - 1 ? liRef : undefined}
            />
          )}
        </ul>
        <div>
          {
            translate !== 0 &&
            <div
              onClick={handleClickLeft}
              className=" absolute top-1/2 -left-6 -translate-y-1/2 cursor-pointer font-bold text-4xl text-gray-300 hover:text-black select-none">{'<'}</div>
          }
          {!checkIsLast &&

            <div
              onClick={handleClickRight}
              className=" absolute top-1/2 -right-6 -translate-y-1/2 cursor-pointer font-bold text-4xl text-gray-300 hover:text-black select-none">{'>'}</div>
          }
        </div>
      </div>
    </div>
  )
}
export default HomePageSection