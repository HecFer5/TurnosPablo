import './App.css'
import { Routes, Route } from 'react-router-dom'
import TareasForm from './paginas/TareasForm'
import { TareasContextProv } from './componentes/context/TareasContext'
import Alerta from './componentes/Alertas/Alerta'
import NuevoRegistro from './componentes/Alertas/NuevoRegistro'
import TablaNueva from './componentes/TablaNueva'
import TablaInactivos from './componentes/TablaInactivos'
import Ficha from './componentes/Ficha.jsx'
import NavBar from './componentes/Navbar.jsx'
import Turno from './componentes/Turno.jsx'
import NuevoTurno from './componentes/Alertas/NuevoTurno.jsx'
import confirmacion from './componentes/Alertas/confirmación.jsx'
import ModalTurnos from './componentes/Alertas/ModalTurnos.jsx'
import ModalActividad from './componentes/Alertas/ModalActividad.jsx'
import TurnoNuevoDirecto from './componentes/Alertas/ClickTurno.jsx'
import Error from './componentes/Alertas/Error.jsx'
import TurnoPasado from './componentes/Alertas/TurnoPasado.jsx'
import HacerActividad from './componentes/Alertas/indicaActividad.jsx'
import TablaMutuales from './componentes/TablaMutuales.jsx'
import TablaMutualesPacientes from './componentes/tablMutualesPacientes.jsx'
import TablaHisotiralTurnos from './componentes/TablaHistorialTurnos.jsx'
import Historia from './componentes/vistaHistoria.jsx'
import VisorImagenes from './componentes/Alertas/VisorIMagenes.jsx'
import IngresoHistorias  from './componentes/IngresoHistoria.jsx'
import sinTurno from './componentes/Alertas/sinTurno.jsx'
import verTurno from './componentes/Alertas/VerTurno.jsx'
import AlertaTurnos from './componentes/Alertas/AlertaTurnos.jsx'
import { ActualizarTrunos } from './api/tareas.api.js'; 

import { useEffect, useState } from 'react';
import axios from "axios";


function App() {

  const [data, setData] = useState(null); 

  useEffect(() => {
      const obtenerDatos = async () => {
          try {
              const response = await axios.put("http://localhost:4000/turno");
              setData(response.data); 
              console.log(response.data); 
          } catch (error) {
              console.error('Error al obtener los datos:', error);
          }
      };

      obtenerDatos(); 
  }, []); 



  return (
    <>

      <NavBar />
      <TareasContextProv>
        <Routes>
          <Route path='/' element={<Turno />} />
          <Route path='/turno/:idpaciente' Component={Turno} />
          <Route path='/tabla' element={<TablaNueva />} />
          <Route path='/tablainac' element={<TablaInactivos />} />
          <Route path='/ficha/:idpaciente' Component={Ficha} />
          <Route path='/new' element={<TareasForm />} />
          <Route path='/edit/:idpaciente' element={<TareasForm />} />
          <Route path='/otroReg' Component={NuevoRegistro} />
          <Route path='/otroturno' Component={NuevoTurno} />
          <Route path='/confirmacion' Component={confirmacion} />
          <Route path='/turno' Component={Turno} />
          <Route path='/turnodirecto' Component={ModalTurnos} />
          <Route path='/actividad' Component={ModalActividad} />
          <Route path='/clickturno/:idpaciente' Component={TurnoNuevoDirecto} />
          <Route path='/clickturno' Component={TurnoNuevoDirecto} />
          <Route path='/error' Component={Error} />
          <Route path='/turnopasado/:idpaciente' Component={TurnoPasado} />
          <Route path='/eliminarregistro/:idpaciente' Component={Alerta} />
          <Route path='/borrar/:idpaciente' Component={Alerta} />
          <Route path='/borrarturnos/:idturnos' Component={AlertaTurnos} />
          <Route path='/haceractividad' Component={HacerActividad} />
          <Route path='/tablamutuales' Component={TablaMutuales} />
          <Route path='/mutualespacientes/:idmutual' Component={TablaMutualesPacientes} />
          <Route path='/tablahistorialturnos/:idpaciente' Component={TablaHisotiralTurnos} />
          <Route path='/vistahistoria/:idpaciente' Component={Historia} />
          <Route path='/visorimagenes' Component={VisorImagenes} />
          <Route path='/ingresohistorias/:idpaciente' Component={IngresoHistorias} />
          <Route path='/sinturno/:idpaciente' Component={sinTurno} />
          <Route path='/verturno' Component={verTurno} />

        </Routes>
      </TareasContextProv>
    </>

  )
}

export default App