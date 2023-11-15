import { ReactNode } from "react"

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex flex-grow mx-auto w-full h-screen">{children}</div>
  )
}

export default layout