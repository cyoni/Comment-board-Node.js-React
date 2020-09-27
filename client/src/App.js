import React from 'react';
import axios from 'axios';

class App extends React.Component {



  state = {
    title: '',
    body: '',
    posts: []
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  componentDidMount = () => {
    this.getPosts()
  }


  getPosts = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data
        this.setState({ posts: data })
        console.log('data has been receoved')
      })
      .catch(() => {
        console.log('error retrieving data')
      })
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
        this.getPosts()
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

  removePost = (key) => {
    
    axios({
      url: 'api/removePost',
      method: 'POST',
      data: {key: key}
    })
      .then(() => {
        console.log('data has been sent')
      })
      .catch(() => {
        console.log('there is a problem!')
      })
  }

  printPosts = () => {
    
    const posts = this.state.posts
   
    return posts.map((post, index) => (
  
      <div className="post" key={index}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div className="post_links">
          <ul>
            <li><a>Edit</a></li>
            <li><a onClick={this.removePost.bind(this, post._id)}>Remove</a></li>
          </ul>
        </div>
      </div>
    ))
  }

  render() {

    return (
      <div>
        <h2>Posts</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="title"
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

        <div>
          <h3>Latest Posts:</h3>
          {this.printPosts()}
        </div>
      </div>
    )

  }
}

export default App;
