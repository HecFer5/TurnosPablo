import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { useTareas } from "../context/hooks"
import axios from "axios";
import dayjs from 'dayjs';




// console.log(params.idpaciente, 'verturno')

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

export default function verTurno() {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const { borrarTarea } = useTareas()
    const params = useParams()
    const location = useLocation();
    const turnoEspecifico = location.state.turnoEspecifico

    console.log(turnoEspecifico, 'en verturno')

    // const Eleccion = ()=>{
    //   switch (refEstatus) {
    //     case 1:
    //       borrarTarea(params.idpaciente);
    //       navigate('/tabla')
    //       break;
    //     case 2:
    //       console.log(refEstatus, 'ff');
    //       volver(params.idpaciente);
    //       navigate('/tablainac')
    //       break;
    //     case 0:
    //       eliminar(params.idpaciente);
    //       navigate('/tablainac')
    //       break;
    //   }

    //}

    // let textoTitulo =''

    //   if (refEstatus === 1) {
    //      textoTitulo = `¡Se va a borrar el registro nº ${params.idpaciente}!`
    //   } else if (refEstatus === 2) {
    //      textoTitulo = `¡Se va a reincorporar el registro nº ${params.idpaciente}!`
    //   } else {
    //      textoTitulo = `¡Se va a borrar DEFINITIVAMENTE el registro nº ${params.idpaciente}!`
    //   }
    // console.log(textoTitulo, refEstatus )

    let title;
    if (turnoEspecifico.nombre != 'ACTIVIDAD') {
        title = `TURNO`;
    } else {
        title = 'ACTIVIDAD';
    }

    if (turnoEspecifico.observac === "") {
        title = title
    } else {
        title = title + ' (' + turnoEspecifico.observac + ')'
    }

    if (turnoEspecifico.cantidad === 0 && turnoEspecifico.usadas > 0 && turnoEspecifico.tanda === 0 && turnoEspecifico.estado === 2) {
        title = title + ` (particular ${turnoEspecifico.usadas}º VISITA)`
    }

    if (turnoEspecifico.cantidad > 0 && turnoEspecifico.usadas > 0 && turnoEspecifico.tanda > 0 && turnoEspecifico.estado === 0) {
        title =  ` ${turnoEspecifico.usadas}º TURNO DE ${turnoEspecifico.cantidad} SESIONES`
    }

    if ((turnoEspecifico.cantidad === 0 || turnoEspecifico.cantidad === null) && (turnoEspecifico.usadas === 0 || turnoEspecifico.usadas === null) && (turnoEspecifico.tanda === 0 || turnoEspecifico.tanda === null) && turnoEspecifico.estado === 0) {
        title = title + ` sin sesión asignada`
    }


 const  hora1 = dayjs(turnoEspecifico.fecha).format('DD [de] MMMM [a las] HH:mm');

    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" >
            <Box sx={style}>
            <div className='text-xm black font-bold uppercase text-left '>{`${turnoEspecifico.nombre} ${turnoEspecifico.apellido}`}</div>
                <div className='text-xm black font-bold uppercase text-left mt-3'>{hora1}</div>
           
                <div className='text-xm black font-bold uppercase text-left mt-3 '>{title}</div>
   
                {<li className="block bg-blue-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md"><Link to={'/turno/'} >Volver</Link></li>}
            </Box>
        </Modal>

    );
}