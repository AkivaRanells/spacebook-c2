    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */

class PostsRepository {
    constructor() {
        this.posts = [];
    }

    addPost(postFromDB) {
        this.posts.push(postFromDB);
    }

    removePost(index) {
        this.posts.splice(index, 1);
    }
    
    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
      };
}

export default PostsRepository