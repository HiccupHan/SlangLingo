import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function LanguageSelector() {
  return (
    <DropdownButton className="language-selector" title="English">
      <Dropdown.Item href="#/action-1">English</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Spanish</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Chinese</Dropdown.Item>
      <Dropdown.Item href="#/action-4">Japanese</Dropdown.Item>
    </DropdownButton>
  );
}

export default LanguageSelector;