import prisma from "../db/db.config";
import { User } from "../generated/prisma";

class AuthService {
    async createUser(data: any) {
        const { id, created_at, ...safeData } = data;

        Object.keys(safeData).forEach((key) => {
            if (safeData[key] === undefined || safeData[key] === null) {
                delete safeData[key];
            }
        });

        return await prisma.user.create({ data: { id, created_at, ...safeData } });
    }

    async findUserByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    }

    async findUserByMobile(mobile: string) {
        return await prisma.user.findUnique({ where: { mobile } });
    }
}

export default new AuthService();
