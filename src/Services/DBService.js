import {
  INI_DELIVERY_LOCATION,
  INI_DELIVERY_VENDOR_ID
} from "../Config/Strings";

var SQLite = require("react-native-sqlite-storage");

const databaseName = "honeybee.db";
const databaseVersion = "1.0";
const databaseDisplayname = "Honeybee";
const databaseSize = 200000;
let db;
const STR_EMPTY = "";
const TABLE_LOGIN_DATA = "login_data";
const TABLE_USER_DATA = "user_data";
const TABLE_INI = "ini";

//create queries *****************************************************************************
const QUERY_CREATE_TABLE_LOGIN_DATA =
  "CREATE TABLE IF NOT EXISTS " +
  TABLE_LOGIN_DATA +
  " (id INTEGER PRIMARY KEY AUTOINCREMENT, mobile VARCHAR(10) NOT NULL, is_logged_in INTEGER DEFAULT 0, token TEXT)";

const QUERY_CREATE_TABLE_USER_DATA =
  "CREATE TABLE IF NOT EXISTS " +
  TABLE_USER_DATA +
  " (id INTEGER PRIMARY KEY AUTOINCREMENT,  first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(200) NOT NULL, mobile VARCHAR(10) NOT NULL, email_verification_status VARCHAR(50), mobile_verification_status VARCHAR(50) NOT NULL)";

const QUERY_CREATE_TABLE_INI =
  "CREATE TABLE IF NOT EXISTS " +
  TABLE_INI +
  " ( key VARCHAR(50) PRIMARY KEY, value VARCHAR(300))";

//select queries *****************************************************************************
const QUERY_SELECT_ALL_FROM_LOGIN_DATA =
  "SELECT * FROM " + TABLE_LOGIN_DATA + "";

const QUERY_SELECT_ALL_FROM_USER_DATA = "SELECT * FROM " + TABLE_USER_DATA + "";

//insert queries *****************************************************************************
const QUERY_INSERT_INTO_LOGIN_DATA =
  "INSERT INTO " +
  TABLE_LOGIN_DATA +
  " (mobile, is_logged_in, token) VALUES (:mobile, :isLoggedIn, :token)";

const QUERY_INSERT_INTO_USER_DATA =
  "INSERT INTO " +
  TABLE_USER_DATA +
  " (first_name, last_name, email, mobile, email_verification_status, mobile_verification_status) VALUES (:firstName, :lastName, :email, :mobile, :emailVerificationStatus, :mobileVerificationStatus)";

const QUERY_UPSERT_INTO_INI_DATA =
  "INSERT OR REPLACE INTO " + TABLE_INI + " (key, value) VALUES (:key, :value)";

//update queries *****************************************************************************
const QUERY_UPDATE_ALL_LOGIN_DATA =
  "UPDATE " +
  TABLE_LOGIN_DATA +
  " SET mobile=(:mobile), token=(:token), is_logged_in=(:isLoggedIn) WHERE id=(:id)";

const QUERY_UPDATE_USER_DATA_MOBILE =
  "UPDATE " + TABLE_USER_DATA + " SET mobile=(:mobile) WHERE id=(:id)";

const QUERY_UPDATE_LOGIN_DATA_LOGIN_STATUS =
  "UPDATE " + TABLE_LOGIN_DATA + " SET is_logged_in=(:isLoggedIn)";

const QUERY_UPDATE_ALL_USER_DATA =
  "UPDATE " +
  TABLE_USER_DATA +
  " SET firstName=(:firstName), lastName=(:lastName), email=(:email), mobile=(:mobile), email_verification_status=(:emailVerificationStatus), mobile_verification_status=(:mobileVerificationStatus) WHERE id=(:id)";

