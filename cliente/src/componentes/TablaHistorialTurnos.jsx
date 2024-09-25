import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import esLocale from 'dayjs/locale/es'; // Importar el archivo de localización para español
import updateLocale from 'dayjs/plugin/updateLocale'


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

dayjs.extend(updateLocale);
dayjs.locale(esLocale);

dayjs.updateLocale('es', {
  weekStart: 0,
});

const TablaHisotiralTurnos = () => {

  const [registros, setRegistros] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState({ nombre: '', apellido: '', nombremutual: " " });
  const params = useParams();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const mutualid = params.idpaciente
  const Navigate = useNavigate()
  console.log(params.idpaciente)

  const TraerHistorialTurnos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/historialturnos/" + params.idpaciente);

      const data = response.data;
      setRegistros(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    TraerHistorialTurnos();
    console.log(params.idpaciente)

  }, [params.idpaciente]);

  const registrosFiltrados = registros.filter(registro => registro.idpaciente !== 33);


  return (



    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  <Box sx={{ ...style, maxHeight: '80vh', overflowY: 'auto' }} className="max-w-180vh">  
        <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <caption className={`text-xl font-bold mb-4 uppercase ${registrosFiltrados.length > 0 && registrosFiltrados[0].mutualid == 2 ? 'bg-yellow-200' : ''}`}>
            {registrosFiltrados.length > 0 ?
              `TURNOS DE ${registrosFiltrados[0].nombre} ${registrosFiltrados[0].apellido} ${registrosFiltrados[0].mutualid != 2 ? '' : 'particular'}`
              :
              ''}
          </caption>
  
          <tbody className="table-group-divider">
            {registros.map(registro => {
              const isPastDate = dayjs(registro.fecha).isBefore(dayjs()); // Verifica si la fecha es anterior a la fecha actual
              return (
                <tr key={registro.idpaciente} className={`border-e-4 ${isPastDate ? 'bg-red-200' : 'bg-neutral-100'} dark:border-neutral-500 dark:bg-neutral-700`}>
                  {
                    registro.fecha != null && (
                      registro.mutualid != 2 ? (
                        <>
                          {registro.cantidad > 0 && registro.estado === 0 ?
                            <>
                              <td className="whitespace-nowrap px-6 py-4 font-bold text-lg">{registro.usadas}/{registro.cantidad}</td>
                              <td className="whitespace-nowrap px-1 py-4 font-bold text-lg"></td>
                              <td className="whitespace-nowrap px-1 py-4 font-bold text-lg">{dayjs(registro.fecha).format('DD [de] MMMM [de] YYYY [a las] hh:mm ')}</td>
                              <td className="whitespace-nowrap px-2 py-4 font-bold text-lg">{registro.tanda}</td>
                            </> :
                            <>
                              <td className="whitespace-nowrap px-6 py-4 font-bold text-lg">s/sesiones</td>
                              <td className="whitespace-nowrap px-6 py-4 font-bold text-lg"></td>
                              <td className="whitespace-nowrap px-6 py-4 font-bold text-lg">{dayjs(registro.fecha).format('DD [de] MMMM [de] YYYY [a las] hh:mm ')}</td>
                              <td className="whitespace-nowrap px-6 py-4 font-bold text-lg">{registro.tanda}</td>
                            </>
                          }
                        </>
                      ) :
                        <>
                          <td className="whitespace-nowrap px-6 py-4 font-bold text-lg">{registro.usadas}</td>
                          <td className="whitespace-nowrap px-6 py-4 font-bold text-lg">{dayjs(registro.fecha).format('DD [de] MMMM [de] YYYY [a las] hh:mm ')}</td>
                        </>
                    )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  
      <div className='mt-5 flex justify-center'>
        <button className="block bg-blue-700 px-2 py-1 text-white w-min rounded-md" onClick={() => Navigate('/tabla')}>CERRAR</button>
      </div>
    </Box>
  </Modal>
  

  );
};

export default TablaHisotiralTurnos;
