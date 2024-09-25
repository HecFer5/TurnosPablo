   ///////////////para borrar un registro
   const BorrarTarea = async (id) => {
    try {
        const respuesta = await BorrarTarea(id)
        
        setTareas(tareas.filter(tarea => tarea.id !== id))
    } catch (error) {
        console.log(error)
    }
}

export default BorrarTarea