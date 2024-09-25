import React, { useEffect, useState } from 'react';
import { useTareas } from '../componentes/context/hooks';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";



const Historia = () => {
  const { TraerImagenes } = useTareas();
  const [tasks, setTasks] = useState([]);
  const [ver, setVer] = useState(false);
  // const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation();


  useEffect(() => {
    const HistoriaImagenes = async () => {
      try {
        if (params.idpaciente) {
          const tasks = await TraerImagenes(params.idpaciente);
          setTasks(tasks);
        }
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };
    HistoriaImagenes();
  }, [params.idpaciente]);


  const images = tasks.map((task) => ({
    original: task.imagen,
    thumbnail: task.imagen,
    description: `${task.nombre} ${task.apellido} - ${task.descripcion} ` ,
  }));

console.log(images.length, 'largo')
  return (
    <>
      <div className='flex'>
        <button onClick={() => navigate('/tabla')} className="block bg-blue-700 px-2 py-1 text-white rounded-md  text-center mt-3 mb-5 m-auto">Volver a la tabla</button>
        <button onClick={() => navigate('/ingresohistorias/' + params.idpaciente)} className="block bg-green-700 px-2 py-1 text-white rounded-md  text-center mt-3 mb-5 m-auto">Ingresar Documentación</button>
      </div>
     
   
      {images.length > 0 ? (
  <div style={{width: '500px', margin: 'auto'}}>
    <ImageGallery items={images}
      showBullets={true}
      autoPlay={false}
      showPlayButton={false}
      showThumbnails={false} />
  </div>
) : (
<div class="flex justify-center items-center mt-20 text-xl font-bold bg-blue-500 rounded-lg p-4 w-full md:w-96 mx-auto text-center">
  <h2>No se encontraron imágenes de este paciente</h2>
  </div>
)}
    </>
  
  );
};

export default Historia;
