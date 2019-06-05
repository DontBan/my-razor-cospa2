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
})();