
describe("app.createPost", function() {
  
    it("should add a new post to the list", function() {
     app.createPost("jjj");
  
      let actualResult = app.posts[app.posts.length-1].text;
  
      expect(actualResult).toBe("jjj");
    });
  });

  describe("app.removePost", function(){
    it("should remove a post from the array", function (){
      app.removePost(3);
      let actualResult = app.posts.length-1;
      expect(actualResult).toBe(3);
    });
  });

  describe("app._findPostById", function(){
    it("should return the post object", function(){
      app._findPostById(2);
      let actualResult = app.posts[1];
      expect(actualResult).toBe( {text: "Hello world", id: 2, comments: [
        { text: "Man, this is a comment!" },
        { text: "Man, this is a comment!" },
        { text: "Man, this is a comment!" }
      ]});
    });
  });