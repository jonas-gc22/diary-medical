import React, { useEffect, useState } from 'react'
import Formulario from './components/Formularios';
import Cita from './components/Cita';

function App() {

  // Colocando citas em el localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  // Arreglo de citas
  const [ citas, guardarCitas ] = useState(citasIniciales);
  
  // Funcion que tome las citas actuales y guarde las nuevas.
  const crearCita = ( cita ) => {
      guardarCitas([
        ...citas,
        cita
      ]);
  };

  // Funcion que elimina una cita
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas'  : 'Administra tus citas';

  // Use Effect para realizar operaciones cuando el state cambia
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  return (
    <>
       <h1>Administrador de Pacientes</h1>

       <div className="container">
        
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}

          </div>
        </div>
      </div>

      <div className="footer">
        <footer>
          <p> Todos los derechos reservados &copy; Jonás García</p>
        </footer>
      </div>
              
    
    </>
  );
}

export default App;
