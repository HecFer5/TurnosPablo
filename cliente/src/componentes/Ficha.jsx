import { useEffect, useState } from 'react'
import { useTareas } from '../componentes/context/hooks'
import { useParams, Link } from 'react-router-dom'
import dayjs from 'dayjs';
import esLocale from 'dayjs/locale/es';
import updateLocale from 'dayjs/plugin/updateLocale'

const Ficha = () => {

  const { editarRegisto } = useTareas()
  const [task, setTask] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    calle: "",
    numero: 0,
    patologia: "",
    patasoc: "",
    fechacirugia: "",
    nombremutual: "", 
    afiliado: ""
  })

  const params = useParams()

  useEffect(() => {
    const traerTarea = async () => {
      if (params.idpaciente) {
        const task = await editarRegisto(params.idpaciente)
        setTask({
          nombre: task.nombre,
          apellido: task.apellido,
          telefono: task.telefono,
          imagen: task.imagen,
          calle: task.calle,
          numero: task.numero,
          patologia: task.patologia,
          patasoc: task.patasoc,
          fechacirugia: task.fechacirugia,
          nombremutual: task.nombremutual,
          afiliado: task.afiliado
        })

        let formatoFecha = '';

        if (task.fechacirugia < '1900-11-30T04:16:48.000') {
        } else {
          formatoFecha = dayjs(task.fechacirugia).format('DD-MM-YYYY');
        }

        // Actualizar el estado de formatoFecha
        setTask(prevTask => ({
          ...prevTask,
          formatoFecha: formatoFecha
        }));
      }
    }
    traerTarea()
  }, [])

  return (
    <div className='justify-center flex'>
      <div className="w-96 md:max-w-sm bg-white border border-gray-700 rounded shadow p-5 mt-14">
        <div className=" ">{`Número de orden: ${params.idpaciente}`}</div>
        <div className=" ">{`Nombre: ${task.nombre}`}</div>
        <div className="">{`Apellido: ${task.apellido}`}</div>
        <div className="col border mt-1">{`Dirección: ${task.calle} ${task.numero}`}</div>
        <div className="col border mt-1 bg-orange-200 p-1 rounded-md">{`telefonos: ${task.telefono}`}</div>
        <div className="col border mt-1">{`Patologías: ${task.patologia}`}</div>
        <div className="col border mt-1">{`Patologías Asociadas: ${task.patasoc}`}</div>
        <div className="col border mt-1">{`Fecha cirugía: ${task.formatoFecha}`}</div>
        <div className="col border mt-1">{`Mutual: ${task.nombremutual}`}</div>
        <div className="col border mt-1">{`Nº afiliado: ${task.afiliado}`}</div>
        <div className='flex'>
        <li className="block bg-green-700 mt-3 px-2 py-1 text-white text-center rounded-md w-full mr-14"><Link to={'/vistahistoria/' + params.idpaciente } >Ver historia</Link></li>
        <li className="block bg-blue-700 mt-3 px-2 py-1 text-white text-center rounded-md w-full"><Link to={'/tabla/'} >Volver</Link></li>
        </div>
      </div>
    </div>

  )
}

export default Ficha