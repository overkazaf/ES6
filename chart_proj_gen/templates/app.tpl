(function ($, chart){
	var __defaults = {
		chartID : '#main',
		chartEl : null,
		chartWidth : 960,
		chartHeight : 600,
		chartType : 'bar'
	};

	// chart option strategies
	var OptionGroup = {
		'chartType' : function (data) {
			var option = {};
		
			// buildOption

			return option;
		}
	};

	var APP = {
		el : null,
		init : function () {
			var config = $.extends(true, {}, __defaults);
			APP.el = initializeChart(config);
		},
		fetch : function (path, callback) {
			return $.ajax({
				url : path,
				type : "GET",
				dataType : 'JSON',
				success : function (data) {
					callback && callback(data);
				},
				error : function () {
					throw new Error(arguments);
				}
			});
		},
		getChartOption : function (type, data) {
			return OptionGroup[type](data);
		},
		render : function (option) {

		}
	};


	function initializeChart (options) {
		var chart = null;

		// init chart
	
		return chart;
	}



	return APP.init();
})(jQuery, {{CHART}});