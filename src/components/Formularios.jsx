import React, { Fragment, useState } from "react";
import uuid from "react-uuid";
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
  // State de Citas
  const [cita, setCitas] = useState({
    paciente: "",
    centroMedico: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  // State para el error de los campos
  const [error, actualizarError] = useState(false);

  // Destruction state  de citas   
  const { paciente, centroMedico, fecha, hora, sintomas } = cita;

  // Funcion para actualiazar state
  const actualizarState = e => {
    setCitas({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // Funcion para agregar cita dando click
  const submitCita = e => {
    e.preventDefault();

    // Validar
    if(
        paciente.trim() === '' || centroMedico.trim() === ''  
        || fecha.trim() === ''  || hora.trim() === ''  
        || sintomas.trim() === '' ) {
        actualizarError(true);
        return;
    }

    // Eliminar el mensaje previo 
    actualizarError(false);

    // Asignar un ID
    cita.id = uuid();

    // Crear la cita
    crearCita(cita);

    // Reiniciar el form
    setCitas({
        paciente: "",
        centroMedico: "",
        fecha: "",
        hora: "",
        sintomas: "",
    });
};


  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form 
        onSubmit={submitCita}
      >

        <label>Nombre del Paciente</label>
        <input
          type="text"
          name="paciente"
          className="u-full-width"
          placeholder="Nombre del Paciente"
          onChange={actualizarState}
          value={paciente}
        />

        <label>Centro Medico</label>
        <input
          type="text"
          name="centroMedico"
          className="u-full-width"
          placeholder="Hospital o Clinica"
          onChange={actualizarState}
          value={centroMedico}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          placeholder="Síntomas del paciente"
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
};

export default Formulario;
