import axios from "axios";

//! PACIENTES
export const ListarTareas = async () =>
  await axios.get("http://localhost:4000/tarea");

export const ListarInactivos = async () =>
  await axios.get("http://localhost:4000/inac");

export const ListarPacientes = async () =>
  await axios.get("http://localhost:4000/pacientes");

export const LlamadoPorTurno = async (idturnos) =>
  await axios.get("http://localhost:4000/llamaporturno/" + idturnos);


export const CrearTareas = async (registro, turno) => {
  await axios.post("http://localhost:4000/tarea", registro);
};

export const ListarUltimoPaciente = async (registro, turno) => {
  await axios.get("http://localhost:4000/ultimo");
};

export const BorrarTareas = async (idpaciente) =>
  await axios.delete("http://localhost:4000/tarea/" + idpaciente);

export const EliminarRegistro = async (idpaciente) =>
  await axios.delete("http://localhost:4000/inac/" + idpaciente);

export const VuelveRegistro = async (idpaciente) =>
  await axios.put("http://localhost:4000/tarea/" + idpaciente);

export const ListarUnaTarea = async (idpaciente) =>
  await axios.get("http://localhost:4000/tarea/" + idpaciente);

export const EditaTarea = async (idpaciente, nuevosCampos) =>
  await axios.put(`http://localhost:4000/tarea/${idpaciente}`, nuevosCampos);

export const EditaTareaSesion = async (idpaciente) =>
  await axios.get("http://localhost:4000/sesiones/" + idpaciente);
//! TURNOS

export const ListarTurnos = async () =>
  await axios.get("http://localhost:4000/turno");

export const VerTurnos = async (idturnos) =>
  await axios.get("http://localhost:4000/turno/" + idturnos);

export const darPermiso = async (idturnos) =>
  await axios.put("http://localhost:4000/permiso/" + idturnos);

export const vinoAlTurno = async (idturnos) =>
  await axios.put("http://localhost:4000/listoturno/" + idturnos);

export const ListarTurnosPaciente = async (idpaciente) =>
  await axios.get("http://localhost:4000/turno/" + idpaciente);

export const BorrarUnTurno = async (idturnos) =>
  await axios.delete("http://localhost:4000/turno" + idturnos);

export const TurnoMax = async (idpaciente) =>
  await axios.get("http://localhost:4000/turnomax/" + idpaciente);

export const CrearTurnos = async (turno) =>
  await axios.post("http://localhost:4000/turno/", turno);

export const CrearHistorialTurnos = async (idpaciente) =>
  await axios.post("http://localhost:4000/historialturnos/", idpaciente);

//! MUTUALES
export const ListarMutuales = async () =>
  await axios.get("http://localhost:4000/mutual/");

export const ListarPacientesMutual = async (mutualid) =>
  await axios.get("http://localhost:4000/pacientesmutuales/" + mutualid);

export const ListarUnaMutual = async (idmutual) =>
  await axios.get("http://localhost:4000/mutual/" + idmutual);

export const CrearMutuales = async (mutual) =>
  await axios.post("http://localhost:4000/mutual", mutual);

export const EditaMutual = async (idmutual, values) =>
  await axios.put(`http://localhost:4000/mutual/${idmutual}`, values);

export const BorrarUnaMutual = async (idmutual) =>
  await axios.delete("http://localhost:4000/mutual/" + idmutual);

//!IMAGENES

export const ListarImagenes = async (idpaciente) =>
  await axios.get("http://localhost:4000/imagenes/" + idpaciente);

export const CrearHistorias = async (historia) =>
  await axios.post("http://localhost:4000/historias", historia);


export const ActualizarTrunos = async (historia) =>
  await axios.post("http://localhost:4000/turno", historia);


