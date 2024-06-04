import { Request, Response } from '@scloud/lambda-api/dist/types';
import * as ddb from '../helpers/dynamodb';
import { env } from '../helpers/util';

export default async function search(request: Request): Promise<Response> {
  // Validate
  if (!request.query.search) return { statusCode: 400, body: 'search query parameter is required' };

  // Find anything that matches
  const result: Record<string, unknown>[] = [];
  const plants = await ddb.listItems(env('PLANTS'));
  console.log('plants', plants)
  plants.forEach((plant) => {
    let match = false;
    console.log('plant', plant)
    Object.values(plant).forEach((value) => {
      console.log('value', value);
      if ((value || '').toLowerCase().includes(request.query.search.toLowerCase())) match = true;
    });
    if (match) result.push(plant);
  });

  // Return
  return {
    statusCode: 200,
    body: plants
  };
}