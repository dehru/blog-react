import { Post, Comment, PostStore } from "./postStore";
import './PostEl.css';
import React from "react";
import { CommentEl } from './CommentEl';

interface PostElProps {
    post: Post,
    onChange: Function
}
export class PostEl extends React.Component<PostElProps> {

    state: { post: Post, comments: Comment[] };
    postStore: PostStore;

    constructor(props: PostElProps) {
        super(props);
        this.postStore = new PostStore();
        this.state = { post: { title: '', body: '' }, comments: [] }
    }

    componentDidMount() {
        this.setState({ post: this.props.post });
        if (this.props.post.id) this.getComments(this.props.post.id);
    }
    titleChange(ev: React.KeyboardEvent<HTMLInputElement>) {
        this.setState({ post: { title : ev.currentTarget.value } });
    }
    bodyChange(ev: React.KeyboardEvent<HTMLTextAreaElement>) {
        this.setState({ post: { body : ev.currentTarget.value } });
    }
    getComments(id: number) {
        this.postStore.loadComments(id).then((comments) => {
            this.setState( { comments });
        })
    }
    change(e: React.MouseEvent) {
        if (this.state.post.title && this.state.post.body) {
            this.props.onChange(this.state.post);
        }
    }
    render() {
        return (
            <div className="post-wrapper">
                <input type="text" name="title" defaultValue={this.state?.post.title} onKeyUp={(ev) => this.titleChange(ev)}></input>
                <textarea name="body" defaultValue={this.state.post.body} onKeyUp={(ev) => this.bodyChange(ev)}></textarea>
                <button onClick={(e) => this.change(e)}>Submit</button>
                <div className="post-wrapper">
                   { this.state.comments.map( (comment: Comment) => <CommentEl key={comment.id} comment={comment}></CommentEl>)}
                </div>
            </div>
            
        )
    };
}