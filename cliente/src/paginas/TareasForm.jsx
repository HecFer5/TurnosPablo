import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useTareas } from '../componentes/context/hooks'
import { useParams, useNavigate } from 'react-router-dom'



const TareasForm = () => {

  const { crearRegistro, editarRegisto, modificaRegistro } = useTareas()
  const [task, setTask] = useState({
    nombre: "",
    apellido: "",
    telefono: "54223",
    calle: "",
    numero: 0,
    patologia: "",
    patasoc: "",
    fechacirugia: "",
    mutualid: 0,
    afiliado: "",
    imagen: "",
  })


  const params = useParams()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefalut()
  }

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
          mutualid: task.mutualid,
          afiliado: task.afiliado,
          idpaciente: task.idepaciente,
        })
      }
    }
    traerTarea()
    console.log('viendo', params.idpaciente)
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/mutual/');
        const data = await response.json();
        setDropdownOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [dropdownOptions, setDropdownOptions] = useState([]);



  const Salir = () => {
    navigate('/tabla')
  }


  const validate = (values) => {

    const errors = {};

    if (!values.nombre) {
      errors.nombre = "El nombre es obligatorio";
    }

    if (!values.apellido) {
      errors.apellido = "El apellido es obligatorio";
    }

    if (!values.mutualid) {
      console.log('no funciona')
      errors.mutualid = "Tiene que elegir una mutual";
      alert(errors[error]);

    }

    // for (var error in errors) {
    // }
    // return errors;
  };

  // document.getElementById('yourFormId').addEventListener('submit', handleSubmit);


  return (
    <div>

      <h1 className="text-xl font-bold uppercase text-center mt-5">{params.idpaciente ? 'Editar datos de un paciente' : 'Ingresar un nuevo paciente'}</h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values)
          if (params.idpaciente) {
            await modificaRegistro(params.idpaciente, values)
            navigate('/tabla')
          } else {
            await crearRegistro(values)
            navigate(`/otroReg`)
            console.log(values)
          }
          setTask({
            nombre: "",
            apellido: "",
            telefono: "",
            calle: "",
            numero: 0,
            patologia: "",
            patasoc: "",
            fechacirugia: "",
            mutualid: 0,
            afiliado: "",
            imagen: "",
          })
        }}
      >

        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-2xl rounded-md p-8 mx-auto  mt-10 ">
            <div className='flex'>
              <label className="block">Nombre</label>
              <input className="px-2 py-1 rounded-sm w-full ml-5" required type="text"
                name='nombre'
                onChange={handleChange}
                placeholder='Campo obligatorio'
                value={values.nombre} />
              <label className="block ml-5">Apellido</label>
              <input className="px-2 py-1 rounded-sm w-full ml-5" required type="text"
                name='apellido'
                onChange={handleChange}
                placeholder='Obligatorio'
                value={values.apellido} />
            </div>

            <label className="block">Teléfono</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='telefono'
              onChange={handleChange}
              value={values.telefono} placeholder='Opcional' />
            <div className='flex mt-5'>
              <label className="block">Calle</label>
              <input className="px-2 py-1 rounded-sm w-full ml-5" type="text"
                name='calle'
                onChange={handleChange}
                value={values.calle} placeholder='Opcional' />
              <label className="block ml-5">Número</label>
              <input className="px-2 py-1 rounded-sm w-full ml-5" type="text"
                name='numero'
                onChange={handleChange}
                value={values.numero} placeholder='Opcional' />
            </div>
            <label className="block">Patologías</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='patologia'
              onChange={handleChange}
              value={values.patologia} placeholder='Opcional' />
            <label className="block">Patologías asociadas</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='patasoc'
              onChange={handleChange}
              value={values.patasoc} placeholder='Opcional' />
            <label className="block">Fecha de cirugía</label>
            <input className="px-2 py-1 rounded-sm w-full" type="date"
              name='fechacirugia'
              onChange={handleChange}
              value={values.fechacirugia} placeholder='Opcional' />
            <div className='border-black'>
              <div className='flex mt-4' style={{ justifyContent: 'space-between' }}>
                <label className="block">Mutual</label>
                <label className={` ${values.mutualid !== '2' && values.mutualid !== 0 ? '' : 'hidden'}`}>Nº afiliado: </label>
              </div>
              <div className='flex mt-1' style={{ justifyContent: 'space-between' }}>
                <select
                  name='mutualid'
                  onChange={handleChange}
                  value={values.mutualid}
                  required
                >
                  <option value=''>Selecciona una opción</option>

                  {dropdownOptions.map(option => (
                    <option key={option.idmutual} value={option.idmutual}>{option.nombremutual}</option>
                  ))}
                </select>
                <input
                  className={`px-2 py-1 rounded-sm w-full ${values.mutualid !== '2' && values.mutualid !== 0 ? '' : 'hidden'}`}
                  style={{ maxWidth: '250px' }}
                  type="text"
                  name="afiliado"
                  onChange={handleChange}
                  value={values.afiliado}
                />
              </div>
            </div>
            <div className='flex'>

              <button type='submit' disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4">
                {isSubmitting ? "Guardando" : "Guardar"}</button>
              <button className="block bg-red-500 px-2 py-1 text-white w-full rounded-md mt-4 ml-6" onClick={Salir}>Cancelar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>

  )
}

export default TareasForm