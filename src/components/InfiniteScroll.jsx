import React, { useState, useEffect } from 'react';

const allQuestions = [
  {
    question: "Só contrai IST quem tem muitos parceiros sexuais.",
    answer: "Mito – Qualquer pessoa pode contrair uma IST, independentemente do número de parceiros. O risco está ligado à falta de proteção, não à quantidade de parceiros."
  },
  {
    question: "É possível pegar uma IST na primeira vez que você faz sexo.",
    answer: "Verdade – As ISTs podem ser transmitidas em qualquer relação sexual desprotegida, independentemente de ser a primeira vez ou não."
  },
  {
    question: "As ISTs sempre apresentam sintomas visíveis.",
    answer: "Mito – Muitas ISTs podem ser assintomáticas, ou seja, não apresentar sintomas visíveis, mas ainda assim causar danos à saúde."
  },
  {
    question: "O uso de preservativo é eficaz na prevenção de todas as ISTs.",
    answer: "Verdade – O preservativo é altamente eficaz, mas não 100%. Algumas ISTs, como o HPV e o herpes, podem ser transmitidas pelo contato com a pele não coberta pelo preservativo."
  },
  {
    question: "Fazer sexo oral ou anal sem proteção também pode transmitir ISTs.",
    answer: "Verdade – ISTs podem ser transmitidas por qualquer tipo de contato sexual desprotegido, incluindo sexo oral e anal."
  },
  {
    question: "Se os sintomas de uma IST desaparecerem, a infecção está curada.",
    answer: "Mito – Mesmo que os sintomas desapareçam, a infecção pode ainda estar presente no corpo. Somente o tratamento adequado pode curar ou controlar uma IST."
  },
  {
    question: "A única forma de prevenir o HIV é não fazer sexo.",
    answer: "Mito – O uso correto de preservativos e a profilaxia pré-exposição (PrEP) são formas eficazes de prevenção do HIV, além da abstinência."
  },
  {
    question: "As ISTs só afetam pessoas jovens.",
    answer: "Mito – As ISTs podem afetar pessoas de todas as idades que tenham relações sexuais desprotegidas."
  }
];

const InfiniteScroll = () => {
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0); // Índice para controlar o carregamento de perguntas

  // Função para adicionar mais perguntas
  const loadMoreQuestions = () => {
    setLoading(true);
    setTimeout(() => {
      const nextQuestions = allQuestions.slice(index, index + 4); // Carregar 5 perguntas
      setDisplayedQuestions((prevQuestions) => [...prevQuestions, ...nextQuestions]);
      setIndex((prevIndex) => prevIndex + 4); // Atualizar o índice
      setLoading(false);
    }, 1000);
  };

  // Efeito para detectar o scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && index < allQuestions.length) {
        loadMoreQuestions();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, index]);

  // Carregar as primeiras 5 perguntas quando o componente é montado
  useEffect(() => {
    loadMoreQuestions();
  }, []);

  return (
    <div className="infinite-scroll">
      {displayedQuestions.map((item, idx) => (
        <div key={idx} className="question-item">
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
      {loading && <div className="loading">Carregando...</div>}
    </div>
  );
};

export default InfiniteScroll;
