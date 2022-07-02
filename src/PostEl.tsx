import { Post, Comment, PostStore } from "./postStore";
import './PostEl.css';
import React from "react";
import { CommentEl } from './CommentEl';

interface PostElProps {
    post?: Post,
    comments?: Comment[],
    onChange: Function,
    onSubmit: Function
}
export class PostEl extends React.Component<PostElProps> {
    render() {
        return (
            <div className="post-wrapper">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" defaultValue={this.props.post?.title} placeholder="My awesome blog post" onChange={(ev) => this.props.onChange({ title: ev.target.value })}></input>
                <textarea name="body" placeholder="Your awesome prose here" defaultValue={this.props.post?.body} onChange={(ev) => this.props.onChange({ body: ev.target.value })}></textarea>
                <button type="submit" onClick={(e) => this.props.onSubmit()}>Submit</button>
                <div className="comments-wrapper">
                   { this.props.comments?.map( (comment: Comment) => <CommentEl key={comment.id} comment={comment}></CommentEl>)}
                </div>
            </div>
            
        )
    };
}