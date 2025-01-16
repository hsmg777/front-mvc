import React, { useState } from "react";
import './styles/Core.css';
import { buscarGastos } from './ComandPattern';

const Core = () => {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!fechaInicio || !fechaFin) {
            alert("Por favor, selecciona ambas fechas.");
            return;
        }

        if (fechaInicio > fechaFin) {
            alert("La fecha de inicio no puede ser mayor que la fecha de fin.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const data = await buscarGastos(fechaInicio, fechaFin);
            setResultados(data);
        } catch (error) {
            setError("Ocurrió un error al realizar la consulta. Inténtalo nuevamente.");
            console.error("Error al realizar la consulta:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-page">
            <div className="head-main">
                <h1>MVC CORE HOMEWORK</h1>
            </div>
            <div className="body-main">
                <div className="input-filtrado">
                    <p>Fecha inicio:</p>
                    <input 
                        type="date" 
                        value={fechaInicio} 
                        onChange={(e) => setFechaInicio(e.target.value)} 
                    />
                    <p>Fecha fin:</p>
                    <input 
                        type="date" 
                        value={fechaFin} 
                        onChange={(e) => setFechaFin(e.target.value)} 
                    />
                    <button className="search-button" onClick={handleSearch} disabled={loading}>
                        {loading ? "Buscando..." : "Search"}
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="resultados">
                    {loading ? (
                        <p>Cargando resultados...</p>
                    ) : resultados.length > 0 ? (
                        <table className="tabla-resultados">
                            <thead>
                                <tr>
                                    <td>Departamento</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {resultados.map((resultado, index) => (
                                    <tr key={index}>
                                        <td>{resultado.departamento}</td>
                                        <td>{resultado.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron resultados para las fechas seleccionadas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Core;
