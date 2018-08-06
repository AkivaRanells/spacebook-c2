const POSTS = [];

let uniqueId = 0;

const getInput = function () {
    return $('#post-name').val();
};

const createPost = function () {
    return { text: getInput(), id: uniqueId++};
};

const putInDiv = function (post) {
    $('.posts').append('<p class="post" data-id=' + post.id + '><button type="button" class="remove">REMOVE</button>' + post.text + '</p>');
};

const addPost = function () {
    getInput();
    let toPost = createPost();
    POSTS.push(toPost);
}

$('button.add-post').on('click', function () {
    addPost();
    renderPosts();
});

$('div.posts').on('click', 'button.remove', function () {
    let getId = $(this).closest('p').data().id;
    renderDeletePost(getId);
});

const renderPosts = function () {
    $("div.posts").empty();
    for(let i = 0 ; i < POSTS.length ; i++){
        putInDiv(POSTS[i]);
    }
    
};


const renderDeletePost = function (gotId) {
    removeFromArray(gotId);
    $('[data-id=' + gotId + ']').remove();
};

const removeFromArray = function (gotId) {
    for (let i = 0; i < POSTS.length; i++) {
        if (POSTS[i].id === gotId) {
            POSTS.splice(i, 1);
            break;
        }
    }
};