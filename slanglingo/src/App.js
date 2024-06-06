import LanguageSelector from './LanguageSelector';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mic_img from './icon/mic.webp';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
function App() {
  const [originalText, setOriginalText] = useState({originaltext: ''});
  const [translatedText, setTranslatedText] = useState({translatedtext: ''});
  const [slangPrompt, setSlangPrompt] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [originLanguage, setOriginLanguage] = useState("English");
  const HTTP = "http://localhost:8020/translate";
  const translatePrompt1 = "Here are one or more English sentences that may contain slangs. Tanslate the sentences into ";
  const translatePrompt2 = ", substituting slangs with equivalent phrases.\nThe sentence ";
  const inputText = (event) => {
    const {name,value} = event.target;
    setTranslatedText((prevText) => ({...prevText, ["translatedtext"]: ""}))
    setOriginalText((prevText) => ({...prevText, [name]: value}));
  }
  const handleTranslate = (event) => {
    event.preventDefault();
    axios.post(`${HTTP}`, {prompt: originalText.originaltext, translate: false})
    .then(res=>{
      setSlangPrompt(res.data.response);
      const translateFullPrompt = translatePrompt1 + targetLanguage + translatePrompt2 + slangPrompt;
      console.log(translateFullPrompt);
      axios.post(`${HTTP}`, {prompt: originalText.originaltext, translate: true, systemPrompt: translateFullPrompt})
      .then(res=>{
        setTranslatedText((prevText) => ({...prevText, ["translatedtext"]: res.data.response}))
      })
      .catch((error) =>{
        console.error(error);
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <div className="App">
      <header>
        SlangLingo
      </header>
      <div className="main-body">
        <div className="text-box" id="text-input">
          <LanguageSelector setLanguage={setOriginLanguage} language={originLanguage}/>
          <Form onSubmit={handleTranslate}>
            <Form.Group className="text-area" controlId="formOrginalText">
              <Form.Control as="textarea" type='input-text' name='originaltext' className='no-resize' value={originalText.originaltext} rows={11} placeholder='Enter Text' onChange={inputText}/>
            </Form.Group>
            <Button id='translate-butt' variant='primary' type='submit'>Translate</Button>
          </Form>
        </div>
        <div className="text-box" id="translation-output">
          <LanguageSelector setLanguage={setTargetLanguage} language={targetLanguage}/>
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
