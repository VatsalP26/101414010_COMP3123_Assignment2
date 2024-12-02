import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/employees'); // Redirect to employees page after login
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        {error && <p style={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.text}>
          Don't have an account? <button onClick={() => navigate('/signup')} style={styles.link}>Signup</button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #6e7bff, #3a4fb1)',
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '30px 40px',
    borderRadius: '10px',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeIn 1s ease-out',
  },
  heading: {
    fontSize: '2.2rem',
    color: '#333',
    fontWeight: '600',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#6e7bff',
  },
  button: {
    padding: '14px',
    borderRadius: '8px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  errorText: {
    color: 'red',
    fontSize: '0.9rem',
  },
  text: {
    fontSize: '1rem',
    marginTop: '20px',
    color: '#333',
  },
  link: {
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  }
};

export default Login;
