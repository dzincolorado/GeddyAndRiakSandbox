var Getitdone = function () {

  this.defineProperties({
    title: {type: 'string', required: true},
    status: {type: 'string'},
    area: {type: 'string'},
    bestPlace: {type: 'string'},
  });
  
  this.validatesPresent('title');
  this.validatesLength('title', {min: 5});
  
  this.validatesWithFunction('status', function(status){
  	return status === 'open' || status === 'done';
  });

  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
Getitdone.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Getitdone.someStaticMethod = function () {
  // Do some other stuff
};
Getitdone.someStaticProperty = 'YYZ';
*/

Getitdone = geddy.model.register('Getitdone', Getitdone);

