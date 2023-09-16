import React, { useState, ChangeEvent, FormEvent } from 'react';
import './NewCar.scss';
import Login from '../Auth/Login';
import { Factors } from '../../utils/Interfaces/Interfaces';
import { initialFormCreate, mockFactors } from '../../utils/Constants/Constants';
import uniqid from 'uniqid';
import axios from 'axios';

const NuevoAuto: React.FC = () => {
    const [formData, setFormData] = useState(initialFormCreate);
    const token = localStorage.getItem('token');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { identificacion, modelo, factoresCompra, calificacionPrueba, calificacionSatisfaccion } = formData;
        const idCustomer = uniqid()
        if (identificacion.trim() && modelo.trim() && factoresCompra.trim()) {
            try {
                const options = {
                    method: 'POST',
                    url: `${import.meta.env.VITE_BASE_URL}/api/car/create`,
                    data: {
                        id_customer: idCustomer,
                        identification_customer: identificacion.trim(),
                        car_model: +modelo,
                        factors: factoresCompra.trim(),
                        test_drive_qualification: +calificacionPrueba,
                        satisfaction_rating: +calificacionSatisfaccion
                    },
                    headers: {
                        Authorization: `bearer ${token}`
                    },
                };

                const response = await axios.request(options).then(function (response) {
                    return response.data
                }).catch(function (error) {
                    alert('No se pudo crear.');
                    console.error(error);
                });

                if (response.created) {
                    setFormData(initialFormCreate)
                }
            } catch (error) {
                console.error('Error al crear:', error)
            }
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1799 }, (_, i) => (currentYear - i).toString());

    if (!token) {
        return <Login />;
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
                        {mockFactors.map((item: Factors) => (
                            <option key={item.label} value={item.value}>
                                {item.label}
                            </option>
                        ))}
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
