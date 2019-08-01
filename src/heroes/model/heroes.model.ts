import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    rating: { type: Number, required: true } ,
});
export interface Hero extends mongoose.Document {
    id: string;
    name: string;
    age: number;
    rating: number;
}
