const POSTS = [];

let uniqueId = 0;

const getInput = function (){
    return $('#post-name').val();
};

const createPost = function(){
    return {text: getInput(), id: uniqueId++};
};

const putInDiv = function(post){
    $('.posts').append('<p class="post" data-id='+post.id+'><button type="button" class="remove">REMOVE</button>'+post.text+'</p>');
};

$('button.add-post').on('click', function(){
    let toPost = createPost();
    POSTS.push(toPost);
    putInDiv(toPost);
});

$('div.posts').on('click', 'button.remove', function(){
    let getId = $(this).closest('p').data().id;
    removeFromArray(getId);
    $(this).closest('p').remove();
});

const removeFromArray = function(gotId){
    for(let i = 0; i < POSTS.length; i ++){
        if(POSTS[i].id===gotId){
            POSTS.splice(i, 1);
            break;
        }
    }
};