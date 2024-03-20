import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import arrLeft from 'files/icons/arrow-left.svg'
import arrRight from 'files/icons/arrow-right.svg'
type imageObj =
  {
    image: string,
    path: string,
  }

const ImageCarousel = (props: { images: imageObj[] }) => {
  const { images } = props
  const [focus, setFocus] = useState(0)
  const [autoSwitch, setAutoSwitch] = useState(0)
  const setTimeoutId = useRef<NodeJS.Timer>()
  const focusColor = { opacity: '100' }
  const translateX = focus * 100
  const changeFocus = (click: boolean) => {
    const length = images.length - 1
    const current = focus
    if (click) {
      if (current < length) {
        setFocus(prev => prev + 1)
      } else {
        setFocus(0)
      }
    } else {
      if (current <= 0) {
        setFocus(length)
      } else {
        setFocus(prev => prev - 1)
      }
    }
  }
  const closeSwitch = () => {
    clearTimeout(setTimeoutId.current)
    setAutoSwitch(0)
  }
  const openSwitch = () => {
    setAutoSwitch(1)
  }
  useEffect(() => {
    if (autoSwitch >= 1) {
      const id = setTimeout(() => {
        changeFocus(true)
        setAutoSwitch(prev => prev + 1)
      }, 7000)
      setTimeoutId.current = id
    }
  }, [autoSwitch])
  useEffect(() => {
    if (autoSwitch === 0) {
      setAutoSwitch(1)
    }
  }, [])

  return (

    <div
      className=" relative"
      onMouseOver={closeSwitch}
      onMouseOut={openSwitch}
    >
      <div className=" overflow-hidden flex" >
        {
          images.map(obj =>
            <Link
              key={obj.image}
              to={obj.path}
              className='w-full shrink-0 transition duration-1000 align-top'
              style={{ transform: `translateX(-${translateX}%)` }}
            >
              <img src={obj.image} alt={obj.image} />
            </Link>
          )
        }
      </div>

      <div className=" absolute bottom-0 left-1/2 -translate-x-1/2 py-2 flex gap-4 justify-center">
        {
          images.map((obj, index) =>
            <div
              key={index}
              className=' w-8 h-2 rounded-md bg-white opacity-50 cursor-pointer'
              style={index === focus ? focusColor : {}}
              onClick={() => setFocus(index)}
            />

          )
        }
      </div>
      <div>
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[rgba(255,255,255,.5)] rounded-full hover:bg-[rgba(255,255,255,.8)] transition duration-300"
          onClick={() => changeFocus(false)}
        >
          <img src={arrLeft} alt={arrLeft} />
        </div>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[rgba(255,255,255,.5)] rounded-full hover:bg-[rgba(255,255,255,.8)] transition duration-300"
          onClick={() => changeFocus(true)}
        >
          <img src={arrRight} alt={arrRight} />
        </div>

      </div>
    </div>
  )
}
export default ImageCarousel

