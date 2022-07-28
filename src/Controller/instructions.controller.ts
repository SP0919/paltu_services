import { catchAsync } from '../utils/catchAsync.util';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.config';
import { errorRespond, successRespond } from '../utils/responseHandler';
/**
 *  List all Instruction Arrival's Details
 *  table used @instructions
 */
export const all = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const instruction = await prisma.instruction.findMany();
  if (instruction) {
    const data = { data: instruction, message: 'Instruction Fetched  Successfully.' };
    return successRespond(data, req, res, next);
  } else {
    const data = { status: '500', message: 'No data Found.' };
    return errorRespond(data, req, res, next);
  }
});

/**
 *  Create Instruction Arrival's Details
 *  table used @instructions
 */
export const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const instruction = await prisma.instruction.create({
    data: {
      created_at: new Date(),
      delivery_address: req.body.deliveryAddress,
      booking_instructions: req.body.bookingInstructions,
      // drop_off_instructions: req.body.dropOffInstructions,
      airline_id: req.body.airlineId,
      airport_id: req.body.airportId,
      region_id: req.body.regionId,
    },
  });
  if (instruction) {
    const data = { data: instruction, message: 'Instruction Created  Successfully.' };
    return successRespond(data, req, res, next);
  } else {
    const data = { status: '500', message: 'No data Found.' };
    return errorRespond(data, req, res, next);
  }
});

/**
 *  Update Instruction  Details
 *  table used @instructions
 */
export const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const checkInstruction = await prisma.instruction.findUnique({
      where: {
        id: req.body.id,
      },
    });
    if (checkInstruction) {
      const updateInstruction = await prisma.instruction.update({
        where: {
          id: req.body.id,
        },
        data: {
          updated_at: new Date(),
          delivery_address: req.body.deliveryAddress,
          booking_instructions: req.body.bookingInstructions,
          // drop_off_instructions: req.body.dropOffInstructions,
          // airlineId             :   req.body.airlineId,
          // airportId             :   req.body.airportId,
          // regionId              :   req.body.regionId,
        },
      });
      const data = { data: updateInstruction, message: 'Instruction Updated  Successfully.' };
      return successRespond(data, req, res, next);
    }
  } catch (e) {
    return res.json('No Record found!');
  }
});
