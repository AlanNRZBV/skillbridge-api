"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = require("mongoose");
const featureInfoSchema = new mongoose_1.Schema({
    value: { type: Boolean, required: true },
    title: { type: String, required: true },
});
const planSchema = new mongoose_1.Schema({
    type: {
        required: true,
        type: String,
        enum: ["free", "paid"],
    },
    name: {
        required: true,
        type: String,
    },
    perMonth: {
        required: true,
        type: Number,
    },
    perYear: {
        required: true,
        type: Number,
    },
    features: {
        type: Map,
        of: featureInfoSchema,
        required: true,
    },
}, { timestamps: true });
exports.Plan = (0, mongoose_1.model)("Plan", planSchema);
