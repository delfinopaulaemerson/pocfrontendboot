import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if(!email || !password) {
      setError("Por favor, complete todos os campos.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if(email === "admin@test.com" && password === "admin") {
            resolve();
          } else {
            reject(new Error('E-mail ou senha incorretos.'));
          }
        }, 1500);
      });
       navigate("/app");
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        
        {error && <div style={styles.errorContainer}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Senha</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                style={styles.inputPassword}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            style={{...styles.button, backgroundColor: loading ? '#a0aec0' : '#4f46e5'}}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};


const styles = {
    container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#1f2937',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.9rem',
    color: '#4b5563',
    fontWeight: 'bold',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
  },
  passwordWrapper: {
    display: 'flex',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  inputPassword: {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    fontSize: '1rem',
    outline: 'none',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    padding: '0 1rem',
    color: '#4f46e5',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
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
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
    border: '1px solid #fca5a5',
  },
};
export default LoginForm;
    
    


   
  