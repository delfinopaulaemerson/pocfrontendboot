import axios from "axios";
import { useState } from "react";
import "./FileUploadComponent.css";

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');

    // Captura o arquivo selecionado pelo usuário
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setMessage('');
        }
    };

    // Função de envio com Axios
    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setMessage('Por favor, selecione um arquivo primeiro.');
            return;
        }

        const formData = new FormData();
        // A chave 'file' deve corresponder ao que o seu backend espera (ex: upload.single('file'))
        formData.append('file', file);

        setUploading(true);
        setProgress(0);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8081/api/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // Monitoramento em tempo real do progresso do upload
                onUploadProgress: (progressEvent) => {
                    const total = progressEvent.total || file.size;
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
                    setProgress(percentCompleted);
                },
            });

            setMessage('Upload realizado com sucesso!');
            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            setMessage(`Erro ao enviar arquivo: ${errorMsg}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div id="container-upload">
            <h2>Upload File</h2>
            
            <form onSubmit={handleUpload}>
                <div style={{ marginBottom: '15px' }}>
                    <input  style={{...styles.button, backgroundColor: '#4f46e5'}}  type="file" onChange={handleFileChange} />
                </div>
                <div id="upload-buuton">
                <button
                    style={{...styles.button, backgroundColor: '#4f46e5'}} 
                    type="submit" 
                    disabled={uploading || !file}
                   
                >
                   
                    {uploading ? 'Enviando...' : 'Enviar Arquivo'}
                </button>
                 </div>
            </form>

            {/* Barra de progresso nativa */}
            {uploading && (
                <div style={{ marginTop: '20px' }}>
                    <progress value={progress} max="100" style={{ width: '100%' }} />
                    <span style={{ fontSize: '14px', marginLeft: '8px' }}>{progress}%</span>
                </div>
            )}

            {/* Mensagem de status */}
            {message && (
                <p style={{ marginTop: '15px', color: message.includes('sucesso') ? 'green' : 'red' }}>
                    {message}
                </p>
            )}
        </div>
    );
}

const styles = {

button: {
    color: '#ffffff',
    padding: '0.75rem',
    borderRadius: '6px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '0.5rem',
}

}