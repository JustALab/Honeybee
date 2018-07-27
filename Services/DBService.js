
var SQLite = require('react-native-sqlite-storage')

const databaseName = 'honeybee.db';
const databaseVersion = '1.0';
const databaseDisplayname = 'Honeybee';
const databaseSize = 200000;
let db;

export const DBService = {

    initDB() {
        SQLite.DEBUG(true);
        SQLite.enablePromise(false);
        db = SQLite.openDatabase(databaseName, databaseVersion, databaseDisplayname, databaseSize);
        console.log('SUCCESS!!!!');
    },

    openCB() {
        console.log('Database opened');
    },

    successCB() {
        console.log('Database success');
    },

    errorCB(err) {
        console.log("Database error: ", err);
    },

    closeDB() {
        if (db) {
            console.log("Closing database ...");
        }
    }

}