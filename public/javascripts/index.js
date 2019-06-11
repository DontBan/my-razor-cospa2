(function () {
  'use strict'
  $('#today-form').hide();
  $('#someday-form').hide();

  $('#start-today').click(function () {
    $('#today-form').slideToggle(500);
  });

  $('#start-someday').click(function () {
    $('#someday-form').slideToggle(500);
  });

  // 入力フォームのdateの最大値を今日に設定
  var date = new Date();
  var yyyy = date.getFullYear();
  var mm = ('0' + (date.getMonth() + 1)).slice(-2);
  var dd = ('0' + date.getDate()).slice(-2);
  document.getElementById('start-date').max = yyyy + '-' + mm + '-' + dd;
})();