import { Response } from "express";
const success = (res: Response, data: any) => res.status(200).json(data);

const error = (res: Response, err: any) =>
  res.status(500).json({ message: err.message });

const notFound = (res: Response, resource: string) =>
  res.status(404).json({ message: `${resource} not found` });

const badRequest = (res: Response) =>
  res.status(400).json({ message: `Invalid data input found` });

export { success, error as err, notFound, badRequest };
