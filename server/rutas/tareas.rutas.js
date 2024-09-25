import { Router } from "express";
import {
  getTarea,
  getTareas,
  crearTarea,
  borrarRegistro,
  editarTarea,
  getPacInac,
  crearTurno,
  getTurnos,
  borrarTurno,
  eliminarUnRegistro,
  volverRegistro,
  crearActividad,
  borrarActividad,
  getActividades,
  getMutuales,
  getMutual,
  crearMutual,
  borrarMutual,
  getPacientesMutuales,
  historialTurnos,
  getImagenes,
  crearHistoria,
  getSesiones,
  getTareaSesion,
  getPacientes,
  turnosPaciente,
  ultimoPaciente,
  getPermiso,
  verTurno,
  editarMutual,
  actualizaTurno,
  listoTurno,
  llamarTurno
} from "../controladores/tareas.controladores.js";

const router = Router();
router.put("/turno", actualizaTurno);

//! PACIENTES
router.get("/tarea", getTareas);


router.get("/llamaporturno/:idturnos", llamarTurno);

router.get("/pacientes", getPacientes);

router.get("/ultimo", ultimoPaciente);


router.get("/tarea/:idpaciente", getTarea);

router.post("/tarea", crearTarea);

router.put("/tarea/:idpaciente", editarTarea);

router.delete("/tarea/:idpaciente", borrarRegistro);

router.delete("/inac/:idpaciente", eliminarUnRegistro);

router.put("/inac/:idpaciente", volverRegistro);

router.get("/inac", getPacInac);


router.get("/turno", getTurnos);

router.get("/turno/:idpaciente", turnosPaciente);

router.get("/turno/:idturnos", verTurno);

router.post("/turno", crearTurno);

router.delete("/turno/:idturnos", borrarTurno);

router.get("/historialturnos/:idpaciente", historialTurnos);

router.put("/permiso/:idturnos", getPermiso);

router.get("/listoturno/:idturnos", listoTurno);

router.get("/sesiones/:idpaciente", getTareaSesion);


//! MUTUALES

router.get("/mutual", getMutuales);
router.get("/mutual/:idmutual", getMutual);
router.post("/mutual", crearMutual);
router.delete("/mutual/:idmutual", borrarMutual);
router.get("/tarea/:mutualid", getPacientesMutuales);
router.get("/pacientesmutuales/:mutualid", getPacientesMutuales);
router.get("/imagenes/:idpaciente", getImagenes);
router.put("/mutual/:idmutual", editarMutual);
router.post("/historias", crearHistoria);

export default router;
