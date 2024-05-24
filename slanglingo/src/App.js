import LanguageSelector from './LanguageSelector';
import TextBox from './TextBox';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mic_img from './icon/mic.webp';

function App() {
  return (
    <div className="App">
      <header>
        SlangLingo
      </header>
      <div className="main-body">
        <div className="text-box" id="text-input">
          <LanguageSelector />
          <TextBox />
        </div>
        <div className="text-box" id="translation-output">
          <LanguageSelector />
          <TextBox />
        </div>
      </div>
      <div id="input-butt-container">
        <button id="translate-butt">Translate</button>
        <button id="mic-butt"><img src={mic_img} alt='mic button'/></button>
      </div>

    </div>
  );
}

export default App;
