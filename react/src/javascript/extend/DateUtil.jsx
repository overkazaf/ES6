export default class DateUtil {
	static formatDate (value, format) {
		let maps = {
		  'yyyy' : function (d) {return d.getFullYear();},
		  'MM' : function (d){return fix(d.getMonth()+1);},
		  'dd' : function (d){return fix(d.getDate());},
		  'HH' : function (d){return fix(d.getHours());},
		  'mm' : function (d){return fix(d.getMinutes());},
		  'ss' : function (d){return fix(d.getSeconds());}
		};

		let chunk = new RegExp(Object.keys(maps).join('|'), 'g');

		function fix (d) {
		  d = "" + (d||"");
		  if (d.length <= 1) {
		    d = '0' + d;
		  }
		  return d;
		}

		function formatDateInside(value, format){
		  format = format || 'yyyy-MM-dd HH:mm:ss';
		  value = new Date(value);
		  return format.replace(chunk, function (capture){
		    return maps[capture]?maps[capture](value):'';
		  })
		}

		return formatDateInside(value, format);
	}
}