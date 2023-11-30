import Realm from 'realm';
import * as Schema from './schema';
import * as schemaType from './schemaType';

let schemaArray = [
    Schema.StoreInfoSchema
]

export const databaseOptions = (databaseName) => {
    return {
        path: databaseName,
        schema: schemaArray,
        schemaVersion: 0, //optional  
    }
};

export const createStoreImage = (obj) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions((global.databaseName != undefined || global.databaseName != null) ? global.databaseName : 'store.realm')).then((realm) => {
        realm.write(() => {
            realm.create(schemaType.STORE_SCHEMA, obj);
            resolve();
        });
    })
        .catch((error) => reject(error));
});

export const deleteAllStoreImage = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions((global.databaseName != undefined || global.databaseName != null) ? global.databaseName : 'store.realm')).then((realm) => {
        realm.write(() => {
            let response = realm.objectForPrimaryKey(schemaType.STORE_SCHEMA);
            realm.delete(response);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteStoreImage = (Id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions((global.databaseName != undefined || global.databaseName != null) ? global.databaseName : 'store.realm')).then((realm) => {
        realm.write(() => {
            let deleteObj = realm.objectForPrimaryKey(schemaType.STORE_SCHEMA, Id);
            realm.delete(deleteObj);
            resolve();
        });
    })
        .catch((error) => reject(error));
});

export const getAllStoreImage = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions((global.databaseName != undefined || global.databaseName != null) ? global.databaseName : 'store.realm')).then((realm) => {
        realm.write(() => {
            let response = realm.objects(schemaType.STORE_SCHEMA);
            resolve(response);
        });
    }).catch((error) => reject(error));
});

export default new Realm(databaseOptions((global.databaseName != undefined || global.databaseName != null) ? global.databaseName : 'store.realm'));