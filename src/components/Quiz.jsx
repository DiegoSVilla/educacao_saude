import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "O que são as ISTs e como elas são transmitidas?",
      options: [
        "A) Doenças transmitidas por alimentos contaminados",
        "B) Infecções transmitidas por contato sexual",
        "C) Infecções transmitidas pelo ar",
        "D) Doenças que afetam apenas o sistema digestivo",
      ],
      correctAnswer: "B"
    },
    {
      id: 2,
      question: "Quais são os principais sintomas das ISTs?",
      options: [
        "A) Dor de cabeça e febre",
        "B) Secreção anormal, feridas e coceira genital",
        "C) Fadiga e tosse",
        "D) Falta de apetite",
      ],
      correctAnswer: "B"
    },
    {
      id: 3,
      question: "Você sabe quais são os métodos de prevenção das ISTs?",
      options: [
        "A) Uso de preservativo em todas as relações sexuais",
        "B) Lavar as mãos antes de comer",
        "C) Vacinas contra gripe",
        "D) Evitar contato com animais",
      ],
      correctAnswer: "A"
    },
    {
      id: 4,
      question: "Além do HIV, quais outras doenças são consideradas ISTs?",
      options: [
        "A) Hepatite B, sífilis e gonorreia",
        "B) Resfriado comum e gripe",
        "C) Dengue e malária",
        "D) Câncer de pele e diabetes",
      ],
      correctAnswer: "A"
    },
    {
      id: 5,
      question: "É possível contrair uma IST mesmo usando preservativo?",
      options: [
        "A) Sim, mas o risco é muito menor",
        "B) Não, o preservativo oferece proteção 100%",
        "C) Apenas se o preservativo estiver vencido",
        "D) Não, desde que o preservativo seja de cor escura",
      ],
      correctAnswer: "A"
    },
    {
      id: 6,
      question: "Por que é importante fazer exames regularmente, mesmo sem sintomas?",
      options: [
        "A) Para saber se o corpo está produzindo vitaminas",
        "B) Porque algumas ISTs podem ser assintomáticas",
        "C) Para verificar o tipo sanguíneo",
        "D) Para prevenir dores musculares",
      ],
      correctAnswer: "B"
    },
    {
      id: 7,
      question: "As ISTs podem ser curadas ou controladas?",
      options: [
        "A) Todas as ISTs têm cura garantida",
        "B) Algumas ISTs têm cura, outras podem ser controladas",
        "C) Não, todas as ISTs são permanentes",
        "D) Nenhuma IST tem cura ou controle",
      ],
      correctAnswer: "B"
    },
    {
      id: 8,
      question: "Quais são as consequências de não tratar uma IST?",
      options: [
        "A) Aumento da imunidade do corpo",
        "B) Problemas graves de saúde, como infertilidade e complicações cardíacas",
        "C) Crescimento de cabelo mais rápido",
        "D) Diminuição da visão",
      ],
      correctAnswer: "B"
    },
    {
      id: 9,
      question: "Qual é a maneira mais eficaz de prevenir o HIV?",
      options: [
        "A) Evitar relações sexuais completamente",
        "B) Usar preservativos corretamente em todas as relações sexuais",
        "C) Tomar vitamina C regularmente",
        "D) Fazer exercícios físicos diariamente",
      ],
      correctAnswer: "B"
    },
    {
      id: 10,
      question: "Se uma pessoa é diagnosticada com uma IST, o que ela deve fazer?",
      options: [
        "A) Manter isso em segredo",
        "B) Informar seus parceiros sexuais e procurar tratamento médico",
        "C) Esperar que os sintomas desapareçam sozinhos",
        "D) Tomar um chá natural para curar",
      ],
      correctAnswer: "B"
    }
  ];

  const handleChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const submitQuiz = (e) => {
    e.preventDefault();
    let totalScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setSubmitted(true);

    // Formatar a string com as respostas e resultados
    const formattedResults = `Sua Nota: ${totalScore} de ${questions.length}\n` + 
      questions.map((q) => {
        const studentAnswer = answers[q.id] || 'Nenhuma resposta'; // Resposta do aluno
        const correctAnswer = q.correctAnswer; // Resposta correta
        const isCorrect = studentAnswer === correctAnswer ? 'Acertou' : 'Errou'; // Indicador de acerto
        return `Pergunta ${q.id}: ${studentAnswer} (Correta: ${correctAnswer}) - ${isCorrect}`;
      }).join('\n');

    // Enviar os dados do quiz por email, se necessário
    emailjs.send('service_1zs7rk6', 'template_d9j496c', { answers: formattedResults }, 'rZ6SJw_6XbxK37i4C')
      .then((result) => {
        alert('Quiz enviado com sucesso!');
      }, (error) => {
        alert('Erro ao enviar o quiz.');
      });
  };

  return (
    <div className="quiz-container">
      {!submitted ? (
        <form onSubmit={submitQuiz}>
          {questions.map((q) => (
            <div key={q.id} className="quiz-question">
              <p>{q.question}</p>
              {q.options.map((option, index) => (
                <div key={index} className="quiz-option">
                  <label>
                    <input
                      type="radio"
                      value={option.charAt(0)} // Pega a letra da opção (A, B, C, D)
                      name={`question-${q.id}`}
                      onChange={(e) => handleChange(e, q.id)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Enviar Quiz</button>
        </form>
      ) : (
        <div>
          <h2>Sua Nota: {score} de {questions.length}</h2>
          <h3>Respostas Corretas:</h3>
          {questions.map((q) => (
            <div key={q.id} className={`result-card ${answers[q.id] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
              <strong>{q.question}</strong> <br />
              Resposta Correta: {q.correctAnswer}) {q.options.find(opt => opt.charAt(0) === q.correctAnswer)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
