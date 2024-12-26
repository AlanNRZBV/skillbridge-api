"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Plan_1 = require("./src/models/Plan");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dropCollection = (db, collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.dropCollection(collectionName);
    }
    catch (e) {
        console.log("=>(fixtures.ts:11)", e);
        console.log(`Collection ${collectionName} was missing, skipped drop...`);
    }
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        const db = mongoose_1.default.connection;
        const collections = ["plans"];
        for (const collectionName of collections) {
            yield dropCollection(db, collectionName);
        }
        yield Plan_1.Plan.create({
            type: "free",
            perYear: 0,
            perMonth: 0,
            name: "Free",
            features: {
                courseAccess: {
                    value: true,
                    title: "Access to selected free courses.",
                },
                materialsAndResources: {
                    value: true,
                    title: "Limited course materials and resources.",
                },
                support: { value: true, title: "Basic community support." },
                certificate: {
                    value: false,
                    title: "No certification upon completion.",
                },
                adds: { value: true, title: "Ad-supported platform." },
                exclusiveForumAccess: {
                    value: false,
                    title: "Access to exclusive Pro Plan community forums.",
                },
                earlyAccess: {
                    value: false,
                    title: "Early access to new courses and updates.",
                },
            },
        }, {
            type: "paid",
            perMonth: 79,
            perYear: 700,
            name: "Pro",
            features: {
                courseAccess: {
                    value: true,
                    title: "Unlimited access to all courses.",
                },
                materialsAndResources: {
                    value: true,
                    title: "Unlimited course materials and resources.",
                },
                support: { value: true, title: "Priority support from instructors." },
                certificate: {
                    value: true,
                    title: "Course completion certificates.",
                },
                adds: { value: true, title: "Ad-free experience." },
                exclusiveForumAccess: {
                    value: true,
                    title: "Access to exclusive Pro Plan community forums.",
                },
                earlyAccess: {
                    value: true,
                    title: "Early access to new courses and updates.",
                },
            },
        });
        yield db.close();
    }
    catch (e) {
        console.log("=>(fixtures.ts:21) e", e);
    }
});
void run();
