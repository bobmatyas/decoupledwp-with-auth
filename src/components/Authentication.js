// Import libraries
import axios from "axios";
import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";

// Import components
import { init as Posts } from "./Posts.js";

// Import configs
import { state, setState } from "../state";
import { getEl } from "../helpers.js";
import { loginBtn, logoutBtn } from "../config";


/**
 * Starts authentication process
 *
 * @export
 */
export function init() {

    if( Cookies.get(state.token) === undefined) {
        console.log( "Logged out..." );
        logout();
        initLogin();
    } else {
        console.log("Logged in!");
        login();
        initLogout();
    }

}


/**
 * Handles the login process
 *
 * @export function
 */
 export function login() {
    setState("loggedIn", true);
    console.log(state.loggedIn);
    getEl(loginBtn).classList.add("hidden");
    getEl(logoutBtn).classList.remove("hidden");
    Posts();
  }
  
  /**
   * Handles the logout process
   *
   * @export function
   */
  export function logout() {
    setState("loggedIn", false);  
    getEl(loginBtn).classList.remove("hidden");
    getEl(logoutBtn).classList.add("hidden");
    Posts();
  }


  /**
   * Event handler for login process
   *
   * @export
   */
  export function initLogin() {
      getEl(loginBtn).addEventListener("click", event => {
        event.preventDefault();
      
        const creds = {
            username: "snoopy",
            password: "doghouse food bowl"
        };

        axios({
            method: "post",
            url: state.restUrl + "jwt-auth/v1/token",
            data: formurlencoded(creds),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
            // Check to see response comes back approved
            if (200 === response.status) {
              // Set a secure cookie with the authentication token
              Cookies.set(state.token, response.data.token, {
                expires: 1,
                secure: true
              });
              console.log("Logged in");
              init();
            } else {
              alert("Login failed, please check credentials and try again!");
            }
          })
          .catch(error => {
            // Also log the actual error
            console.error(error);
          });
      });
  }


export function initLogout() {
    getEl(logoutBtn).addEventListener("click", event => {
        event.preventDefault();
        Cookies.remove(state.token, {secure: true});
        init();
    });
}