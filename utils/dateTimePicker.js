function withData(param) {
  return param < 10 ? '0' + param : '' + param;
}
function getLoopArray(start, end, dtype) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    if (dtype) {
      array.push(withData(i) + dtype);
    } else {
      array.push(withData(i));
    }

  }
  return array;
}

function getDayArray(start, end, year, month) {
  var newDate = new Date();

  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {

    array.push(withData(i) + '日' + getWeekday(year, month, withData(i)));
  }
  return array;
}
function getWeekday(year, month, day) {
  var dt = new Date(year + '/' + month + '/' + day);
  var a = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return a[dt.getDay()];
}

function getMonthDay(year, month) {

  year = year.substr(0, year.length - 1);
  month = month.substr(0, month.length - 1);
  //console.log(year);
  //console.log(month);
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getDayArray(1, 31, year, month)
      break;
    case '04':
    case '06':
    case '09':
    case '11':
      array = getDayArray(1, 30, year, month)
      break;
    case '02':
      array = flag ? getDayArray(1, 29, year, month) : getDayArray(1, 28, year, month)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;
}

function getNewDateArry() {
  // 当前时间的处理
  var newDate = new Date();
  var year = withData(newDate.getFullYear()) + '年',
    mont = withData(newDate.getMonth() + 1) + '月',
    date = withData(newDate.getDate()) + '日',
    hour = withData(newDate.getHours()),
    minu = withData(newDate.getMinutes())
  return [year, mont, date, hour, minu];
}

function dateTimePicker(startYear, endYear, date) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[], [], []];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  //console.log(date) 初始无数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  // console.log(defaultDate[2]) day
  // 处理联动列表数据
  /*年月日 时分秒*/
  dateTimeArray[0] = getLoopArray(start, end, '年');
  dateTimeArray[1] = getLoopArray(1, 12, '月');
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
  // dateTimeArray[3] = getLoopArray(0, 23);
  // dateTimeArray[4] = getLoopArray(0, 59);

  dateTimeArray.forEach((current, index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  return {
    dateTimeArray: dateTimeArray,
    defaultDay: defaultDate[2],
    dateTime: dateTime
  }
}

function getTime() {
  // 获取现在的时间 time
  var d = new Date();
  var hour = d.getHours(), minu = d.getMinutes();
  return withData(hour) + ":" + withData(minu);
}

module.exports = {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay,
  getHourMinu: getTime
}