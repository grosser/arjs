Ruby on Rails like ActiveRecord for javascript using html5 localstorage on JS.Class

Just some basic plumbing done(see below), help appreciated!

 - AR.connection().execute('SQL', function(resultAsHash){ ... })
 - u = User.new({name:'xxx'}); u.name == 'xxx'; u.save
 - User.create({name: 'Bla blub', foo: 1111})
 - User.all(function(users){ ... })
 - User.all({conditions: "name = 1", limit: 1, offset: 2, having: .... }, function(users){ ... })
 - User.find(id, function(user){ ... })

### Usage
    <script src="vendor/js.class/core.js"></script>
    <script src="lib/ar.js"></script>
    <script>
      AR.connection().execute("DROP TABLE User")
      User = new JS.Class(AR, {extend: {
        tableName:'User',
        columns: [
          ['id', 'REAL UNIQUE'],
          ['name', 'STRING'],
          ['foo', 'INTEGER'],
          ['bar', 'TEXT']
        ]
      }})
      User.createTable()

### Using Example:
 - example test.html needs to be accessed as root on e.g. localhost
 - if you have rack: go into folder and `rackup`, then go to localhost:9292/test.html

TODO
====
 - first / count / sum
 - joining
 - associations (belongsTo / HasMany)
 - properly escape single quotes (atm they are replaced by "`")