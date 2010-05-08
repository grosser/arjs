My try on making an activerecord for js using html5 localstorage.

What works:
 - User.all(function(users){  do something with users })
 - u = User.new({name:'xxx'}); u.name == 'xxx'
 - AR.connection().execute('SQL', function(result){ ... })
 -

Development:
 - if you have rack: go into folder and `rackup`, then go to localhost:9292/test.html