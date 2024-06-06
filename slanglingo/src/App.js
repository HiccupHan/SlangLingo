import LanguageSelector from './LanguageSelector';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mic_img from './icon/mic.webp';
import recording_img from './icon/recording.webp';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [originalText, setOriginalText] = useState({ originaltext: '' });
  const [translatedText, setTranslatedText] = useState({ translatedtext: '' });
  const [slangPrompt, setSlangPrompt] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [originLanguage, setOriginLanguage] = useState("English");
  const [slangs, setSlangs] = useState({});
  const [displaySlangs, setDisplaySlangs] = useState(false);
  const [modalText, setModalText] = useState("No Slangs Detected")
  const HTTP = "http://localhost:8020/translate";
  const translatePrompt1 = "Here are one or more English sentences that may contain slangs. Tanslate the sentences into ";
  const translatePrompt2 = ", substituting slangs with equivalent phrases.\nThe sentence ";

  const [show, setShow] = useState(false);
  const [triggerAction, setTriggerAction] = useState(false);
  const [useTranscript, setUseTranscript] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  if(!browserSupportsSpeechRecognition){
    console.log("cannot use speech recognition");
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setModalText("");
    for (let slang in slangs) {
      const translateFullPrompt = translatePrompt1 + targetLanguage + translatePrompt2 + "does not contain any slangs";
      setModalText(prevText => `${prevText}${slang + ": "}`);
      axios.post(`${HTTP}`, { prompt: slangs[slang], translate: true, systemPrompt: translateFullPrompt })
        .then(res => {
          setModalText(prevText => `${prevText}${res.data.response}\n`);
          console.log(displaySlangs);
        })
        .catch((error) => {
          console.error(error);
        })
    }
    if (modalText == "") {
      setModalText("Does not contain any slangs.");
    }
  }
  const inputText = (event) => {
    setUseTranscript(false);
    resetTranscript();
    const { name, value } = event.target;
    setTranslatedText((prevText) => ({ ...prevText, ["translatedtext"]: "" }))
    setOriginalText((prevText) => ({ ...prevText, [name]: value }));
    setSlangs({});
    setDisplaySlangs(false);
  }
  const handleTranslate = (event) => {
    event.preventDefault();
    axios.post(`${HTTP}`, { prompt: originalText.originaltext, translate: false })
      .then(res => {
        setSlangPrompt(res.data.response);
        if (!res.data.response.includes("does not contain any slangs")) {
          const lines = res.data.response.trim().split('\n');
          const header = lines[0];
          if (header.toLowerCase().includes("contains slangs:")) {
            lines.shift();
          }
          let slangMap = {};
          for (let line of lines) {
            const slangDef = line.split('-');
            if (slangDef.length === 2) {
              const slang = slangDef[0].trim();
              const definition = slangDef[1].trim();
              slangMap[slang] = definition;
            }
          }
          setSlangs(slangMap);
          setDisplaySlangs(true);
          console.log(slangMap);
        }
        const translateFullPrompt = translatePrompt1 + targetLanguage + translatePrompt2 + slangPrompt;
        console.log(translateFullPrompt);
        axios.post(`${HTTP}`, { prompt: originalText.originaltext, translate: true, systemPrompt: translateFullPrompt })
          .then(res => {
            setTranslatedText((prevText) => ({ ...prevText, ["translatedtext"]: res.data.response }))
          })
          .catch((error) => {
            console.error(error);
          })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const changeTargetLanguage = (len) => {
    setTargetLanguage(len);
    setTranslatedText((prevText) => ({ ...prevText, ["translatedtext"]: "" }))
    if(originalText.originaltext != ""){
      setTriggerAction(true);
    }
  }

  useEffect(() => {
    if (triggerAction) {
      const translateFullPrompt = translatePrompt1 + targetLanguage + translatePrompt2 + slangPrompt;
      console.log(translateFullPrompt);
      axios.post(`${HTTP}`, { prompt: originalText.originaltext, translate: true, systemPrompt: translateFullPrompt })
        .then(res => {
          setTranslatedText((prevText) => ({ ...prevText, ["translatedtext"]: res.data.response }))
        })
        .catch((error) => {
          console.error(error);
        })
      setTriggerAction(false);
    }
  }, [targetLanguage, triggerAction]);

  const startListening = () =>{
    setUseTranscript(true);
    SpeechRecognition.startListening();
  }

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setOriginalText((prevText) => ({ ...prevText, ["originaltext"]: transcript }));
  }

  const handleRecord  = () => {
    listening ? stopListening():startListening();
  }

  return (
    <div className="App">
      <header>
        SlangLingo
      </header>
      <div className="main-body">
        <div className="text-box" id="text-input">
          <LanguageSelector setLanguage={setOriginLanguage} language={originLanguage} />
          <Form onSubmit={handleTranslate}>
            <Form.Group className="text-area" controlId="formOrginalText">
              <Form.Control as="textarea" type='input-text' name='originaltext' className='no-resize' value={useTranscript? transcript : originalText.originaltext} rows={11} placeholder='Enter Text' onChange={inputText} />
            </Form.Group>
            <Button id='translate-butt' type='submit' variant='dark'>Translate</Button>
            <img src={listening ? recording_img : mic_img} id='mic-butt' onClick={handleRecord}/>
          </Form>
        </div>
        <div className="text-box" id="translation-output">
          <LanguageSelector setLanguage={changeTargetLanguage} language={targetLanguage} />
          <Form>
            <Form.Group className="text-area" controlId="formTranslatedText">
              <Form.Control as="textarea" type='input-text' name='translatedtext' className='no-resize' value={translatedText.translatedtext} rows={11} placeholder='Translate' readOnly />
            </Form.Group>
          </Form>
        </div>
      </div>
      {displaySlangs && <Button id='slang-butt' onClick={handleShow} variant='dark'>Slangs</Button>}
      <Modal show={show} onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Slangs</Modal.Title>
        </Modal.Header>
        <Modal.Body className='preserve-whitespace'>{modalText.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
