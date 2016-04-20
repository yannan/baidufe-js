/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
var oWrap = document.getElementById('aqi-chart-wrap');
/**
 * 渲染图表
 */
function renderChart() {
  oWrap.innerHTML = '';
  for(var value in chartData[pageState.nowGraTime]) {
    var color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    var text = '<span title="' + value + '，空气质量:' + chartData[pageState.nowGraTime][value] + '" style="height:' + chartData[pageState.nowGraTime][value] + 'px;background:' + color +'"></span>';
    oWrap.innerHTML += text;
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化 
  if (value != pageState.nowGraTime) {
    pageState.nowGraTime = value;
    console.log(pageState.nowGraTime);
    renderChart();
  };
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value) {
  // 确定是否选项发生了变化 
  if (value != pageState.nowSelectCity) {
    pageState.nowSelectCity = value;
    renderChart();
  };
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var time = document.getElementById('form-gra-time');
  time.addEventListener('click', function(event) {
    if(event.target.name == 'gra-time') {
      graTimeChange(event.target.value);
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city = document.getElementById('city-select');
  city.onchange = function() {
    citySelectChange(this.value);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var cityDate = {};
  var weekData = {};
  var monthData = {};
  var dataObj = [];
  var dataStr = [];
  var monthCount = 0;
  var weekCount = 0;
  var dayCount = 0;
  var count = 0;
  cityData = aqiSourceData[pageState.nowSelectCity];

  // 存储日数据
  chartData['day'] = cityData;

  // 存储周数据
  for(var date in cityData) {
    var d = new Date(date);
    count += cityData[date];
    dayCount++;
    if (d.getDay() == 6) {
      weekData['第'+(weekCount+1)+'周'] = count/dayCount;
      weekCount++;
      count = 0;
      dayCount = 0;
    };
    if (dayCount) {
      weekData['第'+(weekCount+1)+'周'] = count/dayCount;
    };
  }
  
  chartData['week'] = weekData;

  //存储月数据 
  count = 0;
  dayCount = 0;
  for(var date in cityData) {
    var d = new Date(date);
    count += cityData[date];
    dayCount++;

    if (d.getMonth() != monthCount-1) {
      monthData[monthCount+1+'月'] = count/dayCount;
      monthCount++;
      count = 0;
      dayCount = 0;
    };
  }
  chartData['month'] = monthData;
  console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();