context("GET /post", () => {
  it("gets a list of all jsonplaceholder posts", () => {
      cy.request({
          method: "GET", 
          url: "https://jsonplaceholder.typicode.com/posts"
      }).then((response) => {
          expect(response.status).to.eq(200)
      })
  })
})