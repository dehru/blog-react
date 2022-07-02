import React from 'react';
import './App.css';
import { PostStore, Post } from './postStore';
import { PostEl } from './PostEl';

type AppPostState = {
  posts: Post[],
  comments?: Comment[],
  selected?: Post
}
class App extends React.Component {

  postStore: PostStore;
  state: AppPostState = {
    posts: [],
    comments: [],
    selected: undefined
  };
  constructor(props = {}, state = {}) {
    super(props, state);
    this.postStore = new PostStore();
  }

  componentDidMount() {
    this.loadAll();
  }
  loadAll() {
    this.postStore.loadAll().then(posts => {
      this.setState({ posts });
    });
  }

  loadOne(id: number) {
    this.postStore.loadOne(id).then(post => {
      const newState = { selected: post };
      this.setState(newState);
    }).then(() => {
      this.postStore.loadComments(id).then((comments) => {
        this.setState({ comments });
    })
    });
  }

  changePost(post: Post) {
    debugger;
    this.setState({ selected: { ...this.state.selected, ...post } } );
  }

  submitPost() {
    debugger;
    if (this.state.selected) {
      if (this.state.selected?.id) {
        this.postStore.update(this.state.selected).then(() => {
          this.setState({ selected: undefined });
          this.loadAll();
        });
      } else {
        this.postStore.create(this.state.selected).then(() => {
          this.setState({ selected: undefined });
          this.loadAll();
        });
      }
    }
  }
  
  render() {
    const selected = <PostEl post={this.state.selected} onChange={(e: Post) => this.changePost(e)} onSubmit={(e: Post) => this.submitPost()}></PostEl>;
    return (
      <div className="App">
        <header className="app-header">
          <h1>My Blog</h1>
        </header>
        <nav>
          <strong>Select a post below:</strong>
          <ul>
            {this.state.posts.map((post: Post) => { return <li key={post.id} onClick={() => { if (post.id) { this.loadOne(post.id); } }}>{post.title}</li> })}
          </ul>
        </nav>
        <main>
          { selected }
        </main>
      </div>
    );
  }
}

export default App;
