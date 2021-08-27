const ghpages = require("gh-pages");

ghpages.publish("public", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Deploy Complete!");
  }
});
