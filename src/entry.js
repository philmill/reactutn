import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
window.React = React;

import marked from 'marked';
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

  render() {
    return (
      <div className="commentBox">
        <CommentList comments={this.state.data}/>
        <CommentForm />
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
        >
          {comment.text}
        </Comment>
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
  render() {
    return (
      <div className="commentForm">
        Hello I'm a CommentForm
      </div>
    );
  }
}

class Comment extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    children: PropTypes.any
  }

  rawMarkup = () => {
    const markup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: markup};
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="https://www.googleapis.com/books/v1/volumes?q=cat+inauthor:kurt+vonnegut"/>,
  document.getElementById('content')
);
