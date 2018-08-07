
describe("app.createPost", function() {
    it("should add a new post to the list", function() {
     app.createPost("jjj");
  
      var actualResult = app.posts[app.posts.length-1].text;
  
      expect(actualResult).toBe("jjj");
    });
  });