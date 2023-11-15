import { ReactNode } from "react"
import NavBar from "./navbar"


const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <NavBar/>
            <main>{children}</main>
        </div>

    )
}

export default Layout