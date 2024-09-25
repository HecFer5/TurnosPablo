import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTareas } from '../context/hooks';
import axios from 'axios';
import dayjs from 'dayjs';





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


export default function NuevoReg({ values }) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams()
  const [task, setTask] = useState(null)
  const { TraerUltimoPaciente } = useTareas()
  const [cantidad, setCantidad] = useState('');
  const navigate = useNavigate()
  const [valores, setValores] = useState({
    idpaciente: 0,
    cantidad: 0,
    tanda: 0,
    usadas: 0,
    estado: 0
  });
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    valores.idpaciente = data.idpaciente
    if (data.mutualid != 2) {
      if (cantidad > 0) {
        valores.cantidad = cantidad
        valores.usadas = 0
        valores.tanda = 1
        valores.estado = 0
      } else {
        valores.cantidad = 0
        valores.usadas = 0
        valores.tanda = 0
        valores.estado = 0
      }
    } else {
      valores.cantidad = 0
      valores.usadas = 0
      valores.tanda = 0
      valores.estado = 2
    }

    const response = await axios.post("http://localhost:4000/turno/", valores);

    if (response.status === 200) {
      console.log('Los datos se enviaron correctamente');
      navigate(`/turno/${data.idpaciente}`);
    } else {
      console.log('Hubo un error al enviar los datos');
    }

    // if (isTurnoDirecto === true) {
    //   navigate('/turno/' + data.idpaciente);
    // } else {
    //   navigate('/turno');
    // }

  };

  const soloIngreso = async (event) => {
    event.preventDefault();

    valores.idpaciente = data.idpaciente

    if (data.mutualid != 2) {
      if (cantidad > 0) {
        valores.cantidad = cantidad
        valores.usadas = 0
        valores.tanda = 1
        valores.estado = 0
        valores.observac = ''

      } else {
        valores.cantidad = 0
        valores.usadas = 0
        valores.tanda = 0
        valores.estado = 0
        valores.observac = ''

      }
    } else {
      valores.cantidad = 0
      valores.usadas = 0
      valores.tanda = 0
      valores.estado = 2
      valores.observac = ''

    }
    const response = await axios.post("http://localhost:4000/turno/", valores);

    if (response.status === 200) {
      console.log('Los datos se enviaron correctamente');
      navigate('/turno')
    } else {
      console.log('Hubo un error al enviar los datos');
    }

  }

  const atenderAhora = async (event) => {
    event.preventDefault();
    console.log(data, 'atender')
    const originalDate = dayjs();
    const newDate = originalDate.add(30, 'minute');

    valores.fecha = dayjs().format('YYYY-MM-DD HH:mm:ss');
    valores.fechafin = newDate.format('YYYY-MM-DD HH:mm:ss');
    valores.idpaciente = data.idpaciente

    if (data.mutualid != 2) {
      if (cantidad > 0) {
        valores.cantidad = cantidad
        valores.usadas = 1
        valores.tanda = 1
        valores.estado = 0
        valores.observac = ''
      } else {
        valores.cantidad = 0
        valores.usadas = 0
        valores.tanda = 0
        valores.estado = 0
        valores.observac = ''

      }
    } else {
      valores.cantidad = 0
      valores.usadas = 1
      valores.tanda = 0
      valores.estado = 2
      valores.observac = ''

    }
    const response = await axios.post("http://localhost:4000/turno/", valores);

    if (response.status === 200) {
      console.log('Los datos se enviaron correctamente');
      navigate('/turno')
    } else {
      console.log('Hubo un error al enviar los datos');
    }
    navigate(`/turno`)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/ultimo");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center">
          <div>
            <div className='text-xl font-bold uppercase text-center '>Se ha ingresado un nuevo paciente </div>
            <div className="text-sm text-center font-bold mt-2 mb-3 uppercase">¿Tiene sesiones asignadas? </div>

            <form onSubmit={handleSubmit}>
              {/* <label htmlFor="cantidad">Cantidad:</label> */}
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                autoFocus

              />




              <button className="block bg-blue-500 px-2 py-1 text-white w-full rounded-md mt-8 ml-22" onClick={atenderAhora}>Atender ahora</button>
              <button className="block bg-green-500 px-2 py-1 text-white w-full rounded-md mt-8 ml-22" onClick={handleSubmit}>Dar un turno</button>
              <button className="block bg-red-500 px-2 py-1 text-white w-full rounded-md mt-8 ml-22" onClick={soloIngreso}>Sólo ingreso</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
