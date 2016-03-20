var $ = require('jquery');
require("bootstrapDatepicker");
require("bootstrap-datepicker-css");

module.exports = function () {
  if ($('.input-daterange').size()) {

    var datePickerOptions = {
      format: "yyyy/mm/dd",
      language: "zh-CN",
      autoclose: true,
      todayHighlight: true
    };

    // 禁止发布题目的时候选择比当前更早的时间
    if ($('.input-daterange').attr("data-today")) {
      datePickerOptions = $.extend(datePickerOptions, {
        startDate: new Date()
      })
    }

    $('.input-daterange').datepicker(datePickerOptions);
  }
};