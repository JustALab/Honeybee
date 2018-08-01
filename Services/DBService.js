
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

        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS user_data (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, email VARCHAR(200) NOT NULL, mobile VARCHAR(10) NOT NULL, is_logged_in INTEGER DEFAULT 1, token TEXT)', [], (tx, res) => {
                console.log('**** user_data table created successfully.');
            }, (err) => {
                console.log('*** user_data table creation error!');
                console.log(err);
            });
        });
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