var $ = require('jquery');

module.exports = function () {
  $.ajax({
    url: "https://api.github.com/users/technoweenie/repos",
    type: 'GET',
    dataType: 'json',
    success: function (res) {
      console.log(res);
    }
  });
};