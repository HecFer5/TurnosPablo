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





export default function AlertaTurno() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const params = useParams()


const eliminar = async (idturnos) => {
  const response = await axios.delete("http://localhost:4000/turno/" + params.idturnos);

};


return (

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby=" -modal-title"
      aria-describedby="modal-modal-description" >
      <Box sx={style}>
        <div className='text-xm text-red-700 font-bold uppercase text-center '>{`Se va a borra el turno Nº ${params.idturnos}`}</div>
        <div className="text-sm text-center font-bold mt-2 mb-3">¿Está seguro de continuar?</div>

        <button  className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center" onClick={()=>{eliminar(); navigate('/turno')}}>Si</button>
        {<button on onClick={() => navigate('/turno')} className="block bg-red-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md">NO</button>}
      </Box>
    </Modal>

  );
}
