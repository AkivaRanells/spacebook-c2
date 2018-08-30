
import AjaxRequests from './ajax-requests.js';
class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!");
            } else {
                //this.postsRepository.addPost($input.val())        
                let theData = { text: $input.val(), comments: [] };
                // console.log(theData);
                let pushToDB = new AjaxRequests('/posts', "POST", theData);
                pushToDB.postAjax()
                    .then((newDBObject) => {
                        // console.log("after ajax: "+JSON.stringify(newDBObject))
                        this.postsRepository.addPost(newDBObject);
                        // console.log(this.postsRepository.posts);
                        this.postsRenderer.renderPosts(this.postsRepository.posts);
                        return;
                    })
            }
        });
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let idToDelete = $(event.currentTarget).closest('.post').data().id;
            // console.log(idToDelete);
            let index = $(event.currentTarget).closest('.post').index();
            let deleteFromDB = new AjaxRequests('/posts/' + idToDelete, "DELETE");
            deleteFromDB.deleteAjax()
                .then((deletedId) => {
                    this.postsRepository.removePost(index);
                    this.postsRenderer.renderPosts(this.postsRepository.posts);
                })

        });

    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');

            if ($comment.val() === "" || $user.val() === "") {
                alert("Please enter your name and a comment!");
                return;
            }

            let postIndex = $(event.currentTarget).closest('.post').index();
            // let newComment = { text: $comment.val(), user: $user.val() };
                  
            let commentText = $comment.val();
            let commentUser = $user.val();
            console.log(commentText+" "+commentUser);
            let commentPostId = $(event.currentTarget).closest('.post').data().id;
            console.log(commentPostId);
            let objectToSend = {id: commentPostId, text: commentText, user: commentUser }
            let pushToDB = new AjaxRequests('/comments', "POST", objectToSend);
            pushToDB.postAjax()
                .then((newDBComment) => {
                    // console.log("after ajax: "+JSON.stringify(newDBComment))
                    this.postsRepository.addComment(newDBComment, postIndex);
                    // console.log(this.postsRepository.posts);
                    this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
                    $comment.val("");
                    $user.val("");
                    return;
                });
        });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            let postId = $(event.currentTarget).closest('.post').data().id;
            let commentIdForDelete = $(event.currentTarget).closest('.comment').data().id;
            // console.log(postId+" "+commentIdForDelete);
            let deleteFromDB = new AjaxRequests('/comments/'+postId+"/"+commentIdForDelete, "DELETE");
            deleteFromDB.deleteAjax().then((res, err)=>{
                if (err) console.log(err);
                this.postsRepository.deleteComment(postIndex, commentIndex);
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            });

        });
    }
}

export default EventsHandler