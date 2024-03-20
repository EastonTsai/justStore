import { useNavigate } from "react-router-dom"

type props = {
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
  translate?: number,
  liRef?: React.RefObject<HTMLLIElement>,
}

const ProductCard = (props: props) => {
  const { id, title, introduce, options, transport, price, originPrice, tags, paths, images, translate = 0, liRef } = props
  const navigate = useNavigate()

  return (
    <li
      className=" shrink-0 p-2 w-1/2 md:w-1/3 lg:w-1/4 duration-500"
      style={{ transform: `translateX(-${translate * 100}%)` }}
      ref={liRef}
    >
      <div className=" border p-2 rounded-tl-xl rounded-br-xl cursor-pointer hover:shadow-md transition duration-300">
        <div>
          <img
            src={images[0]} alt={images[0]}
            onClick={() => navigate('/product', { state: { id: id } })}
            className=""
          />
        </div>
        <div className="pt-2">
          <h2 className=" line-clamp-2">{title}</h2>
          <p className=" text-right text-red-500 font-black">
            ${price}
          </p>
        </div>
      </div>
    </li >
  )
}

export default ProductCard