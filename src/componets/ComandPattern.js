export const buscarGastos = async (fechaInicio, fechaFin) => {
    const response = await fetch("https://api-web-latest-nbk1.onrender.com//gastos/filtrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fechaInicio, fechaFin }),
    });
    if (!response.ok) throw new Error("Error al obtener datos");
    return await response.json();
};
