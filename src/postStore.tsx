export interface Post {
    id?: number,
    title: string,
    body: string,
    userId?: number,
}

export interface Comment {
    postId: number,
    id?: number,
    name: string, 
    email: string,
    body: string
}

export class PostStore extends EventTarget {
    baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    async loadAll() {
        const response = await fetch(this.baseUrl);
        return await response.json() as Post[];
    }
    async loadOne(id: number) {
        return await (await fetch(`${this.baseUrl}/${id}`)).json();
    }
    async update(post: Post) {
        return await (await fetch(`${this.baseUrl}/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })).json();
    }
    async create(post: Post) {
        return await (await fetch(`${this.baseUrl}`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })).json();
    }
    async loadComments(id: number): Promise<Comment[]> {
        return await (await fetch(`${this.baseUrl}/${id}/comments`)).json();
    }
}