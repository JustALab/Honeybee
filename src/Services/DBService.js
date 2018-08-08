var SQLite = require("react-native-sqlite-storage");

const databaseName = "honeybee.db";
const databaseVersion = "1.0";
const databaseDisplayname = "Honeybee";
const databaseSize = 200000;
let db;

export const DBService = {
  initDB: () => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(false);
    db = SQLite.openDatabase(
      databaseName,
      databaseVersion,
      databaseDisplayname,
      databaseSize
    );
    console.log("SUCCESS!!!!");

    db.transaction(tx => {
      // tx.executeSql('DROP TABLE IF EXISTS user_data');
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS user_data (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(200) NOT NULL, mobile VARCHAR(10), is_logged_in INTEGER DEFAULT 0, token TEXT)",
        [],
        (tx, res) => {
          console.log("**** user_data table created successfully.");
        },
        err => {
          console.log("*** user_data table creation error!");
          console.log(err);
        }
      );
    });
  },

  insertIntoUserData: (email, token) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM user_data",
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            let isLoggedIn = 1;
            tx.executeSql(
              "INSERT INTO user_data (email, is_logged_in, token) VALUES (:email, :isLoggedIn, :token)",
              [email, isLoggedIn, token],
              tx => {
                console.log("user data inserted successfully.");
              },
              err => {
                console.log(
                  "user data insertion not successfull: " + err.message
                );
              }
            );
          } else {
            console.log("User data already available. Updating user data.");
            DBService.updateUserData(email, token);
          }
        },
        err => {
          console.log("insertion into user_data table error.");
        }
      );
    });
  },

  updateUserData: (email, token) => {
    db.transaction(tx => {
      let isLoggedIn = 1;
      tx.executeSql(
        "UPDATE user_data SET email=(:email), token=(:token), is_logged_in=(:isLoggedIn) WHERE id=(:id)",
        [email, token, isLoggedIn, 1],
        tx => {
          console.log("user_data email and token updated.");
        },
        err => {
          console.log("user_data update failure.");
        }
      );
    });
  },

  getTokenIfUserAvailable: callback => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM user_data",
        [],
        (tx, res) => {
          console.log("User data available. Returning token.");
          if (res.rows.length !== 0) {
            console.log("Row count: " + res.rows.length);
            let row = res.rows.item(0);
            callback(row.token, row.is_logged_in);
          } else {
            callback(null);
          }
        },
        err => {
          console.log("User data not available. returning null.");
        }
      );
    });
  },

  unsetLoggedInStatus: () => {
    db.transaction(tx => {
      let isLoggedIn = 0;
      tx.executeSql(
        "UPDATE user_data SET is_logged_in=(:isLoggedIn)",
        [isLoggedIn],
        () => {
          console.log("Login status set to 0.");
        },
        err => {
          console.log("Error setting log status to 0.:" + err.message);
        }
      );
    });
  },

  openCB: () => {
    console.log("Database opened");
  },

  successCB: () => {
    console.log("Database success");
  },

  errorCB: err => {
    console.log("Database error: ", err);
  },

  closeDB: () => {
    if (db) {
      console.log("Closing database ...");
    }
  }
};
