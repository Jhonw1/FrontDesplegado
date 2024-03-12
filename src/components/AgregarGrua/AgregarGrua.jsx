import React, { useState } from "react";
import axios from "axios";
import "./AgregarGrua.css";
import { useSelector } from "react-redux";
import { SERVER_URL } from '../../constants/constants';
function AgregarGrua() {
  const [gruaInfo, setGruaInfo] = useState({
    marca: "",
    modelo: "",
    capacidad: "",
    whatsapp: "+57",
    foto: null,
  });

  const usuario = useSelector((state) => state.client?.client);
  const [publicacionExitosa, setPublicacionExitosa] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, type } = e.target;

    // Si el campo es de tipo "file", accede al archivo seleccionado
    const fieldValue = type === "file" ? e.target.files[0] : e.target.value;

    setGruaInfo((prevInfo) => ({
      ...prevInfo,
      [name]: fieldValue,
    }));
  };

  const handleSelectFile = () => {
    document.getElementById("foto").click();
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      // Validar que se haya seleccionado una foto
      if (!gruaInfo.foto) {
        // Puedes mostrar un mensaje de error aquí
        return;
      }

      // Activar el indicador de carga
      setIsLoading(true);

      // Crear un objeto FormData y agregar la imagen y otros campos
      const formData = new FormData();
      formData.append("marca", gruaInfo.marca);
      formData.append("modelo", gruaInfo.modelo);
      formData.append("capacidad", gruaInfo.capacidad);
      formData.append("whatsapp", gruaInfo.whatsapp);
      formData.append("foto", gruaInfo.foto);
      formData.append("clienteId", usuario.id);

      // Realizar la solicitud POST al backend
      await axios.post(`${SERVER_URL}/gruas`, formData);

      // Limpiar el formulario después de la publicación exitosa
      setGruaInfo({
        marca: "",
        modelo: "",
        capacidad: "",
        whatsapp: "",
        foto: null,
      });

      // Desactivar el indicador de carga y mostrar mensaje de éxito
      setIsLoading(false);
      setPublicacionExitosa(true);

      // Recargar la página después de 2 segundos (ajusta el tiempo según tus necesidades)
     
    } catch (error) {
      console.error("Error al publicar la grúa:", error.message);
      // Puedes manejar el error de acuerdo a tus necesidades
    } finally {
      // Desactivar el indicador de carga después de la solicitud (éxito o fallo)
      setIsLoading(false);
    }
  };

  return (
    <div className="containerAgregar">
      <div className="containerInfoAgregar">
        <h2 className="tituloAgregar">Publicar nueva grúa</h2>
        <form
          className="formAgregar"
          onSubmit={handlePublish}
          encType="multipart/form-data"
          method="post"
        >
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

          {/* Nuevo campo para la foto */}
          <div className="campoFotoGrua">
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
            {/* Botón personalizado para seleccionar archivo */}
            <button
              type="button"
              className="customFileInput"
              onClick={handleSelectFile}
            >
              Seleccionar archivo
            </button>
            {/* Mostrar la foto seleccionada con tamaño reducido */}
            {gruaInfo.foto && (
              <img
                className="imagenAgregar"
                src={URL.createObjectURL(gruaInfo.foto)}
                alt="Grua"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            )}
          </div>
          {/* Agregar mensaje de éxito */}
          {publicacionExitosa && <p>La grúa se publicó exitosamente.</p>}

          {/* Botón de publicar con indicador de carga */}
          <button className="publicar" disabled={!gruaInfo.foto || isLoading}>
            {isLoading ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgregarGrua;
