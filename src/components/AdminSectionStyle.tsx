import { ReactNode } from "react"

const AdminSectionStyle = (props: {
  children: ReactNode
  current: boolean
}) => {
  const { children, current } = props
  return (
    <div
      className=" h-full"
      style={!current ? { display: 'none' } : {}}
    >
      <div className=" h-full  border-black">
        {children}
      </div>
    </div>
  )
}
export default AdminSectionStyle