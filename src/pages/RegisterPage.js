import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = form;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const msg = await register(name, email, password);
    if (msg !== true) {
      Swal.fire('Error', msg, 'error');
    }
  }

  const isOk = () => {
    return (name.length > 0 && email.length > 0 && password.length > 0) ? true: false;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="login100-form validate-form flex-sb flex-w"
    >
      <span className="login100-form-title mb-3">
        Chat - Registro
			</span>

      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100" 
          type="text" 
          name="name" 
          placeholder="Nombre"
          value={name}
          onChange={handleOnChange}
        />
        <span className="focus-input100"></span>
      </div>


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
        <div className="col text-right">
          <Link to='/auth/login' className="txt1">
            Ya tienes cuenta?
					</Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          className="login100-form-btn"
          disabled={!isOk()}
        >
          Crear cuenta
				</button>
      </div>

    </form>
  );
}
 
export default RegisterPage;