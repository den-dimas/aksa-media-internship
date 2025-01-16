import { dataDummyUsers } from "../constants";
import { User } from "./types";

export const DB_NAME = "aksamedia";
export const USER_STORE = "users";
export const PRODUCT_STORE = "products";

export class Database {
  DB_NAME: string = "aksamedia";
  USER_STORE: string = "users";
  PRODUCT_STORE: string = "products";

  public static db: IDBDatabase | null = null;

  constructor() {
    this.connect();
  }

  public connect() {
    const connection = indexedDB.open(DB_NAME);

    connection.onerror = function (err) {
      console.log(err);
      return;
    };

    connection.onupgradeneeded = function () {
      const db = connection.result;

      const store = db.createObjectStore(USER_STORE, { autoIncrement: true });

      store.createIndex("name", "name", { unique: true });
      store.createIndex("email", "email", { unique: true });

      store.transaction.oncomplete = () => {
        const userStore = db.transaction(USER_STORE, "readwrite").objectStore(USER_STORE);

        dataDummyUsers.forEach((u) => userStore.add(u));
      };
    };

    connection.onsuccess = function () {
      Database.db = connection.result;
    };
  }

  public searchIndex(store: string, index: string, key: string): IDBRequest<User> | null {
    if (Database.db == null) return null;

    const find = Database.db.transaction(store, "readonly").objectStore(store);

    const idx = find.index(index).get(key);

    return idx;
  }
}
