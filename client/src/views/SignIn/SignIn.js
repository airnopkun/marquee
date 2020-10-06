import React, {useEffect, useState} from 'react';
import './SignIn.css'
import { Link, navigate } from '@reach/router'

export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onUserIDChange } = props;

  useEffect(() => {
    onUserIDChange(null);
  }, []);

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  //rewrite this with axios
  const onSubmitSignIn = (event) => {
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.user_id) {
        let userID = data.user_id
        onUserIDChange(userID);
        navigate("/library");
      }
    })
  }
  return (
    <div>
      <main className="mt7 pa4 orange helvetica">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0 glow">SIGN IN</legend>
            <div className="mt3">
              <label className="mb1 db fw6 lh-copy f6 glow" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset border-glow ba b--orange br2 bg-transparent hover-bg-transparent white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="mb1 pa1 db fw6 lh-copy f6 glow" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset border-glow ba b--orange br2 bg-transparent hover-bg-transparent white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={() => onSubmitSignIn()}
              className="b orange glow ph3 pv2 input-reset border-glow ba b--orange br2 bg-transparent grow pointer f6 dib"
              type="button"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <Link to={"/register"} className="f6 link dim pink glow db pa3 ma0 pointer">Register</Link>
            <a href="#0" className="f6 link dim pink glow db">Forgot your password?</a>
          </div>
        </form>
      </main>
    </div>
  );
}
