import { useRef } from 'react';
import { processJSON, processText } from '../FetchRoutines';
import { useContext } from 'react';
import AuthContext from '../AuthContext';

function HomePage({setJwt}) {
  const jwt = useContext(AuthContext);

    function confirmLogin(jwt) {
      alert("You are logged in to your account.");
      setJwt(jwt);
    }

    function handleLogin(user) {
        fetch('http://localhost:8085/user/login', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then(processJSON)
        .then(confirmLogin)
        .catch(() => { alert("Login failed"); });
    }

    function handleNewAccount(user) {
      fetch('http://localhost:8085/user/create', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
          'Content-type': 'application/json; charset=UTF-8'
          }
      })
      .then(processText)
      .then(confirmLogin)
      .catch(() => {alert("Create new account failed")});
    }

    function handleLogout() {
        alert("You are logged out of your account.");
        setJwt('');
    }

    let nameInput = useRef();
    let passwordInput = useRef();

    const loginAction = (e) => { handleLogin({name:nameInput.current.value,password:passwordInput.current.value}); }
    const newAction = (e) => { handleNewAccount({name:nameInput.current.value,password:passwordInput.current.value}); }
    
  return (
    <div>
      {jwt ? (
        <div>
          <PostsFeed jwt={jwt} />
          {/* The option to log out should be under account tab in the navbar */}
          <h4>Log out of your account</h4>
          <p>
            <button onClick={handleLogout}>Log Out</button>
          </p>
        </div>
        ):(
        <div>
            <h2>Welcome to our application!</h2>
            <h4>Log in to your account</h4>
            <p>User name: <input type="text" ref={nameInput} /></p>
            <p>Password: <input type="text" ref={passwordInput} /></p>
            <p><button onClick={loginAction}>Log In</button><button onClick={newAction}>New Account</button></p>
            <h4>Log out of your account</h4>
            <p><button onClick={handleLogout}>Log Out</button></p>
        </div>
      )}
    </div> 
  )
}

export default HomePage;