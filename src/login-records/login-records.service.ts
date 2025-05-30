import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class LoginRecordsService {
    constructor(private prisma: PrismaService) { }

    // creates login details after login
    async recordLogin(userId: string, ipAddress: string) {
        return this.prisma.loginRecord.create({
            data: {
                userId: userId,
                ipAddress,
                loginAt: new Date(),
            },
        });
    }

    // Fetches login records
    async getLoginRecords() {
        const records = await this.prisma.loginRecord.findMany({
            orderBy: {
                loginAt: 'desc',
            },
            take: 30,
            include: {
                user: true,
            }
        });
        return records.map((rec) => ({
            id: rec.id,
            userId: rec.userId,
            name: rec.user?.username ?? null,
            ipAddress: rec.ipAddress,
            loginTime: dayjs(rec.loginAt).format('YYYY-MM-DD HH:mm:ss'),
        }));
    }

    // Fetches weekly rankings of members
    async getWeeklyLoginRankings() {
        const totalUsers = await this.prisma.member.count();

        // Get weekly login rankings
        const rankings: any[] = await this.prisma.$queryRaw`
        SELECT
            m.username,
            COUNT(lr.id) AS "loginCount",
            RANK() OVER (ORDER BY COUNT(lr.id) DESC) AS rank
        FROM
            "LoginRecord" lr
        JOIN
            "member" m ON lr."userId" = m.id
        WHERE
            lr."loginAt" >= date_trunc('week', CURRENT_DATE) AND
            lr."loginAt" < date_trunc('week', CURRENT_DATE) + interval '7 days'
        GROUP BY
            m.username
        ORDER BY
            rank ASC
        LIMIT 20;
    `;

        let rankingData = rankings.map((row) => {
            const rankRow: any = {};
            for (const key in row) {
                const value = row[key];
                rankRow[key] = typeof value === 'bigint' ? Number(value) : value;
            }
            return rankRow;
        });

        // If no login records exist this week
        if (rankingData.length === 0) {
            return {
                totalUsers,
                rankings: [],
                message: 'No login records this week.',
            };
        }

        return {
            totalUsers,
            rankingData,
        };
    }

}
