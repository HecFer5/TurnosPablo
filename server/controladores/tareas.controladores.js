import { pool } from "../db.js";

///!PACIENTES///////

//! LISTADO COMPLETO DE PACIENTES ACTIVOS e inactivos

export const getPacientes = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM pacientes ORDER BY apellido, nombre`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};

//! LISTADO COMPLETO DE PACIENTES ACTIVOS

export const getTareas = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM pacientes WHERE estatus= 1 ORDER BY apellido, nombre`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};

///! LISTADO COMPLETO DE PACIENTES INACTIVOS

export const getPacInac = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM pacientes WHERE estatus= 0 ORDER BY apellido, nombre "
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///!LLAMAR UN SOLO PACIENTE
export const getTarea = async (req, res) => {
  try {
    const [result] = await pool.query(
      
    //  "SELECT pacientes.*, mutual.nombremutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual JOIN turnos ON pacientes.idpaciente = turnos.idpaciente  WHERE pacientes.idpaciente = ?", [req.params.idpaciente]

    "SELECT pacientes.*, mutual.nombremutual  FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual  WHERE pacientes.idpaciente = ?", [req.params.idpaciente]
    );

    if (result.length === 0) {
     
      return res.status(404).json("No hay el id");
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//!LLAMAR ultimo PACIENTE
export const ultimoPaciente = async (req, res) => {
  try {
    const [result] = await pool.query( 
    "SELECT * FROM pacientes ORDER BY idpaciente DESC LIMIT 1 "
    
    );

    if (result.length === 0) {
     
      return res.status(404).json("No hay el id");
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! ingresar un paciente
export const crearTarea = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      telefono,
      calle,
      numero,
      patologia,
      patasoc,
      fechacirugia,
      mutualid,
      afiliado,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO pacientes (nombre, apellido, telefono, calle, numero, patologia, patasoc, fechacirugia, mutualid, afiliado) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        nombre,
        apellido,
        telefono,
        calle,
        numero,
        patologia,
        patasoc,
        fechacirugia,
        mutualid,
        afiliado,
      ]
    );

    // Check if the query was successful
    if (result.affectedRows === 1) {
      // Get the ID of the inserted task
      const insertedId = result.insertId;

      // Send a successful response to the client with the inserted ID
      res.status(200).json({ message: "Tarea creada exitosamente", insertedId });
    } else {
      // Send an error response to the client
      res.status(500).json({ message: "Error al crear la tarea" });
    }
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    // Send an error response to the client
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};




// //! MODIFICA LA CANTIDAD DE SESIONES USADAS

// export const sesiones = async (req, res) => {
//   try {
//     const { usadas } = req.body;  
//     const [result] = await pool.query(
//       "UPDATE turnos SET usadas = 0 WHERE idpaciente = ?",
//       [req.params.idpaciente]  
//     );
//     res.send(result);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


///! BORRAR UN PACIENTE PARCIALMENTE
export const borrarRegistro = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE pacientes SET estatus=0 WHERE idpaciente= ?",
      [req.params.idpaciente]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///! REHABILITAR UN PACIENTE
export const volverRegistro = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE pacientes SET estatus=1 WHERE idpaciente= ?",
      [req.params.idpaciente]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///!BORRAR UN PACIENTE DEFINITIVAMENTE
export const eliminarUnRegistro = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM pacientes WHERE idpaciente= ?",
      [req.params.idpaciente]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///!TURNOS
////!listado de turnos

export const getTurnos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM pacientes  INNER JOIN turnos ON pacientes.idpaciente=turnos.idpaciente"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

////!dar permiso para atender sin turno

export const getPermiso = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE turnos SET estado = 1 WHERE idturnos = ?",
      [req.params.idturnos]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

////!listado de turnos de UN paciente

export const turnosPaciente = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM pacientes  INNER JOIN turnos ON pacientes.idpaciente=turnos.idpaciente WHERE pacientes.idpaciente = ?", [req.params.idpaciente]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ! crear un turno

export const crearTurno = async (req, res) => {
  try {
    const { fecha, idpaciente, fechafin, observac, cantidad, tanda, usadas, estado } = req.body;
    const result = await pool.query(
      "INSERT INTO turnos  (fecha, idpaciente, fechafin, observac, cantidad, tanda, usadas, estado) VALUES (?,?,?,?,?,?,?,?)",
      [fecha, idpaciente, fechafin, observac,cantidad, tanda, usadas, estado]
    );
    res.send("creando turno");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! borrar un turno

export const borrarTurno = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM turnos WHERE idturnos= ?", [
      req.params.idturnos,
    ]);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// //!CALCULAR EL TURNO MAXIMO

// export const maxTurno = async (req, res) => {
//   try {
//     const [result] = await pool.query(
//       "SELECT MAX(usadas) AS maximoUsadas FROM turnos WHERE idpaciente= ?", [
//         req.params.idpaciente,
//       ]
//     );
//     res.json(result);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

///!ACTIVIDADES
////!listado de ACTIVIDADES

export const getActividades = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM actividades `
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};


// ! crear una actividad

export const crearActividad = async (req, res) => {
  try {
    const { fecha, fechafin, observac } = req.body;
    const result = await pool.query(
      "INSERT INTO actividades  (fecha, fechafin, observac) VALUES (?,?,?)",
      [fecha, fechafin, observac]
    );
    res.send("creando actividad");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//!historial de turnos
export const historialTurnos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM turnos JOIN pacientes ON turnos.idpaciente = pacientes.idpaciente WHERE turnos.idpaciente = ?",
      [req.params.idpaciente]
    );
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! borrar una actividad

export const borrarActividad = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM actividades WHERE idactividad= ?", [
      req.params.idactividad,
    ]);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! LISTADO COMPLETO DE MUTUALES

export const getMutuales = async (req, res) => {
  try {
    const [result] = await pool.query(
      // `SELECT * FROM mutual  ORDER BY  nombremutual`
      // "SELECT m.idmutual AS 'IdMutual', m.nombremutual AS 'NombreMutual', COUNT(p.idpaciente) AS 'CantidadPacientes', m.valor AS 'ValorBono', SUM((t.quedan + CASE WHEN t.bono = 1 THEN 1 ELSE 0 END) * m.valor) AS 'ValorTotal' FROM mutual m LEFT JOIN pacientes p ON m.idmutual = p.mutualid AND p.estatus = 1 LEFT JOIN (SELECT idpaciente, MAX(fecha) AS ultima_fecha FROM turnos GROUP BY idpaciente) t_ultima ON p.idpaciente = t_ultima.idpaciente LEFT JOIN turnos t ON t.idpaciente = p.idpaciente AND t.fecha = t_ultima.ultima_fecha GROUP BY m.idmutual, m.nombremutual, m.valor;"

      // "SELECT idpaciente, SUM(cantidad) AS total_cantidad, (SELECT SUM(listo) FROM turnos t2 WHERE t2.idpaciente = t1.idpaciente) AS total_listo, SUM(cantidad) - (SELECT SUM(listo) FROM turnos t2 WHERE t2.idpaciente = t1.idpaciente) AS total_final FROM turnos t1 WHERE usadas = 0 GROUP BY idpaciente;"
      "SELECT m.idmutual AS idmutual, m.nombremutual AS nombremutual, COUNT(DISTINCT p.idpaciente) AS cantidad_pacientes, m.valor AS valor, SUM(CASE WHEN t.listo = 1 THEN 1 ELSE 0 END) AS total_listo, SUM(CASE WHEN t.usadas = 0 THEN t.cantidad ELSE 0 END) AS total_cantidad, (SUM(CASE WHEN t.usadas = 0 THEN t.cantidad ELSE 0 END) - SUM(CASE WHEN t.listo = 1 THEN 1 ELSE 0 END)) AS diferencia, ((SUM(CASE WHEN t.usadas = 0 THEN t.cantidad ELSE 0 END) - SUM(CASE WHEN t.listo = 1 THEN 1 ELSE 0 END)) * m.valor) AS valordiferencia FROM mutual m LEFT JOIN pacientes p ON m.idmutual = p.mutualid LEFT JOIN turnos t ON p.idpaciente = t.idpaciente GROUP BY m.idmutual, m.nombremutual, m.valor;"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};


// SELECT p.idpaciente, p.nombre, p.apellido, t.idturnos, t.cantidad, t.usadas, t.quedan, m.valor, (m.valor * (t.quedan + CASE WHEN t.bono = 1 THEN 1 ELSE 0 END)) AS resultado_multiplicacion FROM pacientes p JOIN turnos t ON p.idpaciente = t.idpaciente JOIN mutual m ON p.mutualid = m.idmutual WHERE t.idturnos = (SELECT MAX(t2.idturnos) FROM turnos t2 WHERE t2.idpaciente = p.idpaciente);


// 
//! LISTADO COMPLETO DE pacientes por mutual

export const getPacientesMutuales = async (req, res) => {
  try {
    const [result] = await pool.query(
     "SELECT p.*, m.nombremutual, t.cantidad, t.usadas FROM pacientes p JOIN mutual m ON p.mutualid = m.idmutual LEFT JOIN (SELECT idpaciente, cantidad, usadas FROM turnos WHERE (idturnos, idpaciente) IN (SELECT MAX(idturnos), idpaciente FROM turnos GROUP BY idpaciente)) t ON p.idpaciente = t.idpaciente WHERE m.idmutual = ?", [
        req.params.mutualid,
      ]

      // SELECT  pacientes.*, mutual.nombremutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual WHERE mutual.idmutual = ?"

      

    //  " SELECT pacientes.*, mutual.nombremutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual WHERE pacientes.idpaciente = ?",
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};


//!LLAMAR UN SOLO MUTUAL
export const getMutual = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM mutual WHERE idmutual= ?",
      [req.params.idmutual]
    );

    if (result.length === 0) {
      return res.status(404).json("No existe el id");
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//!EDITAR PACIENTE PARA CORRECCIONES

export const editarTarea = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      telefono,
      calle,
      numero,
      patologia,
      patasosc,
      fechacirugia,
      mutualid,
      afiliado,
      cantidad
    } = req.body;
    const [result] = await pool.query(
      "UPDATE pacientes SET ? WHERE idpaciente= ?",
      [req.body, req.params.idpaciente]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//!EDITAR MUTUAL PARA CORRECCIONES

export const editarMutual = async (req, res) => {
  try {
    const {
      nombremutual,
      valor,
    } = req.body;
    const [result] = await pool.query(
      "UPDATE mutual SET ? WHERE idmutual= ?",
      [req.body, req.params.idmutual]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ! crear una mutal

export const crearMutual = async (req, res) => {
  try {
    const { nombremutual, valor } = req.body;
    const result = await pool.query(
      "INSERT INTO mutual  (nombremutual, valor) VALUES (?,?)",
      [nombremutual, valor]
    );
    res.send("creando mutual");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! borrar una mutual

export const borrarMutual= async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM mutual WHERE idmutual= ?", [
      req.params.idmutual,
    ]);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//!LLAMAR imagenes de un paciente
export const getImagenes = async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT pacientes.*, imagenes.imagen, imagenes.descripcion FROM pacientes JOIN imagenes ON pacientes.idpaciente = imagenes.idpaciente WHERE imagenes.idpaciente = ?;",
      [req.params.idpaciente]
    );

    if (results.length === 0) {
      return res.status(200).json([]); // Devolver un arreglo vacío en lugar de un mensaje de error
    }

    res.json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ! ingresars una placa

export const crearHistoria = async (req, res) => {
  try {
    const {
      idpaciente,
      imagen,
      descripcion,
      comentario

      // const title = req.body.title;
      // const description = req.body.description;
      // const imagePath = req.file.path;

    } = req.body;
    const result = await pool.query(
      "INSERT INTO imagenes  (idpaciente, imagen, descripcion, comentario) VALUES (?,?,?,?)",
      [
        idpaciente,
        imagen,
        descripcion,
        comentario
      ]
    );
    res.send("creando historia");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//! DETERMINAR LA CNTIDAD DES SESIONES USADAS

export const getSesiones = async (req, res) => {
  try {
    const [results] = await pool.query(
     "SELECT turnos.idpaciente, MAX(tanda) AS maxTanda, MAX(usadas) AS maxUsadas, turnos.cantidad FROM turnos WHERE usadas = (SELECT MAX(usadas) FROM turnos WHERE turnos.idpaciente = ?)", [req.params.idpaciente]
       
    );

    if (results.length === 0) {
      return res.status(200).json([]); // Devolver un arreglo vacío en lugar de un mensaje de error
    }

    res.json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//! consulta para un paciente y sus sesiones

export const getTareaSesion = async (req, res) => {
  try {
    const [result] = await pool.query(
      " SELECT turnos.*, pacientes.* FROM turnos JOIN pacientes ON turnos.idpaciente = pacientes.idpaciente WHERE turnos.idpaciente = ? ORDER BY turnos.idTurnos DESC LIMIT 1",
      [req.params.idpaciente]
    );

    if (result.length === 0) {
      return res.status(404).json("No hay el id");
    }

    res.json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};


export const verTurno = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM turnos WHERE idturnos = ?'",
      [req.event.id]
    );

    if (result.length === 0) {
      return res.status(404).json("No hay el id");
    }

    res.json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};


//! actualiza las fecha de los turnos

export const actualizaTurno = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE turnos SET bono = CASE WHEN fecha <= NOW() THEN 0 WHEN fecha IS NULL THEN 0 ELSE bono END");

    if (result.length === 0) {
      return res.status(404).json("No hay el id");
    }

    res.json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//! calcula cuantos turnos pendientes tiene cada paciente


// export const turnoPendiente = async (req, res) => {
//   try {
//     const [result] = await pool.query(
//       "SELECT p.idpaciente AS NombrePaciente, m.idmutual AS IdMutual, m.valor AS ValorMutual, t.cantidad - COALESCE(t.usadas, 0) + CASE WHEN t.bono = 1 THEN 1 ELSE 0 END AS Quedan, m.valor * (t.cantidad - COALESCE(t.usadas, 0) + CASE WHEN t.bono = 1 THEN 1 ELSE 0 END) AS ValorPorQuedan FROM pacientes p JOIN mutual m ON p.mutualid = m.idmutual JOIN (SELECT idpaciente, cantidad, usadas, bono, ROW_NUMBER() OVER (PARTITION BY idpaciente ORDER BY fecha DESC) AS rn FROM turnos) t ON p.idpaciente = t.idpaciente AND t.rn = 1;"
//     );

//     if (result.length === 0) {
//       return res.status(404).json("No hay el id");
//     }

//     return res.json(result);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json("Error en la consulta");
//   }
// };





// SELECT pacientes.idpaciente AS NombrePaciente, mutual.idmutual AS IdMutual, SUM(turnos.bono) AS TotalBono, mutual.valor AS ValorMutual, SUM(turnos.bono) * mutual.valor AS Resultado, total.TotalValorMutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual JOIN turnos ON pacientes.idpaciente = turnos.idpaciente JOIN (SELECT mutual.idmutual, SUM(turnos.bono * mutual.valor) AS TotalValorMutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual JOIN turnos ON pacientes.idpaciente = turnos.idpaciente WHERE turnos.bono = 1 GROUP BY mutual.idmutual) AS total ON total.idmutual = mutual.idmutual WHERE turnos.bono = 1 GROUP BY pacientes.idpaciente, mutual.idmutual, mutual.valor


///! TURNO CUMPLIDO
export const listoTurno = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE turnos SET listo=1 WHERE idturnos= ?",
      [req.params.idturnos]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//! LLAMAR A UN PACIENTE POR EL TURNO

export const llamarTurno = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT p.*, t.fecha FROM pacientes p LEFT JOIN turnos t ON p.idpaciente = t.idpaciente WHERE p.estatus = 1 AND t.fecha > NOW() AND t.idturnos = ? ORDER BY t.fecha ASC LIMIT 1;`,[req.params.idturnos]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};