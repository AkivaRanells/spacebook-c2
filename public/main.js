import PostsRepository from './posts-repository.js';
import AjaxRequests from './ajax-requests.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js'; 

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();

let initiateDB = new AjaxRequests('/posts', "GET");
initiateDB.getAjax().then(function (response) {
    // console.log(response);
    postsRepository.posts = response;
    postsRenderer.renderPosts(postsRepository.posts);
    // console.log(postsRepository.posts);
}).catch(function (error) {
    console.log(error);
    return error;
});

