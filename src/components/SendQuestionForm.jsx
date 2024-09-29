import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const SendQuestionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.send('service_1zs7rk6', 'template_8708v7l', { email, message }, 'rZ6SJw_6XbxK37i4C')
      .then((result) => {
        alert('Dúvida enviada com sucesso!');
        // Limpar os campos após o envio
        setName('');
        setEmail('');
        setMessage('');
      }, (error) => {
        alert('Erro ao enviar, tente novamente.');
      });
  };

  return (
    <div className="send-question-container">
      <div className="send-question-card">
        <h2>Envie sua Pergunta</h2>
        <form onSubmit={sendEmail}>
          <input
            type="email"
            name="email"
            placeholder="Seu E-mail, se quiser que respondamos por email!"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="send-question-input"
            required
          />
          <textarea
            name="message"
            placeholder="Sua Dúvida"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="send-question-textarea"
            required
          />
          <button type="submit" className="send-question-button">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default SendQuestionForm;
