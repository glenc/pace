var util = require('util');
var View = require('./view');

function CsvView(model, name, select, columns) {
  View.call(this, model, name, select);
  this.contentType = 'text/csv';
  this.columns = columns;
}

util.inherits(CsvView, View);

CsvView.prototype.post = function(results) {
  var self = this;
  var data = [];
  data.push(Object.keys(self.columns).join(','));

  var map = function(obj) {
    var row = [];
    for (var col in self.columns) {
      row.push(self.columns[col](obj));
    }
    return row.join(',');
  }

  if (Array.isArray(results)) {
    data = data.concat(results.map(map));
  } else {
    data.push(map(results));
  }

  return data.join("\r\n");
}

module.exports = CsvView;
