import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '3px solid #000',
  boxShadow: 24,
  p: 4
};

const PacientesPorMutual = () => {
  const [registros, setRegistros] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState({ nombre: '', apellido: '', nombremutual:" " });
  const params = useParams();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const mutualid = params.idmutual
  const Navigate = useNavigate()

  const TraerPacientesMutual = async () => {
    try {
      const response = await axios.get("http://localhost:4000/pacientesmutuales/" + mutualid);

      const data = response.data;
      setRegistros(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    TraerPacientesMutual();
    console.log(params.idmutual)

  }, [params.idmutual]);

  console.log(registros.nombremutual)
  const registrosFiltrados = registros.filter(registro => registro.idpaciente !== 33);

  return (



    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" >

      <Box sx={style}>
        <table className="min-w-full text-left text-sm font-light">
  <caption className="text-xl font-bold mb-4">{registrosFiltrados.length > 0 ? `LISTADO DE PACIENTES DE ${registrosFiltrados[0].nombremutual}` : ''}</caption>
  <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
    <tr>
      <th scope="col" className="px-6 py-4">Nº</th>
      <th scope="col" className="px-6 py-4">NOMBRE</th>
      <th scope="col" className="px-6 py-4">BONOS</th>
      <th scope="col" className="px-6 py-4">TURNOS</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">
    {registrosFiltrados.map(registro => (
      <tr key={registro.idpaciente} className="border-e-4 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
        <td>
          <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/ficha/' + registro.idpaciente}>{registro.idpaciente}</Link></li>
        </td>
        <td className="whitespace-nowrap px-6 py-4">{`${registro.nombre} ${registro.apellido}`}</td>
        <td className="whitespace-nowrap px-6 py-4">{`${registro.cantidad}`}</td>
        <td className="whitespace-nowrap px-6 py-4">{`${registro.usadas}`}</td>
      
      </tr>
    ))}
  </tbody>
</table>

        <div className='mt-5 flex justify-center'>
          <button className="block bg-blue-700 px-2 py-1 text-white w-min rounded-md" onClick={() => Navigate('/tablamutuales')}>Cancelar</button>
        </div>
      </Box>
    </Modal>

  );
};

export default PacientesPorMutual;
