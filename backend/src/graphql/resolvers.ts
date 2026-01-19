import User from "../models/user.model";

export const resolvers = {
    Query: {
        users: async () => {
            return await User.find().sort({ createdAt: 1 });
        },
        user: async (_: any, { id }: { id: string }) => {
            return await User.findById(id);
        }
    }
}