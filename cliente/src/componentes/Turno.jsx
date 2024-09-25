import { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { useTareas } from "./context/hooks";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import esLocale from "dayjs/locale/es";
import updateLocale from "dayjs/plugin/updateLocale";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import { Calendar, dayjsLocalizer, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { FcCalendar } from "react-icons/fc";
import { AiFillPhone } from "react-icons/ai";
import moment from 'moment';

import "./Turno.css";
import { TareasContext } from "./context/TareasContext";

dayjs.extend(updateLocale);
dayjs.locale(esLocale);

dayjs.updateLocale("es", {
  weekStart: 1,
});

const messages = {
  allDay: "Dia Entero",
  previous: "Atrás",
  next: "Adelante",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  showMore: (total) => `+ (${total}) Eventos`,
};

const Turno6 = (props) => {
  const [events, setEvents] = useState([]);
  const [datos, setDatos] = useState([]);
   const localizer = dayjsLocalizer(dayjs, { weekStart: 1 });

  const [selectedDate, setSelectedDate] = useState(dayjs(Date()).toDate());
  const { TraerPacientes, TraerTareas, traerTareaSesion } = useTareas();
  const [datosTabla, setDatosTabla] = useState([]);
  const location = useLocation();
  const taskData = location.state;
  const params = useParams();

  const { darTurno } = useTareas();
  const [task, setTask] = useState({
    fecha: dayjs(Date()).toString(),
    idpaciente: 0,
    fechafin: dayjs(Date()).toString(),
    observac: "",
    usadas: "",
    cantidad: "",
  });

  const [traer, setTraer] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });
  const navigate = useNavigate();

  const EventComponent = ({ event }) => (
    <div
      className={`${event.color} h-full w-full flex items-center justify-between p-2 `}
    >
      <span className="flex-grow text-center">{event.title}</span>
      <div className="flex" style={{ display: "none" }}>
        <span className="rbc-event-time">
          {event.start.toLocaleTimeString()}
        </span>
      </div>
      <div className="flex">
        <button
          className="bg-transparent text-black w-min rounded-md"
          onClick={() => llamarPorTurno(event.id)}
        >
          <AiFillPhone />
        </button>
        <button
          className="bg-transparent text-red-500 w-min rounded-md"
          onClick={() => handleDeleteEvent(event.id)}
        >
          <AiTwotoneDelete />
        </button>
      </div>
    </div>
  );

  // //!  para seleccionar desde el calendario
  const Selector = async (slotInfo) => {
    const { start } = slotInfo;
    if (start < dayjs(Date()).toDate()) {
      navigate(`/turnopasado/${params.idpaciente}`);
    } else {
      if (params.idpaciente) {
        navigate(`/clickturno/${params.idpaciente}`, {
          state: { start, ...taskData, ...datosTabla },
        });
      } else {
        navigate(`/clickturno`, { state: { start } });
      }
    }
  };

  //     //! fin

  const handleDeleteEvent = async (idturnos) => {
    navigate("/borrarturnos/" + idturnos);
  };

  // const clickAlTurno = async (idturnos) => {
  //   // navigate("/tabla/");
  //   const response = await axios.get("http://localhost:4000/listoturno/" + idturnos);

  //   if (response.status === 200) {
  //       navigate('/confirmacion')
  //       console.log('Los datos se enviaron correctamente');
  //   } else {
  //       console.log('Hubo un error al enviar los datos');
  //   }
  // };

  const enviarMensajeWhatsApp = (numero, mensaje) => {
    const url = `https://web.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "whatsappWindow");
  };

  const llamarPorTurno = async (idturnos) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/llamaporturno/" + idturnos
      );
      const data = response.data;

      if (data.length > 0) {
        const turno = data[0];

        const fecha = new Date(turno.fecha);
        const opcionesFecha = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const opcionesHora = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };

        const fechaFormateada = fecha.toLocaleDateString(
          "es-ES",
          opcionesFecha
        );
        const horaFormateada = fecha.toLocaleTimeString("es-ES", opcionesHora);

        const mensaje = `Buen día ${turno.nombre}. Te escribo para confirmar el turno de Kinesiología para el día *${fechaFormateada}* a las *${horaFormateada}*. Quedo a la espera de tu confirmación. Gracias`;

        enviarMensajeWhatsApp(turno.telefono, mensaje);

        if (response.status === 200) {
          console.log("Los datos se enviaron correctamente", turno.telefono);
        } else {
          console.log("Hubo un error al enviar los datos");
        }
      } else {
        console.log("No se encontraron datos para el turno.");
      }
    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/turno");
      const data = response.data;
      const formattedEvents = data.map((turno) => {
        let title;
        if (turno.nombre != "ACTIVIDAD") {
          title = `${turno.nombre} ${turno.apellido}`;
        } else {
          title = "ACTIVIDAD";
        }

        // if (turno.observac === "") {
        //     title = title
        // } else {
        //     title = title + ' (' + turno.observac + ')'
        // }

        // if (turno.cantidad === 0 && turno.usadas > 0 && turno.tanda === 0 && turno.estado > 0) {
        //     title = title + ` (particular/${turno.usadas})`
        // }

        // if (turno.cantidad > 0 && turno.usadas > 0 && turno.tanda > 0 && turno.estado === 0) {
        //     title = title + ` (${turno.usadas}/${turno.cantidad})`
        // }

        // if ((turno.cantidad === 0 || turno.cantidad === null) && (turno.usadas === 0 || turno.usadas === null) && (turno.tanda === 0 || turno.tanda === null) && turno.estado === 0) {
        //     title = title + ` (sin sesión asignada)`
        // }


        
        return {
          title: (
            <div className=" text-sm sm:text-xs md:text-base lg:text-lg xl:text-sm">
              {title}
            </div>
          ),
          start: dayjs(turno.fecha).toDate(),
          end: dayjs(turno.fechafin).toDate(),
          id: turno.idturnos,
          color: `${
            turno.nombre !== "ACTIVIDAD"
              ? "bg-blue-300 text-black font-semibold"
              : "bg-green-300 text-black font-semibold"
          }`,
        };
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error al obtener los eventos del calendario:", error);
    }
  };

  const traerDatos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/tarea/" + params.idpaciente
      );
      const data = response.data;
      const datosPacientes = {
        nombre: data.nombre,
        apellido: data.apellido,
      };

      setDatos(datosPacientes);
    } catch (error) {
      console.error("Error al obtener los eventos del calendario:", error);
    }
  };

  useEffect(() => {
    const traerLaTarea = async () => {
      if (params.idpaciente) {
        const datosTabla = await traerTareaSesion(params.idpaciente);
        console.log(datosTabla, "ajjd");
        setDatosTabla({
          nombre: datosTabla.nombre,
          apellido: datosTabla.apellido,
          telefono: datosTabla.telefono,
          imagen: datosTabla.imagen,
          calle: datosTabla.calle,
          numero: datosTabla.numero,
          patologia: datosTabla.patologia,
          patasoc: datosTabla.patasoc,
          fechacirugia: datosTabla.fechacirugia,
          mutualid: datosTabla.mutualid,
          afiliado: datosTabla.afiliado,
          idpaciente: datosTabla.idepaciente,
          cantidad: datosTabla.cantidad,
          usadas: datosTabla.usadas,
          tanda: datosTabla.tanda,
          estado: datosTabla.estado,
        });
      }
    };
    traerLaTarea();
  }, [params.idepaciente]);

  useEffect(() => {
    fetchEvents();
    if (params.idpaciente) {
      traerDatos();
    }
  }, [params.idpaciente]);

  const darElTurno = async (values, actions) => {
    console.log("en dar turno", taskData);
    // console.log(taskData, taskData.maxUsadas, 'dando el turno')
    const originalDate = dayjs(selectedDate);
    const newDate = originalDate.add(30, "minute");
    values.fecha = dayjs(selectedDate).format("YYYY-MM-DD HH:mm:ss");
    values.fechafin = newDate.format("YYYY-MM-DD HH:mm:ss");
    values.idpaciente = params.idpaciente;
    values.usadas = taskData.usadas + 1;
    navigate("/otroturno");
    await darTurno(values);
  };

  let irFuncion = 0;

  const irActividad = () => {
    console.log(activo);
    navigate("/haceractividad", { state: { taskData } });
    let irFuncion = 1;
  };

  const irPaciente = () => {
    const irFuncion = 2;
    console.log(activo, "aqui");
    navigate("/tabla", { state: { taskData } });
  };

  const [eventData, setEventData] = useState(null);
  const [turnoData, setTurnoData] = useState(null);

  const handleDoubleClick = async (event) => {
    setEventData(event);

    try {
      const response = await axios.get(
        "http://localhost:4000/turno?idpaciente=" + event.id
      );
      const turnos = response.data;

      const turnoEspecifico = turnos.find(
        (turno) => turno.idturnos === event.id
      );

      setTurnoData(turnoEspecifico);
      console.log(turnoEspecifico);
      navigate("/verturno", { state: { turnoEspecifico } });
    } catch (error) {
      console.log(error);
    }
  };

  const [activo, setActivo] = useState(false);
  // let activo = false

  
  return (
    <>
      <Calendar
        style={{
          height: "65vh",
          wide: "35vw",
          marginTop: "5vh",
          marginLeft: "3vw",
          marginRight: "3vw",
        }}
        messages={messages}
        selectable={activo || params.idpaciente}
        onSelectSlot={Selector}
        step={30}
        timeslots={1}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WORK_WEEK} // Usa la vista de semana laboral
        views={["month", "work_week", "day", "agenda"]}
        onDoubleClickEvent={handleDoubleClick}
        min={dayjs("2024-01-22T08:00:00").toDate()}
        max={dayjs("2024-01-22T18:00:00").toDate()}
        components={{
          event: EventComponent,
        }}
        formats={{
          dayHeaderFormat: (date) => {
            return dayjs(date).format("dddd DD [de] MMMM [de] YYYY");
          },
          monthHeaderFormat: (date) => {
            return dayjs(date).format("dddd DD [de] MMMM [de] YYYY");
          },
          dayFormat: (date) => {
            return dayjs(date).format(" dddd  DD");
          },
        }}
      />

      <div className="container mx-auto mb-2 p-1">
        <Formik
          initialValues={task}
          enableReinitialize={true}
          onSubmit={darElTurno}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DemoItem>
                    {/* CAJA PARA LOS ELEMENTOS */}
                    <div className="flex flex-col sm:items-center sm:flex-row justify-between items-center p-5 gap-4">
                      {/* TITULO */}
                      {params.idpaciente ? (
                        <div className="text-white bg-blue-400 hover:bg-blue-500 px-10 py-1 font-bold rounded-md h-full hover:italic ">
                          {datos.nombre} {datos.apellido}
                        </div>
                      ) : (
                        <button
                          className="text-black bg-blue-400 hover:bg-blue-500 px-10 py-1 font-bold rounded-md h-full hover:italic "
                          onClick={() => {
                            irPaciente();
                          }}
                        >
                          ¿PACIENTE?
                        </button>
                      )}

                      <button
                        className="text-black bg-blue-400 hover:bg-blue-500 px-10 py-1 font-bold rounded-md h-full hover:italic "
                        onClick={() => {
                          setActivo(!activo);
                        }}
                      >
                        ACTIVIDAD
                      </button>
                      <button className="text-black bg-red-400 hover:bg-red-500 px-10 py-1 font-bold rounded-md h-full hover:italic ">
                        <Link to={"/"}>Cancelar</Link>
                      </button>

                      {/* SELECTOR DE FECHA */}
                      <DateTimePicker
                        defaultValue={dayjs(Date()).toDate()}
                        value={dayjs(task.fecha)}
                        onChange={(date) => setSelectedDate(date)}
                        format="ddd DD [de] MMMM [de] YYYY hh:mm "
                        className="selector h-full mt-2"
                      />
                      {/* BOTON INGRESAR */}

                      {/* {params.idpaciente ? <button type='submit' className="bg-lime-700 px-2 py-1 text-white rounded-md  ">Ingresar</button> : <button disabled type='submit' className="bg-green-300 px-2 py-1 text-white rounded-md">Ingresar</button>} */}
                      {/* BOTON CANCELAR */}
                    </div>

                    {/* OBSERVACIONES */}
                    <input
                      className="px-10 py-1 rounded-sm border-2 h-10   "
                      type="text"
                      onChange={handleChange}
                      value={values.observac}
                      placeholder="Ingresar observaciones"
                      name="observac"
                    />

                    {/* FIN DE LA CAJA PARA ELEMENTOS */}
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Turno6;
