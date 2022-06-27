import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PostStore, Post } from './postStore';
import { PostEl } from './PostEl';

type AppPostState = {
  posts: Post[],
  selected?: Post
}
class App extends React.Component {

  postStore: PostStore;
  state: AppPostState = {
    posts: []
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
    this.postStore.loadOne(id).then(selected => {
      this.setState({ selected });
    });

  }

  changePost(post: Post) {
    this.postStore.update(post).then(() => {
      this.loadAll();
    });
  }
  
  render() {
    const selected = this.state.selected ? <PostEl post={this.state.selected} onChange={(e: Post) => this.changePost(e)}></PostEl> : <h2>Select a post</h2>;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Posts</h1>
        </header>
        <nav>
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
