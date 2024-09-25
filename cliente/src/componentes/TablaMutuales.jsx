import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTareas } from "../componentes/context/hooks";
import { Formik, Form } from "formik";

const TablaMutuales = () => {
  const [mutuales, setMutuales] = useState([]);
  // const [pendientes, setPendientes] = useState([])
  const { nuevaMutual, CambiaMutual } = useTareas();
  const [task, setTask] = useState({
    nombremutual: "",
    idmutual: 0,
    cantidadpacientes: 0,
    valor: 0,
  });

  const [values, setValues] = useState({
    nombremutual: "",
    valor: 0,
  });

  const xLink = "md:ml-8 md:my-0 my-7 font-semibold";
  const navigate = useNavigate();

  const ListarMutuales = async () =>
    await axios.get("http://localhost:4000/mutual").then((response) => {
      const data = response.data;
      setMutuales(data);
    });
  useEffect(() => {
    ListarMutuales();
  }, []);

  // const ViendoTurnosPendientes = async () =>
  //     await axios.get('http://localhost:4000/turnopendiente').then((response) => {
  //         const data = response.data
  //         setPendientes(data)
  //         console.log(data)

  //     })
  // useEffect(() => {
  //     ViendoTurnosPendientes()
  // }, [])

  const [editar, setEditar] = useState(false);
  console.log(editar, "entrando");

  const editarLaMutual = async (idmutual) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/mutual/" + idmutual
      );
      const data = response.data;
      setValues(data);
      console.log(values, editar, idmutual);
    } catch (error) {
      console.log(error);
    }
  };

  const borrarMutual = async (idmutual) => {
    const response = await axios.delete(
      "http://localhost:4000/mutual/" + idmutual
    );

    if (response.status === 200) {
      navigate("/confirmacion");
    } else {
      console.log("Hubo un error al enviar los datos");
    }
  };

  return (
    <>
      <div className=" flex justify-between"></div>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="ml-20 inline-block  py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div
                  className="text-2xl text-white text-center font-bold bg-blue-500
                 mb-10  max-w-md px-4 py-2 mt-5 ml-5"
                >
                  LISTADO MUTUALES
                </div>
                <div
                  className="text-1xl text-black text-center bg-blue-200
                 mb-10  max-w-md px-4 py-2 mt-5 ml-5"
                >
                  Click sobre Nº para ver pacientes de cada mutual
                </div>
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-gray-400 font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Nº
                      </th>
                      <th scope="col" className="px-6 py-4">
                        NOMBRE
                      </th>
                      <th scope="col" className="px-6 py-4">
                        AFILIADOS
                      </th>
                      <th scope="col" className="px-6 py-4">
                        VALOR BONO
                      </th>
                      <th scope="col" className="px-6 py-4">
                        A COBRAR
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {mutuales.map(
                      (mutual) =>
                        mutual.idmutual !== 33 && (
                          <tr
                            key={mutual.idmutual}
                            className="border-e-4 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                          >
                            <td>
                              <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md">
                                <Link
                                  to={"/mutualespacientes/" + mutual.idmutual}
                                >
                                  {" "}
                                  {mutual.idmutual}
                                </Link>
                              </li>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 font-bold">{`${mutual.nombremutual}`}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-bold">{`${mutual.cantidad_pacientes}`}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-bold">
                              {mutual.valor === null ? "" : mutual.valor}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-bold">
                              {mutual.valordiferencia}
                            </td>
                            <td>
                              <button
                                className="block bg-green-700 px-5 py-1 text-white w-min rounded-md"
                                onClick={() => {
                                  setEditar(true);
                                  editarLaMutual(mutual.idmutual);
                                }}
                              >
                                Editar
                              </button>
                            </td>
                  
                          </tr>
                        )
                    )}
                  </tbody>
                  <tfoot>
                    {" "}
                    <tr className="border-t bg-gray-400">
                      {" "}
                      <td
                        colSpan="2"
                        className="px-6 py-4 font-bold text-right"
                      >
                        Total de afiliados:
                      </td>{" "}
                      <td className="px-6 py-4 font-bold">
                        {" "}
                        {mutuales.reduce(
                          (acc, mutual) =>
                            acc + (mutual.cantidad_pacientes || 0),
                          0
                        )}{" "}
                      </td>{" "}
                      <td className="px-6 py-4 font-bold text-right">
                        Total A Cobrar:
                      </td>{" "}
                      <td className="px-6 py-4 font-bold">
                        {" "}
                        {mutuales.reduce(
                          (acc, mutual) =>
                            acc + (parseFloat(mutual.valordiferencia) || 0),
                          0
                        )}{" "}
                      </td>{" "}
                    </tr>{" "}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class=" justify-center items-center ml-40">
          <div
            className="text-2xl text-white text-center font-bold bg-blue-500
                 mb-10  max-w-md px-14 py-2 mt-8"
          >
            Ingreso nuevas mutuales
          </div>
          <Formik
            initialValues={values}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
              console.log(values);
              if (editar === true) {
                console.log("editar", values);

                await CambiaMutual(values.idmutual, values);
                window.location.reload();
              } else {
                await nuevaMutual(values);
                console.log(values);
                window.location.reload();
              }

              setTask({
                nombremutual: "",
                valor: 0,
              });
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting }) => (
              <Form
                onSubmit={handleSubmit}
                className="bg-slate-300 max-w-xl rounded-md p-4 mx-auto mt-10 opacity-100"
              >
                <div>
                  <label className="block">Mutual</label>
                  <input
                    className="px-2 py-1 rounded-sm w-80 ml-5"
                    required
                    type="text"
                    name="nombremutual"
                    onChange={handleChange}
                    placeholder="Campo obligatorio"
                    value={values.nombremutual.toUpperCase()}
                  />
                  <label className="block mt-5">Valor del bono</label>
                  <input
                    className="px-2 py-1 rounded-sm ml-5 w-20"
                    required
                    type="number"
                    name="valor"
                    onChange={handleChange}
                    value={values.valor}
                  />
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4"
                  >
                    {isSubmitting ? "Guardando" : "Guardar"}
                  </button>
                  <button
                    className="block bg-red-500 px-2 py-1 text-white w-full rounded-md mt-4 ml-6"
                    onClick={() => {
                      setTask({
                        nombremutual: "",
                        valor: 0,
                      });
                      setEditar(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default TablaMutuales;
