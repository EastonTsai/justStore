import Footer from "components/Footer"
import Heater from "components/Heater"
import PhotoFrame from "components/PhotoFrame"
import { getOneProduct } from "method/server"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type product = {
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

const ProductPage = () => {
  const location = useLocation()
  const id = location.state.id
  const [product, setProduct] = useState<product>()

  useEffect(() => {
    getOneProduct(id)
      .then((res: product) => {
        setProduct(res)
      })
  })
  return (
    <div>
      <Heater />
      <div className=" container md:flex gap-x-4 py-8">
        <div className=" basis-1/2">
          {product && <PhotoFrame images={product.images} />}
        </div>
        <div className=" py-4 basis-1/2">
          <h1 className=" text-3xl font-bold">{product?.title}</h1>
          {product?.paths?.map(item =>
            <span key={item} className=" p-2 text-gray-400">{item}</span>
          )}
          <div className="py-8 whitespace-pre-line">
            {product?.introduce}
          </div>
          <div>
            {product?.options?.map(item =>
              <div key={item} className=" border px-4 py-2 my-1 bg-gray-100 hover:bg-white ">{item}</div>
            )}
          </div>
          <div className=" py-4">
            <div>
              售價 : $199
              <del className=" text-gray-400 ml-4">
                原價 : 398
              </del>
            </div>
          </div>
          <div className=" flex gap-x-4">
            <button className=" flex-1 px-4 py-2 rounded-md bg-gray-300 hover:bg-red-500 hover:text-white font-bold cursor-pointer duration-200">加入購物車</button>
            <button className=" flex-1 px-4 py-2 rounded-md bg-gray-300 hover:bg-red-500 hover:text-white font-bold cursor-pointer duration-200">直接購買</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default ProductPage