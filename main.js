var SpacebookApp = function () {
  return {
    posts: [],
    // the current id to assign to a post
    currentId: 0,
    $posts: $('.posts'),

    _findPostById: function (id) {
      for (var i = 0; i < this.posts.length; i += 1) {
        if (this.posts[i].id === id) {
          return this.posts[i];
        }
      }
    },

    createPost: function (text) {
      var post = {
        text: text,
        id: this.currentId
      };

      this.currentId += 1;

      this.posts.push(post);
    },

    createComment: function (text, postId) {
      let foundPost = this._findPostById(postId);
      if (!foundPost.comments) {
        foundPost.comments = [{ text: text }];
      }else{
        foundPost.comments.push({text: text});
      }
    },

    renderComments: function () {
      $('ul.comments-list').empty();
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].comments) {
          for (let j = 0; j < this.posts[i].comments.length; j++) {
            $('[data-id=' + this.posts[i].id + ']').find('ul.comments-list').append('<li>' + this.posts[i].comments[j].text + '</li> <a href="#" class="remove-comment">remove</a>');
          }
        }
      };
    },

    renderPosts: function () {
      this.$posts.empty();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];
        this.$posts.append('<div class="post" data-id=' + post.id + '><a href="#" class="remove-post">remove</a> ' + post.text + '<div class="comments-container"><ul class=comments-list></ul><input type="text" class="comment-name"><button class="btn btn-sm btn-primary add-comment" type="button">Post Comment</button></div></div>');
      }
    },

    removePost: function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      var id = $clickedPost.data().id;

      var post = this._findPostById(id);

      this.posts.splice(this.posts.indexOf(post), 1);
    },
    removeComment: function (currentComment, postId){
      let foundPost = this._findPostById(postId);
      for(let i = 0 ; i < foundPost.comments.length ; i ++){
        if(foundPost.comments[i].text===currentComment){
          foundPost.comments.splice(i, 1);
        }
      }
    },
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();
app.renderComments();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
  app.renderComments();
});

$('.posts').on('click', 'a.remove-post', function () {
  app.removePost(this);
  app.renderPosts();
  app.renderComments();
});
$('.posts').on('click', '.add-comment', function () {
  let text = $(this).closest('div.comments-container').find('.comment-name').val();
  let postId = $(this).closest('div.post').data().id;
  app.createComment(text, postId);
  app.renderComments();
});
$('.posts').on('click', 'a.remove-comment', function () {
  let postId = $(this).closest('div.post').data().id;
  let commentText = $(this).prev().text();
  app.removeComment(commentText, postId);
  app.renderPosts();
  app.renderComments();
});
