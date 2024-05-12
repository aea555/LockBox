import { Realm} from '@realm/react'
import { ObjectSchema } from 'realm';

export class SecretSchema extends Realm.Object<SecretSchema> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  site!: string;
  email!: string;
  passwordHash!: string;
  createdAt!: Date;
  lastEdited!: Date;

  static schema: ObjectSchema = {
    name: 'Secret',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      site: 'string',
      email: 'string',
      passwordHash: 'string',
      createdAt: 'date',
      lastEdited: 'date'
    },
  }
}

export class AuthSchema extends Realm.Object<AuthSchema> {
  _id!: Realm.BSON.ObjectId;
  passwordHash!: string

  static schema: ObjectSchema = {
    name: 'Auth',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      passwordHash: 'string',
    },
  };
}