import * as schemaType from './schemaType';

export const StoreInfoSchema = {
    name: schemaType.STORE_SCHEMA,
    primaryKey: '_id',
    properties: {
        _id: { type: 'string' },
        storeId: { type: 'string' },
        image: { type: 'string' }
    }
};