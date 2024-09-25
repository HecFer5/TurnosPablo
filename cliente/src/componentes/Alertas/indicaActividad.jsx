import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



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


export default function HacerActividad() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const duration = 400; // Duración en milisegundos (3 segundos en este ejemplo)


  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      navigate('/turno')

    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" >
      <Box sx={style}>
        {<li className="block bg-blue-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md">INDIQUE FECHA Y HORA EN EL CALENDARIO</li>}
      </Box>
    </Modal>
  );
}
