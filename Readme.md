My try on making an activerecord for js using html5 localstorage.

What works:
 - User.all(function(users){  do something with users })
 - u = User.new({name:'xxx'}); u.name == 'xxx'
 - AR.connection().execute('SQL', function(result){ ... })
 - 