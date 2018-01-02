import {schema} from 'normalizr';

const language = new schema.Entity('language', {idAttribute: 'id'});

const translation = new schema.Entity('translations',
    {language: language},
    {idAttribute: entity => entity.languageId}
);

const city = new schema.Entity('city', {
    translations: [translation],
});

export const citiesSchema = new schema.Array(city);

export {city};
