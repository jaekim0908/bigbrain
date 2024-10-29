import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocument = mutation({
    args: {
        title: v.string(),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        console.log(userId);
        if (!userId) {
            return [];
        }
        await ctx.db.insert('documents', {
            title: args.title,
            tokenIdentifier: userId,
        })
    },
})

export const getDocument = query({
    async handler(ctx) {
        return await ctx.db.query('documents').collect()
    },
})