import mongoose, { Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
}

