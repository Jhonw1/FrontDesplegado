import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AgregarGrua.css";
import { useSelector } from "react-redux";
import { SERVER_URL } from '../../constants/constants';

function AgregarGrua() {
  const [gruaInfo, setGruaInfo] = useState({
    marca: "",
    modelo: "",
    capacidad: "0kg",
    ubicacion: "",
    whatsapp: "+57",
    foto: null,
  });

  const [gruas, setGruas] = useState([]);
  const usuario = useSelector((state) => state.client?.client);
  const [publicacionExitosa, setPublicacionExitosa] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  useEffect(() => {
    if (gruaInfo.ubicacion) {
      axios
        .get(`${SERVER_URL}/gruas?ubicacion=${gruaInfo.ubicacion}`)
        .then((response) => {
          setGruas(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las grúas:", error);
        });
    }
  }, [gruaInfo.ubicacion]);

  const handleInputChange = (e) => {
    const { name, type, value } = e.target;
    if (name === "ubicacion") {
      setGruaInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    } else {
      const fieldValue = type === "file" ? e.target.files[0] : value;
      setGruaInfo((prevInfo) => ({
        ...prevInfo,
        [name]: fieldValue,
      }));
    }
  };

  const handleSelectFile = () => {
    document.getElementById("foto").click();
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!gruaInfo.whatsapp.trim() || !gruaInfo.foto) {
      setErrorMensaje("Complete todos los campos.");
      return;
    }
    if (!gruaInfo.modelo.trim() || !gruaInfo.capacidad.trim() || !gruaInfo.ubicacion.trim()) {
      setErrorMensaje("Complete todos los campos.");
      return;
    }
    if (!/^\d+$/.test(gruaInfo.modelo)) {
      setErrorMensaje("Por favor, ingrese solo números en el campo Modelo.");
      return;
    }
    if (!/^\d+kg$/.test(gruaInfo.capacidad.trim())) {
      setErrorMensaje("Por favor, ingrese un número válido seguido de 'kg' en el campo Capacidad.");
      return;
    }

    setErrorMensaje("");

    try {
      setIsLoading(true);

      

      const formData = new FormData();
      formData.append("marca", gruaInfo.marca);
      formData.append("modelo", gruaInfo.modelo);
      formData.append("capacidad", gruaInfo.capacidad);
      formData.append("whatsapp", gruaInfo.whatsapp);
      formData.append("ubicacion", gruaInfo.ubicacion);

   
      
     


     // Agregar la URL de la imagen al formulario
      formData.append("clienteId", usuario.id);

      // Publicar la grúa enviando el formulario al servidor
      await axios.post(`${SERVER_URL}/gruas`, formData);

      setGruaInfo({
        marca: "",
        modelo: "",
        capacidad: "0kg",
        whatsapp: "",
        ubicacion: "",
        foto: null,
      });

      setIsLoading(false);
      setPublicacionExitosa(true);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error al publicar la grúa:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="containerAgregar">
    <div className="containerInfoAgregar">
      <form
        className="formAgregar"
        onSubmit={handlePublish}
        encType="multipart/form-data"
        method="post"
      >
        <h2 className="tituloAgregar">Publicar nueva grúa</h2>
  
        <div className="containerFormulario">
          <div>
            <label className="labelAgregar" htmlFor="marca">
              Marca:
            </label>
            <input
              className="inputAgregar"
              type="text"
              id="marca"
              name="marca"
              value={gruaInfo.marca}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="labelAgregar" htmlFor="modelo">
              Modelo:
            </label>
            <input
              className="inputAgregar"
              type="text"
              id="modelo"
              name="modelo"
              value={gruaInfo.modelo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="labelAgregar" htmlFor="capacidad">
              Capacidad:
            </label>
            <input
              className="inputAgregar"
              type="text"
              id="capacidad"
              name="capacidad"
              value={gruaInfo.capacidad}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="labelAgregar" htmlFor="whatsapp">
              Numero Whatsapp:
            </label>
            <input
              className="inputAgregar"
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={gruaInfo.whatsapp}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="labelAgregar" htmlFor="ubicacion">
              Ubicación:
            </label>
            <select
              className="inputAgregar"
              id="ubicacion"
              name="ubicacion"
              value={gruaInfo.ubicacion}
              onChange={handleInputChange}
            >
              <option value="">...</option>
              {ciudades.map((ciudad, index) => (
                <option className="opcionesCiudades" key={index} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <div className="campoFotoGrua">
          {gruaInfo.foto ? (
            <img
              className="imagenAgregar"
              src={URL.createObjectURL(gruaInfo.foto)}
              alt="Grua"
              style={{ maxWidth: "400px", maxHeight: "400px" }}
            />
          ) : (
            <img
              className="imagenAgregar"
              src="https://cdn-icons-png.flaticon.com/128/11423/11423562.png"
              alt="Grua"
              style={{ maxWidth: "400px", maxHeight: "400px" }}
            />
          )}
          <label className="labelAgregar" htmlFor="foto">
            Foto de la grúa:
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="foto"
            name="foto"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="customFileInput"
            onClick={handleSelectFile}
          >
            Seleccionar archivo
          </button>
        </div>
  
        <div className="publicarGrua">
          {errorMensaje && (
            <p className="errorMessage">{errorMensaje}</p>
          )}
          {publicacionExitosa && <p>La grúa se publicó exitosamente.</p>}
          <button className="publicar" disabled={isLoading}>
            {isLoading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export default AgregarGrua;

const ciudades = [
  "Medellín",
  "Bogotá",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Cúcuta",
  "Soledad",
  "Ibagué",
  "Soacha",
  "Santa Marta",
  "Villavicencio",
  "Bucaramanga",
  "Neiva",
  "Bello",
  "Valledupar",
  "Pereira",
  "Montería",
  "Pasto",
  "Manizales",
  "Armenia",
  "Montenegro",
  "Popayán",
  "Floridablanca",
  "Sincelejo",
  "Envigado",
  "Tumaco",
  "Tunja",
  "Girardot",
  "Facatativá",
  "Maicao",
  "Zipaquirá",
  "Florencia",
  "Barrancabermeja",
  "Chía",
  "Duitama",
  "Sogamoso",
  "Tierralta",
  "Ipiales",
  "Ríohacha",
  "Tuluá",
  "Calarca",
  "Circacia",
  "La Tebaida",
  "Quimbaya",
  "salento",
  "Alcalá",
  "Filandia"
];