import axios from 'axios'
import { isPromise } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useTareas } from "../componentes/context/hooks"


const TablaInactivos = () => {

    const [registros, setRegistros] = useState([])
    const [open, setOpen] = useState(false)
    const [abierto, setAbierto] = useState(false)
    const xLink = 'md:ml-8 md:my-0 my-7 font-semibold'
    const navigate = useNavigate()
    const { RegistroRehabilitado } = useTareas()

    const ListarInactivos = async () =>
        await axios.get('http://localhost:4000/inac').then((response) => {
            const data = response.data
            setRegistros(data)
        })

    useEffect(() => {
        ListarInactivos()
    }, [])

    const irAlerta = (idpaciente) => {
        const refEstatus = 0
        navigate('/borrar/' + idpaciente, { state: { refEstatus } })
    }

    const Rehabilita = (idpaciente) => {
        const refEstatus = 2
        navigate('/borrar/' + idpaciente, { state: { refEstatus } })

    }

    // console.log(registros)
    return (
        <>
             <div className=" flex justify-between">
                <div className='text-2xl text-white text-center font-bold bg-red-500
                 mb-10  max-w-md px-4 py-2 mt-7 ml-5'>PACIENTES SIN ACTIVIDAD</div>
                {/* <div className='text-xl text-black text-center font-bold
                 mb-10  max-w-md   py-2 mt-7'>Buscar por apellido</div>
                <input  // <-- campo de entrada para búsqueda
                    type="text"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar..."
                    className='block  mr-0 mt-10 mb-14 border border-black pl-10' /> */}
                <div className='text-sm text-black text-center font-bold
                 mb-10  max-w-md mx-4 px-4 py-2 mt-7'>Click sobre el número para ver la ficha completa y click en "Editar" para correcciones</div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4"></th>
                                        <th scope="col" className="px-6 py-4">Nº</th>
                                        <th scope="col" className="px-6 py-4">NOMBRE</th>
                                        <th scope="col" className="px-6 py-4">TELEFONO</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {registros.map(registro => (
                                        registro.idpaciente !== 33 && (
                                            <tr key={registro.idpaciente} className="border-e-4 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                <td >
                                                    <button className="block bg-blue-700 px-7 py-1 text-white w-min rounded-md font-semibold ml-5" onClick={() => Rehabilita(registro.idpaciente)}>Rehabilitar</button>
                                                    {/* <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/turno/' + registro.idpaciente} >Rehabilitar</Link></li> */}
                                                </td>
                                                <td >
                                                    <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/ficha/' + registro.idpaciente} >{registro.idpaciente}</Link></li>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 font-bold ">{`${registro.apellido}, ${registro.nombre}`}</td>
                                                <td className="whitespace-nowrap px-6 py-4 font-bold">{registro.telefono}</td>

                                                <td>

                                                    <li className="block bg-lime-700 px-5 py-1 text-white w-min rounded-md"><Link to={'/edit/' + registro.idpaciente} >Editar</Link></li>
                                                </td>
                                                <td>
                                                    <button className="block bg-red-700 px-5 py-1 text-white w-min rounded-md" onClick={() => irAlerta(registro.idpaciente)}>Borrar</button>
                                                </td>
                                            </tr>
                                        )
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default TablaInactivos