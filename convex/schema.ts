import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    UserTable: defineTable({
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        subscription: v.optional(v.string()),
    }),

    TripTable: defineTable({
        tripId: v.string(),
        uid: v.id('UserTable'),
        tripDetails: v.any()
        }),
});