var SQLite = require("react-native-sqlite-storage");

const databaseName = "honeybee.db";
const databaseVersion = "1.0";
const databaseDisplayname = "Honeybee";
const databaseSize = 200000;
let db;

const TABLE_LOGIN_DATA = "login_data";
const TABLE_USER_DATA = "user_data";

//create queries
const QUERY_CREATE_TABLE_LOGIN_DATA =
  "CREATE TABLE IF NOT EXISTS " +
  TABLE_LOGIN_DATA +
  " (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(200) NOT NULL, mobile VARCHAR(10), is_logged_in INTEGER DEFAULT 0, token TEXT)";

const QUERY_CREATE_TABLE_USER_DATA =
  "CREATE TABLE IF NOT EXISTS " +
  TABLE_USER_DATA +
  " (id INTEGER PRIMARY KEY AUTOINCREMENT,  first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(200) NOT NULL, mobile VARCHAR(10) NOT NULL, email_verification_status VARCHAR(50), mobile_verification_status VARCHAR(50) NOT NULL)";

//select queries
const QUERY_SELECT_ALL_FROM_LOGIN_DATA =
  "SELECT * FROM " + TABLE_LOGIN_DATA + "";

//insert queries
const QUERY_INSERT_INTO_LOGIN_DATA =
  "INSERT INTO " +
  TABLE_LOGIN_DATA +
  " (email, is_logged_in, token) VALUES (:email, :isLoggedIn, :token)";

const QUERY_INSERT_INTO_USER_DATA =
  "INSERT INTO " +
  TABLE_USER_DATA +
  " (first_name, last_name, email, mobile, email_verification_status, mobile_verification_status) VALUES (:firstName, :lastName, :email, :mobile, :emailVerificationStatus, :mobileVerificationStatus)";

//update queries
const QUERY_UPDATE_ALL_LOGIN_DATA =
  "UPDATE " +
  TABLE_LOGIN_DATA +
  " SET email=(:email), token=(:token), is_logged_in=(:isLoggedIn) WHERE id=(:id)";

const QUERY_UPDATE_LOGIN_DATA_LOGIN_STATUS =
  "UPDATE " + TABLE_LOGIN_DATA + " SET is_logged_in=(:isLoggedIn)";

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

    db.transaction(tx => {
      // tx.executeSql("DROP TABLE IF EXISTS user_data");

      tx.executeSql(
        QUERY_CREATE_TABLE_LOGIN_DATA,
        [],
        () => {
          console.log(
            "**** " + TABLE_LOGIN_DATA + " table created successfully."
          );
        },
        err => {
          console.log("*** " + TABLE_LOGIN_DATA + " table creation error!");
          console.log(err.message);
        }
      );

      tx.executeSql(
        QUERY_CREATE_TABLE_USER_DATA,
        [],
        () => {
          console.log(
            "**** " + TABLE_USER_DATA + " table created successfully."
          );
        },
        err => {
          console.log(
            "**** " + TABLE_USER_DATA + " table creation successfull."
          );
          console.log(err.message);
        }
      );
    });
  },

  insertIntoLoginData: (email, token) => {
    db.transaction(tx => {
      tx.executeSql(
        QUERY_SELECT_ALL_FROM_LOGIN_DATA,
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            let isLoggedIn = 1;
            tx.executeSql(
              QUERY_INSERT_INTO_LOGIN_DATA,
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
            DBService.updateLoginData(email, token);
          }
        },
        err => {
          console.log("insertion into " + TABLE_LOGIN_DATA + " table error.");
          console.log(err.message);
        }
      );
    });
  },

  updateLoginData: (email, token) => {
    db.transaction(tx => {
      let isLoggedIn = 1;
      tx.executeSql(
        QUERY_UPDATE_ALL_LOGIN_DATA,
        [email, token, isLoggedIn, 1],
        tx => {
          console.log("" + TABLE_LOGIN_DATA + " email and token updated.");
        },
        err => {
          console.log("" + TABLE_LOGIN_DATA + " update failure.");
          console.log(err.message);
        }
      );
    });
  },

  getTokenIfUserAvailable: callback => {
    db.transaction(tx => {
      tx.executeSql(
        QUERY_SELECT_ALL_FROM_LOGIN_DATA,
        [],
        (tx, res) => {
          console.log("Login data available. Returning token.");
          if (res.rows.length !== 0) {
            console.log("Row count: " + res.rows.length);
            let row = res.rows.item(0);
            callback(row.token, row.is_logged_in);
          } else {
            callback(null);
          }
        },
        err => {
          console.log("Login data not available. returning null.");
          console.log(err.message);
        }
      );
    });
  },

  unsetLoggedInStatus: () => {
    db.transaction(tx => {
      let isLoggedIn = 0;
      tx.executeSql(
        QUERY_UPDATE_LOGIN_DATA_LOGIN_STATUS,
        [isLoggedIn],
        () => {
          console.log("Login status set to 0.");
        },
        err => {
          console.log("Error setting log status to 0.:" + err.message);
          console.log(err.message);
        }
      );
    });
  },

  insertIntoUserData: (userData) => {
    db.transaction(tx => {
      const firstName = userData.firstName;
      const lastName = userData.lastName;
      const email = userData.email;
      const mobile = userData.mobile;
      const emailVerificationStatus = userData.emailVerificationStatus;
      const mobileVerificationStatus = userData.mobileVerificationStatus;
      tx.executeSql(
        QUERY_INSERT_INTO_USER_DATA,
        [
          firstName,
          lastName,
          email,
          mobile,
          emailVerificationStatus,
          mobileVerificationStatus
        ],
        () => {
          console.log("Insert into " + TABLE_USER_DATA + " success.");
        },
        err => {
          console.log("Insert into " + TABLE_USER_DATA + " failure.");
          console.log(err.message);
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
