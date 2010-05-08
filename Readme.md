ActiveRecord for js using html5 localstorage.

 - AR.connection().execute('SQL', function(resultAsHash){ ... })
 - u = User.new({name:'xxx'}); u.name == 'xxx'; u.save
 - User.create({name: 'Bla blub', foo: 1111})
 - User.all(function(users){ ... })
 - User.find(id, function(user){ ... })

### Using Example:
 - example test.html needs to be accessed as root on e.g. localhost
 - if you have rack: go into folder and `rackup`, then go to localhost:9292/test.html

TODO
====
 - all / first / find with parameters like order etc
 - proper value escaping
 - something like .ownProperties when convertig objects to records, so only real attributes are copied 