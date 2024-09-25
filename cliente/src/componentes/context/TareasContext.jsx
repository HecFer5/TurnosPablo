import { createContext, useContext, useState, useReducer } from 'react'
import {
    ListarTareas, BorrarTareas, CrearTareas, ListarUnaTarea, EditaTarea, ListarInactivos, CrearTurnos, ListarTurnos, EliminarRegistro, ListarMutuales, CrearMutuales, ListarPacientesMutual, CrearHistorialTurnos, ListarImagenes, CrearHistorias, EditaTareaSesion, ListarPacientes, ListarTurnosPaciente, ListarUltimoPaciente, ListarUnaMutual, EditaMutual} from '../../api/tareas.api'
import UserReducer from './UserReducer'
// import { editarMutual } from '../../../../server/controladores/tareas.controladores'
export const TareasContext = createContext()




export const TareasContextProv = ({ children }) => {
    const estadoInicial = {
        registro: [],
        registroSelec: null,
    }

    const [tareas, setTareas] = useState([])
    const [turnosPaciente, setTurnosPaciente] = useState([])
    const [varPac, setVarPac] = useState([])
    const [turnos, setTurnos] = useState([])
    const [mutuales, setMutuales] = useState([])
    const [state, dispatch] = useReducer(UserReducer, estadoInicial)
    const [imagen, setImagen] = useState([])
    const [historia, setHistoria] = useState([])
    const [sesiones, setSesiones] = useState([])

    async function TraerTurnos() {
        const respuesta = await ListarTurnos()
        setTurnos(respuesta.data)
    }

    async function TraerTareas() {
        const respuesta = await ListarTareas()
        setTareas(respuesta.data)
    }
    async function TraerUltimoPaciente() {
        const respuesta = await ListarUltimoPaciente()
        setTareas(respuesta.data)
    }

    async function TraerPacientes() {
        const respuesta = await ListarPacientes()
        setVarPac(respuesta.data)
    }

    async function TraerMutuales() {
        const respuesta = await ListarMutuales()
        setMutuales(respuesta.data)
    }


    const crearRegistro = async (tarea) => {
        try {
            const response = await CrearTareas(tarea)

        } catch (error) {
            console.error(error)
        }
    }


    const darTurno = async (turno) => {
        try {
            const response = await CrearTurnos(turno)

        } catch (error) {
            console.error(error)
        }
    }

    const listarBorrados = async () => {
        try {
            const respuesta = await ListarInactivos()
            setTareas(respuesta.data)
        } catch (error) {
            console.log(error)
        }
    }

    const borrarTarea = async (idpaciente) => {
        try {

            const respuesta = await BorrarTareas(idpaciente)

            setTareas(tareas.filter(tarea => tarea.idpaciente !== idpaciente))

        } catch (error) {
            console.log(error)
        }
    }

    const EliminarDelTodo = async (idpaciente) => {
        try {

            const respuesta = await EliminarRegistro(idpaciente)

            setTareas(tareas.filter(tarea => tarea.idpaciente !== idpaciente))

        } catch (error) {
            console.log(error)
        }
    }
    const editarRegisto = async (idpaciente) => {
        try {
            const respuesta = await ListarUnaTarea(idpaciente)
            setTareas(respuesta.data)
            return respuesta.data


        } catch (error) {
            console.log(error)
        }
    }




    const TraerTurnosPaciente = async (idpaciente) => {
        try {
            const respuesta = await ListarTurnosPaciente(idpaciente)
            setTurnosPaciente(respuesta.data)
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }

    const modificaRegistro = async (idpaciente, nuevosCampos) => {
        try {
            const respuesta = await EditaTarea(idpaciente, nuevosCampos)

            // console.log(respuesta)
        } catch (error) {
            console.log(error)
        }
    }

    // const traerSesion = async (tarea) => {
    //     try {
    //         const respuesta = await EditaSesion(tarea)
    //         setTareas(respuesta.data)
    //         return respuesta.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    const traerTareaSesion = async (tarea) => {
        try {
            const respuesta = await EditaTareaSesion(tarea)
            setTareas(respuesta.data)
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }

    const nuevaMutual = async (tarea) => {
        try {
            const response = await CrearMutuales(tarea)

        } catch (error) {
            console.error(error)
        }
    }


    const TraerPacientesMutual = async (tarea) => {
        try {
            const response = await ListarPacientesMutual(tarea)

        } catch (error) {
            console.error(error)
        }
    }


    const CambiaMutual = async (idmutual, values) => {
        try {
            const respuesta = await EditaMutual(idmutual, values)
            // setMutuales(respuesta.data)
            // return respuesta.data


        } catch (error) {
            console.log(error)
        }
    }

    const editaUnaMutual = async (idmutual) => {
        try {
            const respuesta = await ListarUnaMutual(idmutual)
            setMutuales(respuesta.data)
            return respuesta.data


        } catch (error) {
            console.log(error)
        }
    }

    const TraerHistorialTurnos = async (tarea) => {
        try {
            const response = await CrearHistorialTurnos(tarea)

        } catch (error) {
            console.error(error)
        }
    }




    const TraerImagenes = async (idpaciente) => {
        try {
            const response = await ListarImagenes(idpaciente)
            setImagen(response.data)
            return response.data

        } catch (error) {
            console.error(error)
        }
    }

    const CreandoHistoria = async (historia) => {
        try {
            const response = await CrearHistorias(historia)

        } catch (error) {
            console.error(error)
        }
    }



    return <TareasContext.Provider value={{
        registro: state.registro,
        registroSelec: state.registroSelec,
        datosTabla: state.datosTabla,
        tareas, TraerTareas, borrarTarea, crearRegistro, editarRegisto, modificaRegistro, listarBorrados, darTurno, TraerTurnos, EliminarDelTodo, TraerMutuales, nuevaMutual
        , TraerPacientesMutual, TraerHistorialTurnos, TraerImagenes, CreandoHistoria, traerTareaSesion, TraerPacientes, TraerUltimoPaciente, CambiaMutual, editaUnaMutual
    }}>
        {children}
    </TareasContext.Provider>
}