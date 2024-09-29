import React, { useState } from 'react';

const Menu = ({ navigateTo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (page) => {
    navigateTo(page);
    setIsOpen(false); // Fecha o menu ao selecionar uma opção
  };

  return (
    <div className="menu-icon">
      {/* Ícone de menu */}
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu dropdown */}
      <div className={`menu-content ${isOpen ? 'open' : ''}`}>
        <button onClick={() => handleNavigation('home')}>Perguntas Frequentes</button>
        <button onClick={() => handleNavigation('send-question')}>Mande sua Dúvida</button>
        <button onClick={() => handleNavigation('quiz')}>Quiz</button>
      </div>
    </div>
  );
};

export default Menu;
