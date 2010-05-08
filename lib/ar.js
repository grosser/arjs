AR = new JS.Class({
  initialize: function(attributes){
    for(n in attributes){
      this[n] = attributes[n]
    }
  },

  isNewRecord: function(){
    !!this.id
  },

  createId: function(){
    this.id = this.id || parseInt(Math.random(1) * 1000000000)
  },

  save: function(){
    if(isNewRecord()){
      connection().execute("insert into "+tableName()+" x = 1")
    } else {

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

    find: function(id, handler){
      this.connection().execute("SELECT * FROM "+this.tableName+" WHERE id = "+id+" LIMIT 1", function(result){
//        console.log(result)
      })
    },

    all: function(handler){
      var _this = this;
      this.connection().execute("SELECT * FROM "+this.tableName, function(result){
        handler(_this.toInstance(result))
      })
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

  execute: function(sql, handler){
    var _this = this;
    this.connection.transaction(function(tx) {
      tx.executeSql(sql, [], function(tx, result){
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