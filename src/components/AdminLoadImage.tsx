import { loadImage } from "method/loadImage"

const AdminLoadImage = (
  props: {
    onChange: (fileList: FileList) => void,
    images: string[],
    setImages: (images: string[]) => void,
  }
) => {
  const { onChange, images, setImages } = props

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList) {
      onChange(fileList)
      const newList: string[] = []
      for (let i = 0; i < fileList.length; i++) {
        const src = await loadImage(fileList[i])
        newList.push(src)
      }
      setImages(newList)
    }
  }
  return (
    <div className=" flex flex-col">
      <div className=" shrink-0 mb-2 py-2 bg-gray-100 hover:bg-orange-300 duration-300">
        <label htmlFor="addButton">
          <input type="file" multiple id="addButton" className=" hidden" onChange={handleAddImage} />
          <div className=" text-center py-1 text-[1.5rem] font-bold cursor-pointer ">新增+</div>
        </label>
      </div>
      <ul className="flex flex-wrap ">
        {images.map((img, index) =>
          <li key={index} className=" w-1/3 md:w-1/4 aspect-square p-2 flex justify-center items-center">
            <img
              className=" max-w-full max-h-full"
              src={img} alt={img}
            />
          </li>
        )}
      </ul>
      <div>

      </div>
    </div>
  )
}
export default AdminLoadImage