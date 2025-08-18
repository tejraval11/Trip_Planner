import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewTrip = mutation({
    args: {
        tripId: v.string(),
        uid: v.id('UserTable'),
        tripDetails: v.any(),
        },

        handler: async (ctx, args) => {
            const result = await ctx.db.insert('TripTable', {
                tripId: args.tripId,
                uid: args.uid,
                tripDetails: args.tripDetails,
            });
        }
    })
