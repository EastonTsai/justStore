import { useContext, useState, useEffect, useRef } from "react"
import { InputItem } from "./FormItems"
import { ProductDate } from "context/ProductContext"
import { addProduct, getPaths, getProduct, upLoadImages, setPaths } from "method/firebase"
import { checkProductData } from "method/checkProductData"

const AdminPath = (
  props: {
    files: FileList | null,
  }
) => {
  const productDate = useContext(ProductDate)
  const [newPath, setNewPath] = useState('')
  const [pathList, setPathList] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const pathsRef = useRef('')
  productDate.paths = selected

  useEffect(() => {
    (async () => {
      const res = await getPaths()
      if (res) {
        pathsRef.current = res.id
        setPathList(res.list)
      }
    })()
  }, [])
  const handleAddNewPath = () => {
    if (newPath.trim().length >= 1 && !pathList.includes(newPath)) {
      setPaths(pathsRef.current, [...pathList, newPath])
      setPathList([...pathList, newPath])
      setNewPath('')
    }
  }
  const handleSelected = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(select => item !== select))
    } else {
      setSelected([item, ...selected])
    }
  }

  const handleSubmit = async () => {
    if (!checkProductData(productDate)) {
      alert('輸入資料有誤！')
      return
    }
    const files = props.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const url = await upLoadImages(files[i])
        if (url) {
          productDate.images.push(url)
        }
      }
    }
    const loaded = await addProduct(productDate)
    if (loaded === 'success') {
      alert('新增完成')
      window.location.reload()
    }
  }

  return (
    <div className=" h-full flex flex-col">
      <div className=" grow p-4 flex gap-x-4">
        <div className=" flex-1 border-black flex flex-col gap-y-2">
          <p className=" font-bold text-xl py-2 text-center ">分類列表</p>
          <div className=" flex items-center ">
            <InputItem
              placeholder="請輸入要新增的分類"
              value={newPath}
              onChange={(value) => setNewPath(value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNewPath()}
            />
            <p
              onClick={handleAddNewPath}
              className=" shrink-0 px-2 cursor-pointer text-[1.25rem] hover:font-bold">新增</p>
          </div>
          <ul className=" grow max-h-[400px] border border-black p-2 overflow-y-scroll">
            {
              pathList.map(item =>
                <li
                  key={item}
                  className=" flex items-center gap-x-2 py-1 border-b"
                >
                  <input
                    type="checkbox"
                    onClick={() => handleSelected(item)}
                    className=" "
                  />
                  <p>{item}</p>
                </li>)
            }
          </ul>
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className=" bg-gray-400 py-2 flex justify-center items-center hover:bg-gray-300 duration-300 group">
        <div className=" text-3xl font-bold text-white group-hover:text-black  duration-300"
        >完成</div>
      </div>
    </div>
  )
}
export default AdminPath