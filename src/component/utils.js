export default {
  setHeaders (auth, user) {
    if (this.headers === undefined || this.headers === null) {
      this.headers = []
    }
      this.headers.push({authorization: auth, user: user})
    },

    getHeaders (user) {
      for (var item = 0; item < this.headers.length; item++) {
        if (this.headers[item].user === user) {
          return this.headers[item];
        }
      }
    }
}
