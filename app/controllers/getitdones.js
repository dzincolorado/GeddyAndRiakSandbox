var Getitdones = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Getitdone.all(function(err, getitdones) {
      self.respond({params: params, getitdones: getitdones});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);

    var self = this
      , getitdone = geddy.model.Getitdone.create(params);

    getitdone.save(function(err, data) {
      if (err) {
        params.errors = err;
        self.transfer('add');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Getitdone.first(params.id, function(err, getitdone) {
      self.respond({params: params, getitdone: getitdone.toObj()});
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Getitdone.first(params.id, function(err, getitdone) {
      self.respond({params: params, getitdone: getitdone});
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Getitdone.first(params.id, function(err, getitdone) {
      getitdone.updateProperties(params);

      getitdone.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.redirect({controller: self.name});
        }
      });
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Getitdone.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Getitdones = Getitdones;
