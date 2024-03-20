import AdminLoadImage from "components/AdminLoadImage"
import AdminSpecification from "components/AdminSpecification"
import AdminPath from "components/AdminPath"
import AdminOptionButton from "components/AdminOptionButton"
import { useState } from "react"
import AdminSectionStyle from "components/AdminSectionStyle"
import ProductContext from "context/ProductContext"

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState('上傳圖片')
  const [files, setFiles] = useState<FileList | null>(null)
  const [images, setImages] = useState<string[]>([])

  return (
    <div className=" container h-screen py-8">
      <div className=" flex h-full border border-black rounded-[.5rem] overflow-hidden ">
        <div className=" flex flex-col">
          <AdminOptionButton
            text="上傳圖片"
            onClick={(text) => setCurrentPage(text)}
            current={currentPage === '上傳圖片' ? true : false}
          />
          <AdminOptionButton
            text="商品規格"
            onClick={(text) => setCurrentPage(text)}
            current={currentPage === '商品規格' ? true : false}
          />
          <AdminOptionButton
            text="商品路徑"
            onClick={(text) => setCurrentPage(text)}
            current={currentPage === '商品路徑' ? true : false}
          />
        </div>
        <ProductContext>
          <div className=" grow h-full">
            <AdminSectionStyle current={currentPage === "上傳圖片" && true}>
              <AdminLoadImage
                onChange={setFiles}
                images={images}
                setImages={setImages}
              />
            </AdminSectionStyle>
            <AdminSectionStyle current={currentPage === "商品規格" && true}>
              <AdminSpecification />
            </AdminSectionStyle>
            <AdminSectionStyle current={currentPage === "商品路徑" && true}>
              <AdminPath
                files={files}
              />
            </AdminSectionStyle>
          </div>
        </ProductContext>
      </div>
    </div>
  )
}
export default AdminPage  