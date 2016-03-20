var $ = require('jquery');

module.exports = function () {
  $.ajax({
    url: "https://api.github.com/repos/twbs/bootstrap",
    type: 'GET',
    dataType: 'json',
    success: function (res) {
      console.log(res);
    }
  });
};