window.onload = function() {
	var aqiCity = document.getElementById('aqi-city-input');
	var aqiValue = document.getElementById('aqi-value-input');
	var cityTips = document.getElementById('city-input-tips');
	var valueTips = document.getElementById('value-input-tips');
	var addBtn = document.getElementById('add-btn'); 
	var table = document.getElementById('aqi-table');

	/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	var aqiData = {};
	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function validate_number(value) {
		// 验证输入是否为数字
		var r = /^[1-9]+[0-9]*$/;
		value = trim(value);

		return r.test(value);
	}

	function validate_str(value) {
		var r = /^[a-zA-Z\u4e00-\u9fa5]+$/;
		value = trim(value);

		return r.test(value);
	};

	function trim(str){ //删除左右两端的空格
	　　return str.replace(/(^\s*)|(\s*$)/g, "");
	};

	function isEmpty(obj) {
		// 判断对象是否为空
		for(var name in obj) {
			if (obj.hasOwnProperty(name)) {
				return false;
			}
		}
		return true;
	}

	function addAqiData() {
		valueTips.innerHTML = cityTips.innerHTML = "";
		if (!validate_number(aqiValue.value) || !validate_str(aqiCity.value)) {
			if (!validate_number(aqiValue.value)) {
				valueTips.innerHTML = "请输入正整数";
			};
			if (!validate_str(aqiCity.value)) {
				cityTips.innerHTML = "请正确输入城市名";
			};
		} else {
			aqiData[aqiCity.value] = parseInt(aqiValue.value);
		};
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		if (!isEmpty(aqiData)) {
			table.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
		} else {
			table.innerHTML = "";
		}
		
		for (var key in aqiData) {
			table.innerHTML += "<td>" + key +"</td><td>" + aqiData[key] + "</td><td><button>删除</button></td>";
		};
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
	  addAqiData();
	  renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(data) {
	  // do sth.
	  delete aqiData[data];
	  renderAqiList();
	}

	function init() {

	  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	  addBtn.addEventListener('click', addBtnHandle);

	  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	  table.addEventListener('click', function(event) {
	  	if(event.target.nodeName.toLowerCase() === 'button') {
	  		var data = event.target.parentNode.previousSibling.previousSibling.textContent;
	  		console.log(aqiData.key);
	  		delBtnHandle(data);
	  	}
	  })

	}

	init();

};
