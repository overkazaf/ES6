var path = require('path');
var chunks = [];
var filePath = {
    srcPath: path.join(__dirname, '../src'),
    tplPath: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
    devbuild: path.join(__dirname, '../devbuild'),
    package: path.join(__dirname, '../package'),
    publicPath: '/'
};
var pages = [{
    name: 'Cart/index',
    entry: 'Cart/index.jsx',
    ftl: 'yougouPages/Cart/index.html'
}, {
    name: 'Prdt/index',
    entry: 'Prdt/index.jsx',
    ftl: 'yougouPages/Prdt/index.html'
}, {
    name: 'Shop/index',
    entry: 'Shop/indexN.jsx',
    ftl: 'yougouPages/Shop/index.html'
}, {
    name: 'Marketing/index',
    entry: 'Marketing/index.jsx',
    ftl: 'yougouPages/Marketing/index.html'
}, {
    name: 'Order/index',
    entry: 'Order/index.jsx',
    ftl: 'yougouPages/Order/index.html'
}, {
    name: 'PlaceList/index',
    entry: 'PlaceList/index.jsx',
    ftl: 'yougouPages/PlaceList/index.html'
}, {
    name: 'ForetasteFail/index',
    entry: 'ForetasteFail/index.jsx',
    ftl: 'yougouPages/ForetasteFail/index.html'
}, {
    name: 'ForetasteOrder/index',
    entry: 'ForetasteOrder/index.jsx',
    ftl: 'yougouPages/ForetasteOrder/index.html'
}, {
    name: 'ForetasteSuccess/index',
    entry: 'ForetasteSuccess/index.jsx',
    ftl: 'yougouPages/ForetasteSuccess/index.html'
}, {
    name: 'PayFail/index',
    entry: 'PayFail/index.jsx',
    ftl: 'yougouPages/PayFail/index.html'
}, {
    name: 'PaySuccess/index',
    entry: 'PaySuccess/index.jsx',
    ftl: 'yougouPages/PaySuccess/index.html'
}, {
    name: 'Commerce/index',
    entry: 'Commerce/index.jsx',
    ftl: 'yougouPages/Commerce/index.html'
}, {
    name: 'ForetasteShop/index',
    entry: 'ForetasteShop/index.jsx',
    ftl: 'yougouPages/ForetasteShop/index.html'
}, {
    name: 'Protocol/index',
    entry: 'Protocol/index.jsx',
    ftl: 'yougouPages/Protocol/index.html'
},{
    name: 'Scan/index',
    entry: 'Scan/index.jsx',
    ftl: 'yougouPages/Scan/index.html'
},{
    name: 'Wifi/index',
    entry: 'Wifi/index.jsx',
    ftl: 'yougouPages/Wifi/index.html'
}];

var pagesToPath = function() {
    var _p = [];
    pages.forEach(function(_page) {
        var _obj = {
            name: _page.name,
            entry: 'page/' + _page.entry,
            ftl: _page.ftl,
            templates: path.join(filePath.tplPath, _page.ftl)
        };
        _p.push(_obj);
        chunks.push(_page.name);
    });
    return _p;
};

module.exports = {
    filePath: filePath,
    pages: pages,
    pagesToPath: pagesToPath,
    port: 8090,
    chunks: chunks
};