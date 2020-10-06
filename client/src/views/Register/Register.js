import React, {useEffect, useState} from 'react';
import './Register.css';
import { Link } from '@reach/router';

export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
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
  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  const onNameChange = (event) => {
    setName(event.target.value)
  }
  //Rewrite this in axios
  const onSubmitRegister = (event) => {
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      onUserIDChange(data.id)
    })
  }
  return (
    <div>
      <main className="mt7 pa4 orange helvetica">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0 glow">REGISTER</legend>
            <div className="mt3">
              <label className="mb1 db fw6 lh-copy f6 glow" htmlFor={"username"}>Username</label>
              <input
                className="pa2 input-reset border-glow ba b--orange br2 bg-transparent hover-bg-transparent white w-100"
                type="text"
                name="username"
                id="username"
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="mb1 db fw6 lh-copy f6 glow" htmlFor={"email-address"}>Email</label>
              <input
                className="pa2 input-reset border-glow ba b--orange br2 bg-transparent hover-bg-transparent white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="mb1 pa1 db fw6 lh-copy f6 glow" htmlFor={"password"}>Password</label>
              <input
                className="b pa2 input-reset border-glow ba b--orange br2 bg-transparent hover-bg-transparent white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
            {/*<div className="mv3">*/}
            {/*  <label className="mb1 pa1 db fw6 lh-copy f6 glow" htmlFor={"confirm"}>Confirm Password</label>*/}
            {/*  <input*/}
            {/*      className="b pa2 input-reset border-glow ba b--orange br2 bg-transparent hover-bg-transparent hover-white w-100"*/}
            {/*      type="password"*/}
            {/*      name="confirm"*/}
            {/*      id="confirm"*/}
            {/*      onChange={onConfirmPasswordChange}*/}
            {/*  />*/}
            {/*</div>*/}
          </fieldset>
          <div className="">
            <input
              onClick={() => onSubmitRegister()}
              className="b orange glow ph3 pv2 input-reset border-glow ba b--orange br2 bg-transparent grow pointer f6 dib"
              type="button"
              value="Register"
            />
          </div>
          <div className="lh-copy mt3">
            <Link to={"/"} className="f6 link dim pink glow db pa3 pointer ma0">Sign in</Link>
            {/*<a href="#0" className="f6 link dim pink glow db">Forgot your password?</a>*/}
          </div>
        </form>
      </main>
    </div>
  );
}
