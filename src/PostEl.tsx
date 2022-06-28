import { Post, Comment, PostStore } from "./postStore";
import './PostEl.css';
import React from "react";
import { CommentEl } from './CommentEl';

interface PostElProps {
    post?: Post,
    onChange: Function
}
interface PostElState {
    post?: Post,
    comments: []
}
export class PostEl extends React.Component<PostElProps> {

    state: PostElState = { post: { id: undefined, title: '', body: '' }, comments: [] };
    postStore: PostStore;

    constructor(props: PostElProps) {
        super(props);
        this.postStore = new PostStore();
    }

    shouldComponentUpdate(nextProps: PostElProps) {
        if (this.state.post !== nextProps.post) {
            this.setState(nextProps);
            return true;
        }
        else {
            return false;
        }
    }

    componentDidMount() {
        if (this.props.post) {
            this.setState({ post: this.props.post });
            if (this.props.post.id) this.getComments(this.props.post.id);
        }
    }
    titleChange(ev: React.KeyboardEvent<HTMLInputElement>) {
        ev.preventDefault();
        const newState = { post: { title: ev.currentTarget.value } };
        this.setState((state: PostElState, props) => {
            return { post: { ...state.post, ...newState.post } };
        });
    }
    bodyChange(ev: React.KeyboardEvent<HTMLTextAreaElement>) {
        ev.preventDefault();
        const newState = { post: { body: ev.currentTarget.value } }
        this.setState((state: PostElState, props) => {
            return {
                post: { ...state.post, ...newState.post }
            };
        });
    }
    getComments(id: number) {
        this.postStore.loadComments(id).then((comments) => {
            this.setState( { comments });
        })
    }
    change(e: React.MouseEvent) {
        console.log(this.state.post);
        if (this.state.post?.title && this.state.post?.body) {
            this.props.onChange(this.state.post);
        }
    }
    render() {
        return (
            <div className="post-wrapper">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" defaultValue={this.state.post?.title} placeholder="My awesome blog post" onKeyUp={(ev) => this.titleChange(ev)}></input>
                <textarea name="body" placeholder="Your awesome prose here" defaultValue={this.state.post?.body} onKeyUp={(ev) => this.bodyChange(ev)}></textarea>
                <button type="submit" onClick={(e) => this.change(e)}>Submit</button>
                <div className="comments-wrapper">
                   { this.state.comments.map( (comment: Comment) => <CommentEl key={comment.id} comment={comment}></CommentEl>)}
                </div>
            </div>
            
        )
    };
}