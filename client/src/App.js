import React from 'react';
import axios from 'axios';

class App extends React.Component {


  state = {
    title: '',
    body: ''
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }


  submit = (event) => {
    event.preventDefault()
    const payload = {
      title: this.state.title,
      body: this.state.body
    }

    axios({
      url: 'api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('data has been sent')
        this.resetFields()
      })
      .catch(() => {
        console.log('there is a problem!')
      })

  }


  resetFields = () => {
    this.setState({
      title: '',
      body: ''
    })
  }

  render() {

    console.log('state: ', this.state)

    return (
      <div>
        <h2>hello</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-input">
            <textarea
              placeholder="body"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
              cols="30"
              rows="10" />
          </div>
          <button>Send</button>
        </form>
      </div>
    )

  }
}

export default App;
