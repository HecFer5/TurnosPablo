import { createContext, useContext } from 'react'
import {TareasContext} from './TareasContext'



export const useTareas = () => {
    const context = useContext(TareasContext)
    if (!context) {
        throw new Error("hay que usarlo en context")
    }
    return context
}