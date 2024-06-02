import { Response } from '@scloud/lambda-api/dist/types';
import * as ddb from '../helpers/dynamodb';
import { env } from '../helpers/util';

export default async function list(): Promise<Response> {
  const plants = await ddb.listItems(env('PLANTS'));
  return {
    statusCode: 200,
    body: plants
  };
}