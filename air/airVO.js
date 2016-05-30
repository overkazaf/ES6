/**
 * [AirVO 监控数据实体类]
 * @param  {[type]} root [window对象]
 * @return {[type]}      [description]
 */
(function(root) {
    function AirVO(opt, coords) {
        this.siteName = opt.siteName;
        this.projName = opt.projName;
        this.dateTime = opt.dateTime;
        this.average = opt.average;
        this.coords = opt.coords;

        this.dateVO = null;

        this.init.call(this);
    };

    AirVO.prototype = {
        constructor : AirVO,
        init : function () {
            this.parseDateTime();
        },
        parseDateTime : function () {
            var dateTime = this.dateTime;
            var d = new Date(dateTime);
            var dateVO = {
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate(),
                hour: d.getHours()
            };

            this.dateVO = dateVO;
        },
        getDateTime : function () {
            return this.dateVO;
        }
    }

    root.AirVO = AirVO;
})(window);
