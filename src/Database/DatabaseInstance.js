import SQLite from 'react-native-sqlite-storage';

const database_name = 'Nimble.db';
const database_version = '1.0';
const database_displayname = 'SOB';
const database_size = 200000;
// Add your encryption key here
const encryptionKey = '123456789';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

class Database {
  constructor() {
    this.db = null;
  }

  async initialize() {
    if (!this.db) {
      this.db = await SQLite.openDatabase({
        name: database_name,
        version: database_version,
        displayName: database_displayname,
        size: database_size,
        key: encryptionKey,
      }, () => {
        if (global.DEBUG_MODE) console.log('Database opened');
      },
        error => {
          if (global.DEBUG_MODE) console.error('Error opening database:', error);
        }
      );
    }
  }



  getInstance() {
    return this.db;
  }
}

const databaseInstance = new Database();
databaseInstance.initialize();

export default databaseInstance;