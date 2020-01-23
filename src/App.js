import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { logInUser, loadUser } from './js/actions/actions';

const mapStateToProps = state => ({
  state: state
});
class App extends React.Component {
  state = {
    user: { login: '', password: '', email: '' }
  };
  onChangeHandler = e =>
    this.setState({
      ...this.state,
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  handleAdd = () => this.props.logInUser(this.state.user);

  componentDidMount() {
    console.log(
      'TCL: App -> componentDidMount -> this.props.loadUser()',
      this.props.loadUser()
    );
    this.props.loadUser(localStorage.getItem('token'));
  }
  render() {
    return (
      <div className='App'>
        <input
          type='text'
          placeholder='login'
          name='login'
          onChange={this.onChangeHandler}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          onChange={this.onChangeHandler}
        />
        <input
          type='email'
          placeholder='email'
          name='email'
          onChange={this.onChangeHandler}
        />
        <button onClick={this.handleAdd}>login</button>
      </div>
    );
  }
}
export default connect(mapStateToProps, {
  logInUser,
  loadUser
})(App);
