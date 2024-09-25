import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Alert, AlertTitle } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'



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


export default function Alerta() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const params = useParams()
  console.log(params.idpaciente)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" >
      <Box sx={style}>
        {<li className="block bg-red-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md"><Link to={`/turno/${params.idpaciente}`} >Ese turno ya no está disponible</Link></li>}
      </Box>
    </Modal>
  );
}
