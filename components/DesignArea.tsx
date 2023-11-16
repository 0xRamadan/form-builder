"use client"

import DesignDropArea from "./DesignDropArea"
import DesignSidebarArea from "./DesignSidebarArea"

const DesignArea = () => {
  return (
    <div className="flex w-full h-full">
      <DesignDropArea/>
      <DesignSidebarArea/>
    </div>
  )
}

export default DesignArea