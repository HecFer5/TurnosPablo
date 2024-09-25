import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4


};


export default function ModalTurnos({ values }) {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    //////////////traer la tabla
    const [registros, setRegistros] = useState([])

    /////////////////////////////
    const ListarTareas = async () =>
        await axios.get('http://localhost:4000/tarea').then((response) => {
            const data = response.data
            setRegistros(data)
        })

    useEffect(() => {
        ListarTareas()
    }, [])



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
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead
                                            className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                            <tr>
                                                <th scope="col" className="px-6 py-4"></th>
                                                <th scope="col" className="px-6 py-4">NOMBRE</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {registros.map(registro => (
                                                <tr key={registro.idpaciente} className="border-e-4 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                    <td >

                                                    </td>
                                                    <td >
                                                        <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/turno/' + registro.idpaciente} >Turno</Link></li>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">{`${registro.apellido}, ${registro.nombre}`}</td>
                                                    {/* <td className="whitespace-nowrap px-6 py-4">{registro.telefono}</td> */}

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                    </div>
                    <button className="block bg-red-700 px-2 py-1 text-white w-min rounded-md ml-auto mt-2"><Link to={'/'}>Cancelar</Link></button>
                </Box>
            </Modal>
        </div>
    );
}
