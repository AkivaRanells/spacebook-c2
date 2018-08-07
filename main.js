var SpacebookApp = function () {
  return {
<<<<<<< HEAD
    posts: [],
    // the current id to assign to a post
    currentId: 0,
=======
    posts: [
      {
        text: "Hello world", id: 1, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
        ]
      },
      {
        text: "Hello world", id: 2, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
        ]
      },
      {
        text: "Hello world", id: 3, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
        ]
      }
    ],

    // the current id to assign to a post
    currentId: 4,
>>>>>>> 41b544b06e5051635c5710e803b36720e86d648b
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
<<<<<<< HEAD
        id: this.currentId
      };
=======
        id: this.currentId,
        comments:[]
      }
>>>>>>> 41b544b06e5051635c5710e803b36720e86d648b

      this.currentId += 1;

      this.posts.push(post);
    },

<<<<<<< HEAD
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

=======
>>>>>>> 41b544b06e5051635c5710e803b36720e86d648b
    renderPosts: function () {
      this.$posts.empty();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];
<<<<<<< HEAD
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
=======

        var commentsContainer = `<div class="comments-container">
                                  <input type="text" class="comment-name">
                                  <button class="btn btn-primary add-comment">Post Comment</button> 
                                  ${this.getCommentsHTML(post)}
                                </div>`;

        this.$posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>');
      }
    },

    removePost: function (postID) {
      var post = this._findPostById(postID);
      this.posts.splice(this.posts.indexOf(post), 1);
    },

    toggleComments: function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    },

    createComment: function (text, postID) {

      var comment = { text: text };
  
      // pushing the comment into the correct posts array
      this._findPostById(postID).comments.push(comment);
    },

    removeComment: function (commentIndex, postID) {
      // remove the comment from the comments array on the correct post object
      this._findPostById(postID).comments.splice(commentIndex, 1); 
    },

    getCommentsHTML: function (post) {
      let str = "<ul>";
      for (let comment of post.comments){
        str+='<li class="comment">' + comment.text +
          '<button class="btn btn-danger btn-sm remove-comment">Remove Comment</button>' +
          '</li>'
      }
      str+="</ul>";
      return str;
    }
  };
>>>>>>> 41b544b06e5051635c5710e803b36720e86d648b
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();
<<<<<<< HEAD
app.renderComments();
=======
>>>>>>> 41b544b06e5051635c5710e803b36720e86d648b

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
<<<<<<< HEAD
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
=======
});

$('.posts').on('click', '.remove', function () {
  
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.removePost(postID);
  app.renderPosts();
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});
  
$('.posts').on('click', '.add-comment', function () {
  var text = $(this).siblings('.comment-name').val();
  // finding the index of the post in the page... will use it in #createComment
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.createComment(text, postID);
  app.renderPosts();
});

$('.posts').on('click', '.remove-comment', function () {
  // the comment element that we're wanting to remove
  var $clickedComment = $(this).closest('.comment');
  // index of the comment element on the page
  var commentIndex = $clickedComment.index();
  //get the post id   
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.removeComment(commentIndex, postID);
  app.renderPosts();
}); 
 
>>>>>>> 41b544b06e5051635c5710e803b36720e86d648b
