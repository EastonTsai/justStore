import { dummyCategoryList } from "dummyData/dummyDate"
import arrowLeft from "files/icons/arrow-left.svg"
import arrowRight from "files/icons/arrow-right.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CategoryList = (props: { categoryList: string[] }) => {
  const { categoryList } = props
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)


  return (
    <div className=" container pt-2  ">
      <ul
        className=" flex flex-wrap gap-y-2 overflow-hidden transition duration-500b"
        style={{ maxHeight: `${open ? '100%' : '46px'}` }}
      >
        {
          categoryList?.map(cl =>
            <li
              key={cl}
              className=" shrink-0 w-1/2 px-2 sm:w-1/3 md:w-1/4">
              <div
                onClick={() => navigate('/paths', { state: cl })}
                className=" text-xl text-center font-bold py-2 bg-blue-50 cursor-pointer hover:bg-blue-200">
                {cl}
              </div>
            </li>
          )
        }
      </ul>
      <div className=" flex justify-end">
        <span
          className=" text-right py-1 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {!open ? '... 更多分類' : '... 收合'}
        </span>
      </div>
    </div>
  )
}
export default CategoryList