import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { useTareas } from "../context/hooks"
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

const eliminar = async (idpaciente) => {
  const response = await axios.delete("http://localhost:4000/inac/" + idpaciente);

};

const volver = async (idpaciente) => {
  console.log('volver')
  const response = await axios.put("http://localhost:4000/inac/" + idpaciente);

};

export default function Alerta() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const { borrarTarea } = useTareas()
  const params = useParams()
  const location = useLocation();
  const refEstatus = location.state.refEstatus;
  console.log(params.idpaciente, refEstatus)

  

const Eleccion = ()=>{
  switch (refEstatus) {
    case 1:
      borrarTarea(params.idpaciente);
      navigate('/tabla')
      break;
    case 2:
      console.log(refEstatus, 'ff');
      volver(params.idpaciente);
      navigate('/tablainac')
      break;
    case 0:
      eliminar(params.idpaciente);
      navigate('/tablainac')
      break;
  }
  
}
 
let textoTitulo =''

  if (refEstatus === 1) {
     textoTitulo = `¡Se va a borrar el registro nº ${params.idpaciente}!`
  } else if (refEstatus === 2) {
     textoTitulo = `¡Se va a reincorporar el registro nº ${params.idpaciente}!`
  } else {
     textoTitulo = `¡Se va a borrar DEFINITIVAMENTE el registro nº ${params.idpaciente}!`
  }
console.log(textoTitulo, refEstatus )
return (

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" >
      <Box sx={style}>
        <div className='text-xm text-red-700 font-bold uppercase text-center '>{textoTitulo}</div>
        <div className="text-sm text-center font-bold mt-2 mb-3">¿Está seguro de continuar?</div>

        <button onClick={Eleccion} className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center">Si</button>

        {navigate('/tabla')}
        {<li className="block bg-red-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md"><Link to={'/tabla/'} >No</Link></li>}
      </Box>
    </Modal>

  );
}
