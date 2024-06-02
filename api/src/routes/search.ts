import { Request, Response } from '@scloud/lambda-api/dist/types';
import * as ddb from '../helpers/dynamodb';
import { env } from '../helpers/util';

export default async function search(request: Request): Promise<Response> {
  // Validate
  if (!request.query.search) return { statusCode: 400, body: 'search query parameter is required' };

  // Find anything that matches
  const plants = await ddb.listItems(env('PLANTS'));
  const result: Record<string, unknown>[] = [];
  plants.forEach((plant) => {
    let match = false;
    Object.values(plant).forEach((value) => {
      if (value.toLowerCase().includes(request.query.search.toLowerCase())) match = true;
    });
    if (match) result.push(plant);
  });

  // Return
  return {
    statusCode: 200,
    body: plants
  };
}