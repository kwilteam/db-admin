import fakeIndexedDB from "fake-indexeddb"
import FDBFactory from "fake-indexeddb/lib/FDBFactory"
import FDBOpenDBRequest from "fake-indexeddb/lib/FDBOpenDBRequest"
import FDBRequest from "fake-indexeddb/lib/FDBRequest"
import FDBCursor from "fake-indexeddb/lib/FDBCursor"
import FDBCursorWithValue from "fake-indexeddb/lib/FDBCursorWithValue"
import FDBDatabase from "fake-indexeddb/lib/FDBDatabase"
import FDBIndex from "fake-indexeddb/lib/FDBIndex"
import FDBObjectStore from "fake-indexeddb/lib/FDBObjectStore"
import FDBTransaction from "fake-indexeddb/lib/FDBTransaction"
import FDBKeyRange from "fake-indexeddb/lib/FDBKeyRange"
import FDBVersionChangeEvent from "fake-indexeddb/lib/FDBVersionChangeEvent"

// Polyfill indexedDB with fakeIndexedDB
global.indexedDB = fakeIndexedDB

// Additional polyfills for IndexedDB API
global.IDBFactory = FDBFactory
global.IDBOpenDBRequest = FDBOpenDBRequest
global.IDBRequest = FDBRequest
global.IDBCursor = FDBCursor
global.IDBCursorWithValue = FDBCursorWithValue
global.IDBDatabase = FDBDatabase
global.IDBIndex = FDBIndex
global.IDBObjectStore = FDBObjectStore
global.IDBTransaction = FDBTransaction
global.IDBKeyRange = FDBKeyRange
global.IDBVersionChangeEvent = FDBVersionChangeEvent
