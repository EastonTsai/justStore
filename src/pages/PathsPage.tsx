import Footer from "components/Footer"
import Heater from "components/Heater"
import ProductCard from "components/ProductCard"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { dummyProduct } from "dummyData/dummyDate"
import CategoryList from "components/CategoryList"
import { getAllProducts, getCategoryProduct } from "method/server"

const PathSPage = () => {
  const location = useLocation()
  const [state, setState] = useState(location.state)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getCategoryProduct(state)
      .then((res: any[]) => {
        setData(res)
      })
  }, [])

  const handleClickAllProducts = () => {
    getAllProducts()
      .then((res: any[]) => {
        setData(res)
      })
    setState('')
  }
  return (
    <div>
      <Heater />
      {/* <CategoryList /> */}
      <div className="container">
        <div className=" py-4">
          <span
            className=" cursor-pointer"
            onClick={handleClickAllProducts}
          >所有商品</span>
          {state.length > 1 && <span>{' > ' + state}</span>}
        </div>
        <div>
          <ul className=" flex overflow-hidden flex-wrap transition duration-500">
            {data?.map(dp =>
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
              />
            )}
          </ul>

        </div>

      </div>
      <Footer />
    </div>
  )
}
export default PathSPage