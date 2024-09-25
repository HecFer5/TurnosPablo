import axios from "axios";
// import { isPromise } from 'formik'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'

const TablaNueva = () => {
  const [registros, setRegistros] = useState([]);
  const [open, setOpen] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [nuevoRegistroId, setNuevoRegistroId] = useState(null);
  const [busqueda, setBusqueda] = useState(""); // <-- nuevo estado para búsqueda

  const xLink = "md:ml-8 md:my-0 my-7 font-semibold";
  const navigate = useNavigate();

  const ListarTareas = async () =>
    await axios.get("http://localhost:4000/tarea").then((response) => {
      const data = response.data;
      setRegistros(data);
    });

  useEffect(() => {
    ListarTareas();
  }, []);

  const refEstatus = 1;
  const irAlerta = (idpaciente) => {
    navigate("/borrar/" + idpaciente, { state: { refEstatus } });
  };

  const registrosFiltrados = registros
    .filter((registro) => registro.idpaciente !== 33)
    .filter((registro) =>
      `${registro.nombre} ${registro.apellido}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    ); // <-- filtrar por búsqueda
  const [task, setTask] = useState([]);

  const verificaTurnos = async (idpaciente) => {
    const respuesta = await axios.get(
      "http://localhost:4000/sesiones/" + idpaciente
    );
    const taskData = respuesta.data;
    setTask(() => ({
      nombre: taskData.nombre,
      apellido: taskData.apellido,
      telefono: taskData.telefono,
      imagen: taskData.imagen,
      calle: taskData.calle,
      numero: taskData.numero,
      patologia: taskData.patologia,
      patasoc: taskData.patasoc,
      fechacirugia: taskData.fechacirugia,
      mutualid: taskData.mutualid,
      afiliado: taskData.afiliado,
      idpaciente: taskData.idpaciente,
      cantidad: taskData.cantidad,
      usadas: taskData.usadas,
      tanda: taskData.tanda ?? defaultValue,
      estado: taskData.estado,
    }));

    console.log("taskData", taskData);

    if (taskData.mutualid != 2) {
      console.log("con mutual");
      if (taskData.tanda === 0 && taskData.estado === 0) {
        navigate("/sinturno/" + idpaciente, { state: taskData });
      }

      if (taskData.usadas === taskData.cantidad && taskData.estado === 0) {
        navigate("/sinturno/" + idpaciente, { state: taskData });
      }
      if (taskData.estado === 1 && taskData.usadas === taskData.cantidad) {
        navigate("/turno/" + idpaciente, { state: taskData });
      }

      if (taskData.estado === 0 && taskData.usadas != taskData.cantidad) {
        navigate("/turno/" + idpaciente, { state: taskData });
      }
    } else {
      console.log("privado");
      navigate("/turno/" + idpaciente, { state: taskData });
    }
  };


  
  const enviarMensajeWhatsApp = (numero) => {
    const url = `https://web.whatsapp.com/send?phone=${numero}`;
    window.open(url, "whatsappWindow");
};

  return (
    <>
      <div className="flex justify-between">
        <div className="text-2xl text-black text-center font-bold bg-blue-300 mb-10 max-w-md px-4 py-2 mt-7 ml-5">
          PACIENTES EN ACTIVIDAD
        </div>
        <div className="text-xl text-black text-center font-bold mb-10 max-w-md py-2 mt-7">
          Buscar por apellido
        </div>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar..."
          className="block mr-0 mt-10 mb-14 border border-black pl-10"
        />
        <div className="text-sm text-black text-center font-bold mb-10 max-w-md mx-4 px-4 py-2 mt-7">
          Click sobre el número para ver la ficha completa y click en "Editar"
          para correcciones
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="overflow-x-auto overflow-y-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white bg-gray-400 font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4">
                        Nº
                      </th>
                      <th scope="col" className="px-6 py-4">
                        NOMBRE
                      </th>
                      {/* <th scope="col" className="px-6 py-4">
                        TELEFONO
                      </th> */}
                  
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>

                  <tbody className="table-group-divider">
                    {registrosFiltrados.map((registro) => (
                      <tr
                        key={registro.idpaciente}
                        className="border border-gray-500 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                      >
                        <td>
                          <button
                            className="block bg-blue-300 font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"
                            onClick={() => verificaTurnos(registro.idpaciente)}
                          >
                            Turno
                          </button>
                        </td>
                        <td>
                          <li className="block bg-white font-bold ml-4 px-2 py-1 text-black w-min rounded-md">
                            <Link to={"/ficha/" + registro.idpaciente}>
                              {registro.idpaciente}
                            </Link>
                          </li>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-l font-bold">{`${registro.apellido}, ${registro.nombre}`}</td>
                        {/* <td className="whitespace-nowrap px-6 py-4 font-bold">
                          {registro.telefono}
                        </td> */}
                    
                        <td>
                          <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md">
                            <Link
                              to={{
                                pathname: `/vistahistoria/${registro.idpaciente}`,
                                state: {
                                  nombre: registro.nombre,
                                  apellido: registro.apellido,
                                },
                              }}
                            >
                              HISTORIA CLINICA
                            </Link>
                          </li>
                        </td>
                        <td>
                          <li className="block bg-blue-300 font-semibold ml-4 px-2 py-1 text-black w-min rounded-md">
                            <Link
                              to={
                                "/tablahistorialturnos/" + registro.idpaciente
                              }
                            >
                              HISTORIAL
                            </Link>
                          </li>
                        </td>
                        <td>
                          <li className="block bg-lime-700 px-5 py-1 text-white w-min rounded-md">
                            <Link to={"/edit/" + registro.idpaciente}>
                              Editar
                            </Link>
                          </li>
                        </td>
                        <td>
                          <button
                            className="block bg-red-700 px-5 py-1 text-white w-min rounded-md"
                            onClick={() => irAlerta(registro.idpaciente)}
                          >
                            Borrar
                          </button>
                        </td>
                        <td>
                          <button
                            className="block bg-green-500 px-5 py-1 text-white w-min rounded-md"
                            onClick={() =>
                              enviarMensajeWhatsApp(
                                registro.telefono
                              )
                            }
                          >
                            Enviar WhatsApp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablaNueva;
