import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseModule = registerAs(
  'mongooseModule',
  (): MongooseModuleOptions => ({
    uri: process.env.MONGODB_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
);
