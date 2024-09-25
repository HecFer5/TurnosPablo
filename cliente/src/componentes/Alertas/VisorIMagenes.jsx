import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function VisorImagenes() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const location = useLocation();
  const imagen = new URLSearchParams(location.search).get('imagen');
  const descripcion = location.state.descripcion; // Acceder a 'descripcion' desde el estado
  console.log(descripcion)
  const handleRetorno = () => {
    navigate(-1); // Esto llevará de vuelta a la pantalla anterior
  };

  const irAtras = () =>{
    
  }
  return (

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={style}>
        {/* <div className='text-xm text-red-700 font-bold uppercase text-center '>
          <button onClick={handleRetorno} className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center">Si</button></div> */}
        <div className='flex'>
          <div className='text-5xl ml-20 mt-4' onClick={irAtras}>{<FaAngleDoubleLeft />}</div>
          <div onClick={handleRetorno} className='text-4xl mt-1 ml-4 mt-6' >{<FaCircle />}</div>
          <div className='text-5xl ml-4 mt-4 mb-5'>{<FaAngleDoubleRight />}</div>
        </div>
        <h2>{descripcion}</h2>

        {/* Mostrar 'descripcion' en el componente */}
        <img className="object-cover  w-full mt-12" src={imagen} alt="Descripción de la imagen" />

      </Box>
    </Modal>
  );
}
