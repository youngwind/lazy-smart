$.ajax({
  url: 'https://api.github.com/users/technoweenie/repos',
  type: 'GET',
  dataType: 'json',
  success: function (res) {
    console.log(res);  // eslint-disable-line
  }
});

let a = 3;
console.log(a);  // eslint-disable-line



