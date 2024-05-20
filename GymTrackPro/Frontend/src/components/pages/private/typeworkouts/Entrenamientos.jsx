import "../typeworkouts/css/TypeWorkouts.css";
import { useState, useEffect } from "react";
import { Global } from "../../../../helpers/Global";
import fuerza from "../../../../assets/image/fuerza.jpg";
import resistencia from "../../../../assets/image/resistencia.jpg";
import hipertrofia from "../../../../assets/image/hipertrofia.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";

const Entrenamientos = () => {
  const [workoutData, setWorkoutData] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await fetch(Global.url + "workouts/workout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!request.ok) {
          throw new Error("Hubo un problema al obtener los datos.");
        }

        const data = await request.json();

        setWorkoutData(data.typeWorkout);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  if (!workoutData) {
    return <div>Cargando...</div>;
  }

  // Definir los tipos de ejercicios disponibles con su información
  const tiposEjercicio = [
    {
      tipo: "Fuerza",
      image: fuerza,

      descripcion: (
        <p>
          Los ejercicios de fuerza, centrados en levantar pesos o realizar
          movimientos que desafían los músculos, mejoran la fuerza muscular y la
          resistencia.Los beneficios incluyen mejora en la fuerza, salud ósea,
          metabolismo y cardiovascular, reduciendo el riesgo de lesiones y
          promoviendo la liberación de endorfinas para la salud mental.
        </p>
      ),
    },
    {
      tipo: "Resistencia",
      image: resistencia,
      descripcion: (
        <p>
          Los ejercicios de resistencia fortalecen los músculos con pesas,
          bandas elásticas o el propio peso corporal.Mejoran la resistencia
          muscular y aeróbica, ofrecen beneficios como aumento de la fuerza,
          salud cardiovascular mejorada, control del azúcar, bienestar mental,
          emocional, control del peso y mejora del sueño.
        </p>
      ),
    },
    {
      tipo: "Hipertrofia",
      image: hipertrofia,
      descripcion: (
        <p>
          La hipertrofía se enfoca en aumentar el tamaño de los músculos
          mediante el entrenamiento de fuerza con pesas y resistencia. Este tipo
          de ejercicio busca estimular el crecimiento muscular a través de
          repeticiones y cargas específicas.Los beneficios incluyen aumento de
          la masa muscular, mejora del rendimiento físico, fortalecimiento de
          los huesos y reducción del riesgo de lesiones.
        </p>
      ),
    },
  ];

  // Función para manejar el clic en un tipo de ejercicio
  const handleTipoSeleccionado = (tipo) => {
    if (tipo === tipoSeleccionado) {
      setTipoSeleccionado(null); //con este deseleccionamos si hacemos nuevamente click.
    } else {
      setTipoSeleccionado(tipo); //con este si el tipo seleccionado es diferente, lo mantiene como seleccionado.
    }
  };

  const scrollUp = () => {
    const scrollStep = -window.scrollY / (3000 / 20);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };
  return (
    <div className="workout-content">
      <div className="types">
        {tiposEjercicio.map((tipoEjercicio) => (
          <div
            className="type"
            key={tipoEjercicio.tipo}
            onClick={() => handleTipoSeleccionado(tipoEjercicio.tipo)}
          >
            <div className="image-container">
              <img
                src={tipoEjercicio.image}
                alt={tipoEjercicio.tipo}
                className="image-workout"
              />
            </div>
            <p className="type-workout">{tipoEjercicio.tipo}</p>
            <p className="workout-description">{tipoEjercicio.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Mostrar los ejercicios según el tipo seleccionado */}
      {tipoSeleccionado && (
        <div className="workout">
          {workoutData
            .filter(
              (entrenamiento) => entrenamiento.workoutType === tipoSeleccionado
            )

            .map((entrenamiento) => (
              <div key={entrenamiento._id}>
                <p className="name">{entrenamiento.name}</p>
                <img
                  className="imagenes"
                  src={`${Global.url}workouts/image/${entrenamiento.image}`}
                  alt={entrenamiento.name}
                />
                <p className="series">Series: {entrenamiento.additionalInfo}</p>
                <p className="description">{entrenamiento.description}</p>
              </div>
            ))}
          <button className="scroll-up" onClick={scrollUp}>
            <FontAwesomeIcon icon={faCircleUp} size="2xl" className="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Entrenamientos;
