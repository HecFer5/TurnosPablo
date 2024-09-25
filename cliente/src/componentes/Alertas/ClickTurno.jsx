import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useTareas } from '../context/hooks'
import dayjs from 'dayjs';
import axios from "axios";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function TurnoNuevoDirecto() {


  const navigate = useNavigate()
  const [valor, setValor] = useState('');
  const params = useParams()
  const location = useLocation();
  const taskData = location.state;
  const start = location.state.start;
  const datosTabla = location.state.datosTabla

  // console.log(location.state, 'comienzo')

  // const [task, setTask] = useState({
  //   nombre: "",
  //   apellido: "",
  //   observac: "",
  //   tanda: "",
  //   usadas: "",
  //   cantidad: 0,
  //   estado: 0

  // })


  // const start = '2024:03:05 11:00:00'
  const handleChange = (event) => {
    setValor(event.target.value);
  };


  const [valores, setValores] = useState({
    fecha: '',
    fechafin: '',
    idpaciente: '',
    observac: '',
    cantidad: 0,
    usadas: 0,
    tanda: 0

  });


  const [tabla, setTabla] = useState({
    cantidad: 0
  })





  const handleEnviarDatos = async () => {

    // console.log('DA UN TURNO', params.idpaciente, taskData)
    console.log('taskdata',taskData, 'valores', valores)

    const originalDate = dayjs(start);
    const newDate = originalDate.add(30, 'minute');

    valores.fecha = dayjs(start).format('YYYY-MM-DD HH:mm:ss');
    valores.fechafin = newDate.format('YYYY-MM-DD HH:mm:ss');

    valores.idpaciente = params.idpaciente
    valores.observac = valor
    valores.tanda = taskData.tanda
    if (taskData.estado !=1){
      valores.usadas = taskData.usadas + 1
    }else{
      valores.usadas = 0
    }
    
    valores.cantidad = taskData.cantidad
    if (taskData.mutualid != 2){
      valores.estado = 0
    }else{
      valores.estado = 2
    }
    

    const response = await axios.post("http://localhost:4000/turno/", valores);

    if (response.status === 200) {
      console.log('Los datos se enviaron correctamente');
      navigate('/turno')
    } else {
      console.log('Hubo un error al enviar los datos');
    }

  };


  const handleEnviActividad = async () => {

    // console.log('DA UNA ACTIVIDAD')

    const originalDate = dayjs(start);
    const newDate = originalDate.add(30, 'minute');
    valores.fecha = dayjs(start).format('YYYY-MM-DD HH:mm:ss');
    valores.fechafin = newDate.format('YYYY-MM-DD HH:mm:ss');
    valores.idpaciente = 33
    valores.observac = valor

    const response = await axios.post("http://localhost:4000/turno/", valores);

    if (response.status === 200) {
      console.log('Los datos se enviaron correctamente');
      navigate('/turno')
    } else {
      console.log('Hubo un error al enviar los datos');
    }

  };

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <div className='text-xl font-bold uppercase text-center '>
            {params.idpaciente ? `¿turno para ${location.state.nombre} ${location.state.apellido} el ${dayjs(start).format('DD [de] MMMM [de ]YYYY [a las] HH:mm:ss')}?` : 'INGRESE LA ACTIVIDAD A REALIZAR'}
          </div>

          <input
            className="px-16 py-1 rounded-sm w-full border-solid mt-8"
            type="text"
            name='nombre'
            onChange={handleChange}
            placeholder='Ingrese un comentario'
            autoFocus
          />

          <div>
            <div style={{ display: 'flex', marginTop: 22 }}>
              <button className="block bg-blue-700 px-2 py-1 mb-4 mt-4 mr-8 text-white rounded-md w-full text-center" onClick={params.idpaciente ? handleEnviarDatos : handleEnviActividad}>Si</button>
              <button className="block bg-red-700 px-2 py-1 mb-4 mt-4 ml-8 text-white rounded-md w-full text-center "><Link to={'/turno/'} >No</Link></button>
            </div>
          </div>
        </Box>

      </Modal>
    </div>
  );
}