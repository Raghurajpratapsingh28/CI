import prisma from "../db/db.config";
import { Prisma } from "../generated/prisma";

class UserService {
    async findUserById(userId: string) {
        return await prisma.user.findUnique({
            where: { id: userId },
        });
    }

    async updateProfile(
        userId: string,
        updates: Partial<Prisma.UserUpdateInput>
    ) {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updates,
        });

        return updatedUser;
    }

    async deleteProfile(userId: string) {
        return await prisma.user.update({
            where: { id: userId },
            data: { isDeleted: true },
        });
    }
}

export default new UserService();
