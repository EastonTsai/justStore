import CategoryList from "components/CategoryList"
import Footer from "components/Footer"
import Heater from "components/Heater"
import HomePageSection from "components/HomePageSection"
import ImageCarousel from "components/ImageCarousel"
import { UserDate } from "context/UserDate"

import { dummyHomePageBanner, dummyProduct } from "dummyData/dummyDate"
import { checkToken, getProduct } from "method/firebase"
import { getHomePageData } from "method/server"
import { useEffect, useContext, useRef, useState } from "react"

const HomePage = () => {
  const userDate = useContext(UserDate)
  let loadTimes = useRef(false)
  const [sections, setSections] = useState<any[]>([])
  const [categoryList, setCategoryList] = useState<string[]>([])
  useEffect(() => {
    if (!loadTimes.current) {
      loadTimes.current = true
      return
    }
    if (userDate.userId !== '') { return }
    const expirationTime = localStorage.getItem('expirationTime')
    if (expirationTime) {
      const id = checkToken(expirationTime)
      if (id) {
        userDate.userId = id
      }
    }
  }, [])
  useEffect(() => {
    getHomePageData()
      .then((res) => {
        setCategoryList(res.pathList)
        setSections(res.sections)
      })
  }, [])

  return (
    <div>
      <Heater />
      <div className=" container">
        <ImageCarousel images={dummyHomePageBanner} />
      </div>
      <CategoryList categoryList={categoryList} />
      {sections.map(st =>
        <HomePageSection
          key={st.title}
          title={st.title}
          data={st.list}
        />

      )}
      <Footer />
    </div>
  )
}
export default HomePage