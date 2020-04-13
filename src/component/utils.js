import {hashHistory} from "react-router";
import axios from "axios";

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
    },
    showSpinner () {
      const spinner = document.getElementById("spinner");
      spinner.className = "show";
    },
    hideSpinner () {
      const spinner = document.getElementById("spinner");
      spinner.className = spinner.className.replace("show", "");
    },
    checkSessionTimeout (userId, sessionId) {
      const url = `/proxy?_t=${sessionId}&url=http://localhost:8088/techhunt/user/findUserSession/${userId}/${sessionId}`;
      return axios.get(
        url, {
          "crossOrigin": true
        }
      ).then(response => {
       let data = response.data;
       if (data.sessionObject == undefined) {
         return true;
       } else {
         return false;
       }
      })
    }
}
