import React, { useState } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { SiProbot } from "react-icons/si";
import { IoCheckmarkDoneSharp } from "react-icons/io5";


function Chat() {
    const [history, setHistory] = useState([]);
    const [question, setQuestion] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [receivedResponse, setReceivedResponse] = useState(false); // Nuevo estado para indicar si se recibió una respuesta

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:10101/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ history: history, question: question })
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud fetch: ' + response.statusText);
            }

            const data = await response.json();

            setHistory([...history, { parts: question, role: 'user' }]);
            setHistory(data.history);
            setQuestion('');
            setMessageSent(true); // Indica que se ha enviado un mensaje
            setReceivedResponse(true); // Indica que se ha recibido una respuesta
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleChatButtonClick = () => {
        setShowChat(!showChat);
        setReceivedResponse(false); // Restablece el estado de receivedResponse al hacer clic en el botón
    };

    return (
        <div className="App">
            {showChat && (
                <div className="chat-container" style={{ backgroundColor: receivedResponse ? '#8f8ea3' : 'transparent' }}>
                    {history.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            <div className="message-bubble">{message.parts.replace(/\*\*/g, '')}</div>
                            {message.role === 'user' && messageSent && (
                                <div className="sent-icons">
                                    <IoCheckmarkDoneSharp className="sent-icon" />
                                </div>
                            )}
                        </div>
                    ))}
                    <form onSubmit={handleSubmit} className="input-form">
                        <input
                            type="text"
                            value={question}
                            onChange={handleInputChange}
                            placeholder="Escribe tu pregunta..."
                        />
                        <button id='envio' type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </form>
                </div>
            )}
            <footer>
                <button onClick={handleChatButtonClick} className="chat-button">
                    <SiProbot className="robot-icon" />
                </button>
            </footer>
        </div>
    );
}

export default Chat;
