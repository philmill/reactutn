import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
window.React = React;

import reqwest from 'reqwest';

class CommentBox extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    data: PropTypes.array
  }

  state = {
    data: []
  }

  componentDidMount() {
    reqwest({
      url: this.props.url,
      method: 'get',
      success: (resp) => {
        this.setState({data: this.reduceToList(resp)});
      },
      error: (err) => { console.log(err.toString()); }
    });
  }

  reduceToList(resp) {
    return (
      resp.items.map((item, index) => {
        return ({
          id: index,
          author: item.volumeInfo.authors.toString(),
          text: (item.volumeInfo.description === undefined) ?
            'no description' :
            item.volumeInfo.description
        });
      })
    );
  }

  handleCommentSubmit = (comment) => {
    const comments = this.state.data;
    comment.id = Date.now();
    this.setState({data: [...comments, comment]});
  }

  render() {
    return (
      <div className="commentBox">
        <CommentList comments={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
}

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired
  }

  render() {
    const commentNodes = this.props.comments.map((comment) => {
      return (
        <Comment
          key={comment.id}
          author={comment.author}
          text={comment.text}
        />
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class CommentForm extends Component {
  static propTypes = {
    onCommentSubmit: PropTypes.func.isRequired
  }

  state = {
    author: '',
    text: ''
  }

  handleAuthorChange = (e) => {
    this.setState({author: e.target.value});
  }

  handleTextChange = (e) => {
    this.setState({text: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author, text});
    this.setState({author: '', text: ''});
  }

  render() {
    return (
      <form
        className="commentForm"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say Something ..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
          type="submit"
          value="Add Comment"
        />
      </form>
    );
  }
}

class Comment extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <p>
          {this.props.text}
        </p>
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="https://www.googleapis.com/books/v1/volumes?q=cat+inauthor:kurt+vonnegut"/>,
  document.getElementById('content')
);
