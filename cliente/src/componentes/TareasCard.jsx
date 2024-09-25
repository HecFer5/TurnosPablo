// import { BorrarTareas } from "../api/tareas.api"
import { useTareas } from "./context/hooks"
import { useNavigate, useSearchParams } from 'react-router-dom'
// import { FcCheckmark } from "react-icons/fc";
// import { FcMinus } from "react-icons/fc";
import { Button, Typography, Container, CardActions, CardActionArea, Grid} from '@mui/material'
import Tarjeta from "./Tarjeta";
// import Alerta from './Alertas/Alerta'
import { useState } from 'react'
// import { useParams } from 'react-router-dom'




function TareasCard({ tarea }) {
  // const { toogleTaskDone } = useTareas()
  const navigate = useNavigate()
  const [mostrar, setMostrar] = useState(false)
  // const params = useSearchParams()

  // const handleDone = async () => {
  //   await toogleTaskDone(tarea.id)
  // }



  return (
    <div>
      <Grid >
        <Grid>
        <Container sx={{ mt: 5, width: 400, backgroundColor: "#99f4d4", border: 2, borderRadius: 4 }}>

          <CardActionArea>
            <Tarjeta />

            <Typography variant='body1' align={"right"} >Numero de registro: {tarea.id}</Typography>
            <Typography variant="h6">Nombre común: {tarea.nombre}</Typography>
            <br />
            <Typography variant="h6">Nombre científico: {tarea.cientifico}</Typography>
            {/* <span>{tarea.hecho == 1 ? <FcCheckmark /> : <FcMinus />}</span> */}
            <Typography variant='body2' >{tarea.creadoEn}</Typography>
          </CardActionArea>
          <CardActions>

            <Button size="small" sx={{ marginLeft: "auto" }} variant="contained" color="error" onClick={() => navigate(`/borrar/${tarea.id}`)}>Eliminar</Button>
            {/* {borrarTarea(tarea.id) } */}
            <Button size="small" variant="contained" color="success" onClick={() => navigate(`/edit/${tarea.id}`)}>Editar</Button>

            {/* <Button size="small" variant="contained" color="info" onClick={() => handleDone(tarea.hecho)}>Efectuar</Button> */}
          </CardActions>

        </Container>
        </Grid>
      </Grid>


    </div>
  )
}

export default TareasCard