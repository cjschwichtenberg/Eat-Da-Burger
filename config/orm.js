const connection = require('./connection');

function printQuestionMarks(number) {
    var arr = [];

    for (var i = 0; i < number; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(object) {
    // column1=value, column2=value2,...
    var arr = [];

    for (var key in object) {
        arr.push(key + "=" + object[key]);
    }
    return arr.toString();
}

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
				throw err;
			}
			cb(result);
		});
    },
    
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

        console.log(queryString);
        
        connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
            }
            cb(result);
		});
    },
    
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;
