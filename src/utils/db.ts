import { dataDummyUsers } from "../constants";
import { User } from "./types";

export class Database {
  public static DB_NAME: string = "aksamedia";
  public static USER_STORE: string = "users";
  public static PRODUCT_STORE: string = "products";

  public db: IDBDatabase;

  private constructor(db: IDBDatabase) {
    this.db = db;
  }

  public static async init() {
    return new Promise<Database>((resolve, reject) => {
      const connection = indexedDB.open(Database.DB_NAME);

      connection.onerror = function (err) {
        reject(err);
      };

      connection.onupgradeneeded = function () {
        const db = connection.result;

        const store = db.createObjectStore(Database.USER_STORE, { autoIncrement: true });

        store.createIndex("name", "name", { unique: false });
        store.createIndex("email", "email", { unique: true });

        store.transaction.oncomplete = () => {
          const userStore = db.transaction([Database.USER_STORE], "readwrite").objectStore(Database.USER_STORE);

          dataDummyUsers.forEach((u) => userStore.add(u));
        };
      };

      connection.onsuccess = function () {
        resolve(new Database(connection.result));
      };
    });
  }

  public static async connect() {
    return new Promise<Database>((resolve, reject) => {
      const connection = indexedDB.open(Database.DB_NAME);

      connection.onsuccess = function () {
        resolve(new Database(connection.result));
      };

      connection.onerror = function (err) {
        reject(err);
      };
    });
  }

  public async searchEmail(email: string) {
    return new Promise<User>((resolve, reject) => {
      if (this.db == null) reject("Database is not connected!");
      else {
        const find = this.db.transaction([Database.USER_STORE], "readonly").objectStore(Database.USER_STORE);

        const idx = find.index("email").get(email);

        idx.onsuccess = function () {
          resolve(idx.result);
        };
      }
    });
  }

  public async changeUserByEmail(email: string, name: string) {
    return new Promise<User>((resolve, reject) => {
      if (this.db == null) reject("Database is not connected!");
      else {
        const userStore = this.db.transaction([Database.USER_STORE], "readwrite").objectStore(Database.USER_STORE);

        const findUser = userStore.index("email").openCursor();

        findUser.onsuccess = function () {
          const cursor = findUser.result;

          if (cursor && cursor.value.email == email) {
            const changeUser = userStore.put({ ...cursor.value, name }, cursor.primaryKey);

            changeUser.onsuccess = () => resolve({ ...cursor.value, name });
            changeUser.onerror = (err) => {
              console.log(err);
              reject("Cannot change user!");
            };
          } else {
            cursor?.continue();
          }
        };

        findUser.onerror = function () {
          reject("Cannot find user!");
        };
      }
    });
  }

  public async searchIndex<T>(store: string, index: string, key: string) {
    return new Promise<T>((resolve, reject) => {
      if (this.db == null) reject("Database is not connected");
      else {
        const find = this.db.transaction(store, "readonly").objectStore(store);

        const idx = find.index(index).get(key);

        idx.onsuccess = function () {
          resolve(idx.result);
        };
      }
    });
  }

  public async getUsers() {
    return new Promise<User[]>((resolve, reject) => {
      if (this.db == null) reject("Database is not connected!");
      else {
        const userStore = this.db.transaction([Database.USER_STORE], "readonly").objectStore(Database.USER_STORE);

        const findUsers = userStore.getAll();

        findUsers.onsuccess = function () {
          if (!findUsers.result) reject("Couldn't get users!");

          resolve(findUsers.result);
        };

        findUsers.onerror = function (err) {
          reject(err.target);
        };
      }
    });
  }

  public async getUsersCount() {
    return new Promise<number>((resolve, reject) => {
      if (this.db == null) reject("Database is not connected!");
      else {
        const userStore = this.db.transaction([Database.USER_STORE], "readonly").objectStore(Database.USER_STORE);

        const countUsers = userStore.count();

        countUsers.onsuccess = function () {
          resolve(countUsers.result);
        };

        countUsers.onerror = function () {
          reject("Error counting Users size!");
        };
      }
    });
  }
}
