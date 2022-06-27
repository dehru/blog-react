import { Comment } from './postStore'
export function CommentEl(props: { comment: Comment }) {
    return (
        <div>id: {props.comment.id}, name: {props.comment.name}, body: {props.comment.body}, </div>
    )
}