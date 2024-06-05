import LanguageSelector from './LanguageSelector';
import TextBox from './TextBox';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mic_img from './icon/mic.webp';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

function App() {
  const [originalText, setOriginalText] = useState({originaltext: ''});
  const [translatedText, setTranslatedText] = useState({translatedtext: ''});

  const inputText = (event) => {
    const {name,value} = event.target;
    setOriginalText((prevText) => ({...prevText, [name]: value}));
  }

  return (
    <div className="App">
      <header>
        SlangLingo
      </header>
      <div className="main-body">
        <div className="text-box" id="text-input">
          <LanguageSelector />
          <Form>
            <Form.Group className="text-area" controlId="formOrginalText">
              <Form.Control as="textarea" type='input-text' name='originaltext' className='no-resize' value={originalText.originaltext} rows={11} placeholder='Enter Text' onChange={inputText}/>
            </Form.Group>
            <Button id='translate-butt'>Translate</Button>
          </Form>
        </div>
        <div className="text-box" id="translation-output">
          <LanguageSelector />
          <Form>
            <Form.Group className="text-area" controlId="formTranslatedText">
              <Form.Control as="textarea" type='input-text' name='translatedtext' className='no-resize' value={translatedText.translatedtext} rows={11} placeholder='Translate' readOnly/>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
