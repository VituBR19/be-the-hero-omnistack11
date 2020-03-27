import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

export default function NewIncident() {

    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.ongId

    useEffect(() => {
        if(!ongId) {
            return history.push('/')
        }
    }, [])

    async function handleIncident(event) {
        event.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                },
            })

            alert(`Caso criado com id ${response.data.id}`)
            history.push('/profile')
        } catch (error) {
            alert(`O caso não pode ser criado, tente novamente. ${error}`)
        }
    }

    return(
        <div className="incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontarr um heroipara resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleIncident}>
                    <input placeholder="Título do caso"
                        value={title}
                        onChange={event => setTitle(event.target.value)} />

                    <textarea placeholder="Descrição" 
                        value={description}
                        onChange={event => setDescription(event.target.value)} />
                    
                    <input placeholder="Valor em R$" 
                        value={value}
                        onChange={event => setValue(event.target.value)} />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}