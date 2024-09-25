import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik'
import { useTareas } from '../componentes/context/hooks';


const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [nombre, setNombre] = useState('')
  const [description, setDescription] = useState('');
  const params = useParams()
  const { CreandoHistoria } = useTareas()
  const [comentario, setComentario] = useState('');
  const [idpaciente, setPacienteid] = useState(params.idpaciente)



  const [task, setTask] = useState({
    imagen: `../../../public/${""}`,
    descripcion: "",
    comentario: "",
    idpaciente: params.idpaciente

  })

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('nombre', nombre);

    formData.append('description', description);
    formData.append('idpaciente', params.idpaciente)

    try {
      // Guardar la imagen localmente
      const handle = await window.showSaveFilePicker({
        types: [
          {
            accept: {
              'image/*': ['.jpg', '.jpeg', '.png', '.gif'], // Añadir otros formatos de imagen aquí
              'application/pdf': ['.pdf'] // 
            }
          }
        ]
      });
      const writable = await handle.createWritable();
      await writable.write(image);
      await writable.close();
      console.log('Imagen guardada localmente');

      // Subir la imagen al servidor
      const response = await axios.post('http://localhost:4000/historias', formData, {
        headers: {
          imagen: image,
          idpaciente: params.idpaciente
        },
      });
      console.log('Imagen subida exitosamente:', response.data);
      // Aquí puedes mostrar un mensaje de éxito o realizar otras acciones después de la subida.
    } catch (error) {
      console.error('Error al guardar o subir la imagen:', error);
      // Manejo de errores
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleImageChange} />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
        <input type="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="nombre" />

        <button type="submit">Subir Imagen</button>
      </form>


      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values)
          // navigate('/otroReg')

          await CreandoHistoria(values)
          setTask({
            imagen: `../../../public/${""}`,
            descripcion: "",
            comentario: "",
            idpaciente: params.idpaciente

          })
        }}
      >

        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-xl rounded-md p-4 mx-auto  mt-10 opacity-100">
            <div className="flex">
              <label className="block">imagen</label>
              <input className="px-2 py-1 rounded-sm w-full ml-5" required type="text"
                name='descripcion'
                onChange={handleChange}
                placeholder='Campo obligatorio'
                value={values.descripcion} />
              <input className="px-2 py-1 rounded-sm w-full ml-5"  type="text"
                name='comentario'
                onChange={handleChange}
                value={values.comentario} />
              <input className="px-2 py-1 rounded-sm w-full ml-5" required type="text"
                name='imagen'
                onChange={handleChange}
                placeholder='Campo obligatorio'
                value={values.imagen} />
            </div>
            <div className='flex'>

              <button type='submit' disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4">
                {isSubmitting ? "Guardando" : "Guardar"}</button>
              <button className="block bg-red-500 px-2 py-1 text-white w-full rounded-md mt-4 ml-6" onClick={() => navigate('/turno')}>Cancelar</button>

            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ImageUpload;
