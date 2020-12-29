import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';
import Swal from 'sweetalert2';

const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  useEffect(() => {
    const rememberEmail = localStorage.getItem('email');
    if(rememberEmail) {
      setForm((form) => ({
        ...form,
        email: rememberEmail,
        rememberMe: true
      }))
    }
  }, [])

  const { email, password, rememberMe } = form;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const toggleCheck = () => {
    setForm({
      ...form,
      rememberMe: !rememberMe
    })
  }

  const handleOnSubmit = async e => {
    e.preventDefault();
    rememberMe ? localStorage.setItem('email', email) : localStorage.removeItem('email');
    const ok = await login(email, password);
    if(!ok) {
      Swal.fire('Error', 'Verifique usuario y contraseña', 'error')
    }
  }

  const isOk = () => {
    return (email.length > 0 && password.length > 0) ? true : false
  }

  return (
    <form 
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleOnSubmit}
    >
      <span className="login100-form-title mb-3">
        Chat - Ingreso
			</span>

      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100" 
          type="email" 
          name="email" 
          placeholder="Email"
          value={email}
          onChange={handleOnChange}
        />
        <span className="focus-input100"></span>
      </div>


      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100" 
          type="password" 
          name="password" 
          placeholder="Password"
          value={password}
          onChange={handleOnChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col" onClick={() => toggleCheck()}>
          <input 
            className="input-checkbox100" 
            id="ckb1" 
            type="checkbox" 
            name="rememberMe"
            checked={rememberMe}
            readOnly
          />
          <label className="label-checkbox100">
            Recordarme
					</label>
        </div>

        <div className="col text-right">
          <Link to='/auth/register' className="txt1">
            Nueva cuenta?
					</Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          className="login100-form-btn"
          disabled={!isOk()}
        >
          Ingresar
				</button>
      </div>

    </form>
  );
}
 
export default LoginPage;