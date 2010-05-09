AR = new JS.Class({
  initialize: function(attributes){
    for(n in attributes){
      if(attributes.hasOwnProperty(n)) this[n] = attributes[n]
    }
  },

  isNewRecord: function(){
    return !this.id
  },

  createId: function(){
    this.id = this.id || parseInt(Math.random(1) * 1000000000)
  },

  save: function(){
    var _this = this;
    if(this.isNewRecord()){
      this.createId()
      var columns = this.klass.columns.map(function(kv){return kv[0]})
      var values = columns.map(function(k){return _this[k] || 'NULL'})
      var placeholder = values.map(function(){return '?'}).join(',')
      this.klass.connection().execute(['insert into '+this.klass.tableName+' ('+columns.join(', ')+') VALUES ('+placeholder+')', values])
    } else {
      var setter = this.klass.columns.map(function(kv){
        return kv[0]+" = ?"
      }).join(', ')
      var values = this.klass.columns.map(function(kv){
        return _this[kv[0]] || ''
      })
      var sql = 'UPDATE '+this.klass.tableName+' SET '+setter+ ' WHERE id = '+this.id
      this.klass.connection().execute([sql, values])
    }
  },

  extend: {
    tableName: "Overwrite this when creating a new class!!",

    connection: function(){
      this._connection = this._connection || new AR.Connection
      return this._connection
    },

    createTable: function(){
      var columns = this.columns.map(function(kv){return kv.join(" ")})
      var sql = "CREATE TABLE "+this.tableName+"("+columns.join(",")+")"
      this.connection().execute(sql)
    },

    create: function(attributes){
      var record = (new this(attributes))
      record.save()
      return record
    },

    find: function(id, handler){
      var _this = this;
      this.connection().execute("SELECT * FROM "+this.tableName+" WHERE id = "+id+" LIMIT 1", function(result){
        handler(_this.toInstance(result)[0])
      })
    },

    all: function(options, handler){
      if(typeof options == 'function'){
        handler = options
        options = {}
      }

      var sql="SELECT "+(options.select||'*')+" FROM "+this.tableName
      var terms = [
        ['conditions', 'WHERE'],
        ['order', 'ORDER BY'],
        ['group', 'GROUP BY'],
        ['having', 'HAVING'],
        ['limit', 'LIMIT'],
        ['offset', 'offset']
      ]
      terms.forEach(function(a){
        if(options[a[0]]) sql += " "+ a[1] + " " + options[a[0]]
      })

      var _this = this;
      this.connection().execute(sql, function(result){
        handler(_this.toInstance(result))
      })
    },

    deleteAll: function(callback){
      this.connection().execute("DELETE FROM "+this.tableName, callback)
    },

    toInstance: function(objects){
      var _this = this;
      var array = []
      objects.forEach(function(o){
        array.push(new _this(o))
      })
      return array
    }
  }
});

AR.Connection = new JS.Class({
  initialize: function(){
    try{
      this.connection = window.openDatabase("TEST", "1.0", "HTML5 Database API example", 200000);
    } catch(err) {
      alert("Couldn't open openDatabase.  Use with newest Safari/Chrome");
    }
  },

  // SQL: "some sql 1=2" or ["some sql 1=?", [2]]
  execute: function(sql, handler){
    var _this = this;
    this.connection.transaction(function(tx) {
      var values = []
      if(typeof sql == 'object'){
        values = sql[1]
        sql = sql[0]
      }
      tx.executeSql(sql, values, function(tx, result){
        if(handler) handler(_this.resultToArray(result))
      }, function(transaction, error){
        console.log("SQLError: "+error.message+" when executing "+sql)
      })
    })
  },

  resultToArray: function(result){
    var array = [];
    for (var i = 0; i < result.rows.length; ++i) {
      array.push(result.rows.item(i));
    }
    return array;
  }
})