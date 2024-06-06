import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function LanguageSelector({setLanguage, language}) {
  const handleSelect = (event) => {
    setLanguage(event.target.textContent);
  }
  return (
    <DropdownButton className="language-selector" title={language} variant='dark'>
      <Dropdown.Item href="#/action-1" onClick={handleSelect}>English</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={handleSelect}>Spanish</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={handleSelect}>Chinese</Dropdown.Item>
      <Dropdown.Item href="#/action-4" onClick={handleSelect}>Japanese</Dropdown.Item>
      <Dropdown.Item href="#/action-5" onClick={handleSelect}>Russian</Dropdown.Item>
      <Dropdown.Item href="#/action-6" onClick={handleSelect}>Hindi</Dropdown.Item>
      <Dropdown.Item href="#/action-7" onClick={handleSelect}>Korean</Dropdown.Item>
      <Dropdown.Item href="#/action-8" onClick={handleSelect}>Portuguese</Dropdown.Item>
      <Dropdown.Item href="#/action-9" onClick={handleSelect}>German</Dropdown.Item>
      <Dropdown.Item href="#/action-10" onClick={handleSelect}>French</Dropdown.Item>
      <Dropdown.Item href="#/action-11" onClick={handleSelect}>Italian</Dropdown.Item>
    </DropdownButton>
  );
}

export default LanguageSelector;