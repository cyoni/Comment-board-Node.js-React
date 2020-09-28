import React from 'react';
import axios from 'axios';

class App extends React.Component {

  state = {
    title: '',
    body: '',
    posts: [],
    buttonTitle: 'Send',
    isCancelButtonVisible: "none"
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
        console.log('data has been received')
      })
      .catch(() => {
        console.log('error retrieving data')
      })
  }

  submit = (event) => {
    event.preventDefault()
    const payload = {
      title: this.state.title,
      body: this.state.body,
      postIdToEdit: this.state.postIdToEdit
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
      body: '',
      buttonTitle: 'Send',
      postIdToEdit: null,
      isCancelButtonVisible: "none"
    })
  }

  removePost = (key) => {
    axios({
      url: 'api/removePost',
      method: 'POST',
      data: { key: key }
    })
      .then(() => {
        console.log('data has been sent')
        this.getPosts()
      })
      .catch(() => {
        console.log('there is a problem')
      })
  }

  loadPost = (postId) => {
/*
    this.setState(prevState => {
      const updatedToDos = prevState.posts.map(todo => {
        if (todo._id === postId) {
          todo.title = " new title "
        }
        return todo
      })
      return {
        posts: updatedToDos,
      }
    })
    */

    const posts = this.state.posts
    posts.map(current => {
      if (current._id === postId) {

        this.setState({
          title: current.title,
          body: current.body,
          buttonTitle: 'Edit',
          postIdToEdit: postId, 
          isCancelButtonVisible: "inline"
        })
      }
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
            <li>
              <span onClick={this.loadPost.bind(this, post._id)}>Edit</span>
            </li>
            <li>
              <span onClick={this.removePost.bind(this, post._id)}>Remove</span>
            </li>
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
          <button>{this.state.buttonTitle}</button>
          <button onClick={this.resetFields} style={{ display: this.state.isCancelButtonVisible }}>Cancel</button>
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
