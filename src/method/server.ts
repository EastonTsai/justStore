import { getProduct } from "./firebase"

export const getHomePageData = async () => {
  const productList: any[] = await getProduct('products')
  const pathList = await getProduct('paths')
  const paths: string[] = pathList[0].list
  const pathOne = paths[0]
  const pathTwo = paths[1]
  const pathThree = paths[2]
  const sort = productList.sort((a: any, b: any) => b.created - a.created)
  const newProducts = sort.filter((sr: any, index: number) => index <= 4)
  const sectionOne = sort.filter(sr => sr.paths.includes(pathOne))
  const sectionTwo = sort.filter(sr => sr.paths.includes(pathTwo))
  const sectionThree = sort.filter(sr => sr.paths.includes(pathThree))
  const data = {
    pathList: paths,
    sections: [
      {
        title: '最新商品',
        list: newProducts
      },
      {
        title: pathOne,
        list: sectionOne
      },
      {
        title: pathTwo,
        list: sectionTwo
      },
      {
        title: pathThree,
        list: sectionThree
      },
    ]
  }
  return data
}

export const getCategoryProduct = async (category: string) => {
  const list: any[] = await getProduct('products')
  const res = list.filter(item => item.paths.includes(category))
  return res
}

export const getAllProducts = async () => {
  const list = await getProduct('products')
  list.sort((a: any, b: any) => b.created - a.created)
  return list
}
export const getOneProduct = async (id: string) => {
  const list = await getProduct('products')
  const res = list.find((item: any) => item.id === id)
  return res
}