import React, { useState, ChangeEvent, FormEvent } from 'react';
import './NewCar.scss';

const NuevoAuto: React.FC = () => {
    const [formData, setFormData] = useState({
        identificacion: '',
        modelo: '2023',
        factoresCompra: '',
        calificacionPrueba: 1,
        calificacionSatisfaccion: 1,
    });
    const token = localStorage.getItem('token');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1799 }, (_, i) => (currentYear - i).toString());

    if (!token) {
        return null;
    }

    return (
        <div className="nuevo-auto">
            <h2>Registrar Nuevo Auto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Identificación del Cliente:</label>
                    <input
                        type="text"
                        name="identificacion"
                        value={formData.identificacion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Año del Automóvil:</label>
                    <select
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleChange}
                        required
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Factores de Compra:</label>
                    <select
                        name="factoresCompra"
                        value={formData.factoresCompra}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Reputación de la Marca">Reputación de la Marca</option>
                        <option value="Opciones de Financiamiento">Opciones de Financiamiento</option>
                        <option value="Desempeño al Manejarlo">Desempeño al Manejarlo</option>
                        <option value="Recomendaciones">Recomendaciones de Amigos o Familiares</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>
                <div>
                    <label>Calificación de Prueba de Manejo (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="calificacionPrueba"
                        value={formData.calificacionPrueba}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Calificación de Satisfacción (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="calificacionSatisfaccion"
                        value={formData.calificacionSatisfaccion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrar Auto</button>
            </form>
        </div>
    );
}


export default NuevoAuto;
