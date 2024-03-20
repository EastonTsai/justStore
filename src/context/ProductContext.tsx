
import { ReactNode, createContext } from "react";
const productDate: {
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
} = {
  title: '',
  introduce: '',
  transport: ['7-11', '全家', 'OK', '萊爾富', '郵局', '宅配'],
  price: '',
  images: []
}
export const ProductDate = createContext(productDate)

const ProductContext = (props: { children: ReactNode }) => {
  return (
    <ProductDate.Provider value={productDate}>
      {props.children}
    </ProductDate.Provider>
  )
}

export default ProductContext