// Import everything from the config
import {
  state,
  setState
} from "./state";
import {
  getEl,
  createEl,
  removeEl,
  isRendered
} from "./helpers.js";
import {
  wrapper,
  primary,
  sidebar,
  main,
  siteName,
  siteDescription
} from "./config";

(function init() {
  // List out the state
  console.table(state);
  // Show the setState function
  console.log(setState);
  // Render out UI ids
  console.table({
    wrapper,
    primary,
    sidebar,
    main,
    siteName,
    siteDescription
  });
  // Show getEl shorthand
  console.log(getEl, createEl, removeEl, isRendered);
})();
