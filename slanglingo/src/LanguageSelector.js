import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function LanguageSelector() {
  const [selectOption, setSelectOption] = useState('English');
  const handleSelect = (event) => {
    setSelectOption(event.target.textContent);
  }
  return (
    <DropdownButton className="language-selector" title={selectOption}>
      <Dropdown.Item href="#/action-1" onClick={handleSelect}>English</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={handleSelect}>Spanish</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={handleSelect}>Chinese</Dropdown.Item>
      <Dropdown.Item href="#/action-4" onClick={handleSelect}>Japanese</Dropdown.Item>
    </DropdownButton>
  );
}

export default LanguageSelector;