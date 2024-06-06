import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function LanguageSelector({setLanguage, language}) {
  const handleSelect = (event) => {
    setLanguage(event.target.textContent);
  }
  return (
    <DropdownButton className="language-selector" title={language}>
      <Dropdown.Item href="#/action-1" onClick={handleSelect}>English</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={handleSelect}>Spanish</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={handleSelect}>Chinese</Dropdown.Item>
      <Dropdown.Item href="#/action-4" onClick={handleSelect}>Japanese</Dropdown.Item>
    </DropdownButton>
  );
}

export default LanguageSelector;