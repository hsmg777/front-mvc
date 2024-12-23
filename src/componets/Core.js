import React, { useState } from "react";
import './styles/Core.css';

const Core = () => {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);

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
        try {
            const response = await fetch("http://127.0.0.1:5000/gastos/filtrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                }),
            });

            if (!response.ok) throw new Error("Error al obtener datos");
            const data = await response.json();
            setResultados(data);
        } catch (error) {
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

                <div className="resultados">
                    {resultados.length > 0 ? (
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
