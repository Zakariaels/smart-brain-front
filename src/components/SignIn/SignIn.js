import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SignInEmail: '',
      SignInPassword: '',
      wrongCredentials: false
    }
  }

  onEmailChnage = (event) => {
    this.setState({ SignInEmail: event.target.value })
  }

  onPasswordChnage = (event) => {
    this.setState({ SignInPassword: event.target.value })
  }

  wrongCredentials = [];

  onSubmitSignIn = () => {
    fetch('https://dry-reef-41263.herokuapp.com/signin', { 
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.SignInEmail,
        password: this.state.SignInPassword
      })
     }).then(resp => resp.json())
       .then(user => {
         if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
         } else {
            this.setState({
              wrongCredentials: true
            })
         }
       })
  }

  render() {
    const { onRouteChange } = this.props;  
  


    return (
      <article className ="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow center"> 
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input onChange = { this.onEmailChnage } 
                         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                         type="email" 
                         name="email-address"  
                         id="email-address" />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input onChange = { this.onPasswordChnage } 
                         className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                         type="password" 
                         name="password"  
                         id="password" />
                </div>
              </fieldset>
              <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                       type="submit" 
                       value="Sign in" 
                       onClick = {this.onSubmitSignIn} 
                />
                {
                  this.state.wrongCredentials === true ?
                    <div>
                      <p style = {{color: 'red'}}> Wrong Credentials! </p>
                    </div> 
                    :
                    <div></div>
                }
              </div>
              <div className="lh-copy mt3">
                <p href="#0" className="f6 link dim black db pointer" onClick = { () => onRouteChange('register') } >Register</p>
              </div>
            </div>
          </main>
      </article>

  );

}}


export default SignIn;