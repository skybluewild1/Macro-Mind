import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const LoginUser = async (e) => {
    e.preventDefault()
     const {email, password} = data 
     try {
        const {data} = await axios.post('/login', {
          email,
          password
        });
        if(data.error) {
            toast.error(data.error)
        } else {
          setData({});
          navigate('/dashboard')
        }
     } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
     }     
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      padding: '10px',
    }}>
      <form 
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          boxSizing: 'border-box',
        }}
        onSubmit={LoginUser}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem', color: '#333' }}>Login</h2>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#555' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email} 
            onChange={(e) => setData({...data, email: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#555' }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={data.password} 
            onChange={(e) => setData({...data, password: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
        >
          Login
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9rem', color: '#777' }}>
          Don't have an account? <a href='/register' style={{ color: '#007BFF', textDecoration: 'none' }}>Register</a>
        </p>
      </form>
    </div>
  );
}
