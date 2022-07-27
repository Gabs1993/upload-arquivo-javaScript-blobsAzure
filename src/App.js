import { useState } from 'react';
import './App.css';
import { deletar, download, read, upload } from './service/upload';



function App() {

  const [selectedFile, setSelectedFile] = useState('');
  const [fileName, setFileName] = useState('');

  const handleChangeUpload = ({ target: { files } }) => {
    console.log(files);
    setSelectedFile(files[0]);
  };

  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
  };

  const uploadArquivo = async () => {
    try {
      const data = new FormData();
      data.append('ArquivoGrupoEconomico', selectedFile);

      await upload(data);
      setSelectedFile('');
    } catch {
      console.log('ruim');
    }

  }

  const readArquivo = async () => {
    try {
      const { request: { responseURL } } = await read(fileName);
      window.open(responseURL, '_blank');
    } catch {
      console.log('deu ruim');
    }
  };

  const downloadArquivo = async () => {
    try {
      const { request: { responseURL } } = await download(fileName);
      window.open(responseURL, '_self');
    } catch {
      console.log('ruim');
    }
  };

  const deleteArquivo = async () => {
    try {
      await deletar(fileName);
      setFileName('');
    } catch {
      console.log('ruim');
    }
  };

  return (
    <div className="App">
        <h2>React file upload Example</h2>
      <div>
        <h3>Upload</h3>
        <div>
          <label>Select File</label>
          <input type="file" name="MyFile" accept="application/pdf" onChange={handleChangeUpload} />
        </div>
        <div>
          <button type="button" onClick={uploadArquivo}>
            Upload
          </button>
        </div>
      </div>
      <div>
        <h3>Read / Download / Delete</h3>
        <input type="text" placeholder='nomearquivo.pdf' value={fileName} onChange={(e) => handleChange(e, setFileName)}/>
        <br></br>
        <button type='button' onClick={readArquivo}>Visualizar</button>
        <button type='button' onClick={downloadArquivo}>Download</button>
        <button type='button' onClick={deleteArquivo}>Delete</button>
      </div>
    </div>
  );
}

export default App;
