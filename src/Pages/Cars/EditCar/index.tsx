// EditEncuesta.tsx

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './EditCar.scss'; // Asegúrate de crear este archivo de estilos
import { initialFormEdit, mockFactors } from '../../../utils/Constants/Constants';
import { Factors } from '../../../utils/Interfaces/Interfaces';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Login from '../../Auth/Login';

const EditEncuesta: React.FC = () => {
    const { surveyId } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialFormEdit);
    const token = localStorage.getItem('token') ?? '';

    useEffect(() => {
        const getFindSurvey = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: `${import.meta.env.VITE_BASE_URL}/api/car/${surveyId}`,
                    headers: {
                        Authorization: `bearer ${token}`
                    },
                };

                const response = await axios.request(options).then(function (response) {
                    return response.data
                }).catch(function (error) {
                    alert('No se pudo buscar.');
                    console.error(error);
                });

                if (response?.find) {
                    setFormData(response?.data)
                }
            } catch (error) {
                console.error('Error al buscar:', error)
            }
        }
        if (surveyId) {
            getFindSurvey()
        }
    }, [surveyId, token]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.identification_customer.trim() && formData.car_model.trim() && formData.factors.trim() && formData.id_customer) {
            try {
                const options = {
                    method: 'PUT',
                    url: `${import.meta.env.VITE_BASE_URL}/api/car/update/${surveyId}`,
                    headers: {
                        Authorization: `bearer ${token}`
                    },
                    data: {
                        id_customer: formData.id_customer,
                        identification_customer: formData.identification_customer.trim(),
                        car_model: +formData.car_model,
                        factors: formData.factors.trim(),
                        test_drive_qualification: +formData.test_drive_qualification,
                        satisfaction_rating: +formData.satisfaction_rating
                    }
                };

                const response = await axios.request(options).then(function (response) {
                    return response.data
                }).catch(function (error) {
                    alert('No se pudo buscar.');
                    console.error(error);
                });

                if (response.updated) {
                    console.log({ formData, options, response })
                    navigate('/test_frontend_i4digital/listar_autos')
                }
            } catch (error) {
                console.error('Error al editar:', error)
            }
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1799 }, (_, i) => (currentYear - i).toString());

    if (!token) {
        return <Login />;
    }

    return (
        <div className="edit-encuesta">
            <h2>Editar Encuesta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Identificación del Cliente:</label>
                    <input
                        type="text"
                        name="identification_customer"
                        value={formData.identification_customer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Año del Automóvil:</label>
                    <select
                        name="car_model"
                        value={formData.car_model}
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
                        name="factors"
                        value={formData.factors}
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
                        name="test_drive_qualification"
                        value={formData.test_drive_qualification}
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
                        name="satisfaction_rating"
                        value={formData.satisfaction_rating}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Editar Auto</button>
            </form>
        </div>
    );
};

export default EditEncuesta;
