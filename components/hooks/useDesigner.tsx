"use client"


import { useContext } from 'react'
import { DesignContext } from '../context/DesignerContext'

const useDesigner = () => {
    const context = useContext(DesignContext)
    if(!context){
        throw new Error("useDesigner must be used within a DesignerComponent.")
    }
  return context;
}

export default useDesigner