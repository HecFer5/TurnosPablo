import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate} from 'react-router-dom'




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
  const params = useParams()
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const duration = 400;

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      navigate('/turno')

    }, duration);

    return () => clearTimeout(timer);
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
        <Box sx={style}>
          
          <div className='text-xl font-bold uppercase text-center '>El registro fue eliminado</div>
        </Box>
      </Modal>
    </div>
  );
}
