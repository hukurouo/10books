module.exports = {
  devServer: {
    proxy: {
      "http://books.google.com": {
        target: "http://localhost:8080",
      }
    }
  }
};