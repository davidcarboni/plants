import { Request, Response } from '@scloud/lambda-api/dist/types';
import * as ddb from '../helpers/dynamodb';
import { env } from '../helpers/util';

export default async function get(request: Request): Promise<Response> {
  // Validate
  if (!request.query.id) return { statusCode: 400, body: 'id query parameter is required' };

  // Find the item
  const plant = await ddb.getItem(env('PLANTS'), { id: request.query.id });

  // Return
  if (!plant) return { statusCode: 404, body: `Plant not found for id ${request.query.id}` };
  return {
    statusCode: 200,
    body: plant
  };
}