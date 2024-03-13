import React, { useState } from "react";
import axios from "axios";
import "./AgregarGrua.css";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'; // Importa SweetAlert2
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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, type } = e.target;
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
      if (!gruaInfo.foto) {
        return;
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("marca", gruaInfo.marca);
      formData.append("modelo", gruaInfo.modelo);
      formData.append("capacidad", gruaInfo.capacidad);
      formData.append("whatsapp", gruaInfo.whatsapp);
      formData.append("foto", gruaInfo.foto);
      formData.append("clienteId", usuario.id);

      await axios.post(`${SERVER_URL}/gruas`, formData);

      setGruaInfo({
        marca: "",
        modelo: "",
        capacidad: "",
        whatsapp: "",
        foto: null,
      });

      setIsLoading(false);
      
      // Mostrar la alerta después de publicar la grúa
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Grua publicada",
        showConfirmButton: false,
        timer: 1500
      });
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
          </div>
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
            <button
              type="button"
              className="customFileInput"
              onClick={handleSelectFile}
            >
              Seleccionar archivo
            </button>
            {gruaInfo.foto && (
              <img
                className="imagenAgregar"
                src={URL.createObjectURL(gruaInfo.foto)}
                alt="Grua"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            )}
          </div>
          <button className="publicar" disabled={!gruaInfo.foto || isLoading}>
            {isLoading ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgregarGrua;
