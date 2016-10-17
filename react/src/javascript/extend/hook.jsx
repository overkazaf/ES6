export default class Hook {
    static hookAndFixUrlPrefix (json) {
        let isArray = function (obj) {
            if (typeof Array.isArray == 'function') return Array.isArray(obj);
            return obj instanceof Array || Object.prototype.toString.call(obj) == '[object Array]';
        }

        let fixStringByPattern = function (str) {
            var target = str;
            var pattern = 'fightgroup-web/public/';
            // dev
            // var prefix = 'http://localhost:8090/';
            // online
            var prefix = 'http://yougo.xinguang.com/fightgroup-web/';
            
            if (target.indexOf(pattern) >= 0) {
                var subfix = target.split(pattern)[1];
                target = prefix + subfix;
            }
            return target;
        }

        let dfs = function (obj) {
            if (obj === null || typeof obj !== 'object') {
                // 基本数据类型
                if (typeof obj == 'string') return fixStringByPattern(obj);
                else return obj;
            }
    
            var ret = new obj.constructor();
            if (isArray(obj)) {
                for (var i = 0, l = obj.length; i<l; i++) {
                    ret[i] = dfs(obj[i]);
                }
            } else {
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        ret[attr] = dfs(obj[attr]);
                    }
                }
            }
            return ret;
        }

        return dfs(json);
    }
}