import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
    digitValue: {type: Number, required: false},
    multiplier: {type: Number, required: false},
    tolerancePercentage: {type: Number, required: false},
    
})

const ResistanceSchema = new mongoose.Schema({
    none: ColorSchema,
    pink:ColorSchema,
    silver:ColorSchema,
    gold: ColorSchema,
    black: ColorSchema,
    brown: ColorSchema,
    red: ColorSchema,
    orange: ColorSchema,
    yellow: ColorSchema,
    green: ColorSchema,
    blue: ColorSchema,
    violet:ColorSchema,
    gray: ColorSchema,
    white: ColorSchema,
})

export const Resistance = mongoose.model("Resistance", ResistanceSchema);