import { useState } from "react"

const PhotoFrame = (props:
  {
    images: string[]
  }) => {
  const { images } = props
  const [current, setCurrent] = useState(1)
  return (
    <div>
      <div className=" aspect-square bg-gray-200 flex justify-center items-center max-h-full max-w-full object-cover">
        <img src={images[current - 1]} />
      </div>
      <div className=" flex justify-start">
        {
          images.map((img, index) =>
            <div
              key={img}
              className=" w-1/4 aspect-square bg-black cursor-pointer"
              onClick={() => setCurrent(index + 1)}
            >
              <img className=" min-w-full min-h-full object-cover" src={img} />
            </div>
          )
        }
      </div>
    </div>
  )
}
export default PhotoFrame