const QUERY_UPDATE_MOBILE_VERIFICATION_STATUS =
  "UPDATE " +
  TABLE_USER_DATA +
  " SET mobile_verification_status=(:status) WHERE id=(:id)";

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
      // tx.executeSql("DROP TABLE IF EXISTS login_data");

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

      tx.executeSql(
        QUERY_CREATE_TABLE_INI,
        [],
        (tx, res) => {
          console.log("**** " + TABLE_INI + " table creation successful.");
          tx.executeSql(
            "INSERT OR IGNORE INTO " +
              TABLE_INI +
              " (key, value) VALUES ('" +
              INI_DELIVERY_VENDOR_ID +
              "', '2')"
          );
          tx.executeSql(
            "INSERT OR IGNORE INTO " +
              TABLE_INI +
              " (key, value) VALUES ('" +
              INI_DELIVERY_LOCATION +
              "', 'Karapakkam')"
          );
        },
        err => {
          console.log("**** " + TABLE_INI + " table creation error.");
        }
      );
    });
  },

  insertIntoLoginData: (mobile, token) => {
    db.transaction(tx => {
      tx.executeSql(
        QUERY_SELECT_ALL_FROM_LOGIN_DATA,
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            let isLoggedIn = 1;
            tx.executeSql(
              QUERY_INSERT_INTO_LOGIN_DATA,
              [mobile, isLoggedIn, token],
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
            DBService.updateLoginData(mobile, token);
          }
        },
        err => {
          console.log("insertion into " + TABLE_LOGIN_DATA + " table error.");
          console.log(err.message);
        }
      );
    });
  },

  updateLoginData: (mobile, token) => {
    db.transaction(tx => {
      let isLoggedIn = 1;
      tx.executeSql(
        QUERY_UPDATE_ALL_LOGIN_DATA,
        [mobile, token, isLoggedIn, 1],
        tx => {
          console.log("" + TABLE_LOGIN_DATA + " mobile and token updated.");
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

  insertIntoUserData: userData => {
    db.transaction(tx => {
      const firstName = userData.firstName;
      const lastName = userData.lastName;
      const email = userData.email;
      const mobile = userData.mobile;
      const emailVerificationStatus = userData.emailVerificationStatus;
      const mobileVerificationStatus = userData.mobileVerificationStatus;

      tx.executeSql(
        QUERY_SELECT_ALL_FROM_USER_DATA,
        [],
        (tx, res) => {
          console.log("User data available. Update method called.");
          if (res.rows.length !== 0) {
            DBService.updateUserData(userData);
          } else {
            console.log("No user data available. Inserting new user data.");
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
          }
        },
        err => {
          console.log("Select from user_data failure. " + err.message);
        }
      );
    });
  },

  updateUserData: userData => {
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const email = userData.email;
    const mobile = userData.mobile;
    const emailVerificationStatus = userData.emailVerificationStatus;
    const mobileVerificationStatus = userData.mobileVerificationStatus;
    const id = 1;
    db.transaction(tx => {
      tx.executeSql(
        QUERY_UPDATE_ALL_USER_DATA,
        [
          firstName,
          lastName,
          email,
          mobile,
          emailVerificationStatus,
          mobileVerificationStatus,
          id
        ],
        tx => {
          console.log("User data updated successfully.");
        },
        err => {
          console.log("User data updation failure. " + err.message);
        }
      );
    });
  },

  updateMobileVerificationStaus: status => {
    const id = 1;
    db.transaction(tx => {
      tx.executeSql(
        QUERY_UPDATE_MOBILE_VERIFICATION_STATUS,
        [status, id],
        (tx, res) => {
          console.log(
            "Mobile verification status updated successfully in local db."
          );
        },
        err => {
          console.log(
            "Mobile verification status updation failure: " + err.message
          );
        }
      );
    });
  },

  updateMobileNumber: mobile => {
    const id = 1;
    db.transaction(tx => {
      tx.executeSql(
        QUERY_UPDATE_USER_DATA_MOBILE,
        [mobile, id],
        (tx, res) => {
          console.log("Mobile number " + mobile + " updated in database.");
        },
        err => {
          console.log(
            "Mobile number updation in database failure: " + err.message
          );
        }
      );
    });
  },

  updateIni(key, value) {
    db.transaction(tx => {
      tx.executeSql(
        QUERY_UPSERT_INTO_INI_DATA,
        [key, value],
        (tx, res) => console.log("INI " + key + " value updated successfully."),
        err => console.log("Error updating INI " + key + ": " + err.message)
      );
    });
  },

  getIniData(key, callback) {
    let value = null;
    db.transaction(tx => {
      tx.executeSql(
        "SELECT value FROM " + TABLE_INI + " WHERE key=(:key)",
        [key],
        (tx, res) => {
          // console.log(res.rows.item(0));
          value = res.rows.item(0).value;
          callback(value);
        },
        err =>
          console.log(
            "Error fetching ini data for key - " + key + ": " + err.message
          )
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
