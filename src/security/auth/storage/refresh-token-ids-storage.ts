import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
    Inject,
    Injectable
} from '@nestjs/common';


export class InvalidatedRefreshTokenError extends Error { }

@Injectable()
export class RefreshTokenIdsStorage {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }
    async insert(userId: number, tokenId: string): Promise<void> {
        await this.cacheManager.set(this.getKey(userId), tokenId);
    }

    async validate(userId: number, tokenId: string): Promise<boolean> {
        const storedId = await this.cacheManager.get(this.getKey(userId));
        if (storedId !== tokenId) {
            throw new InvalidatedRefreshTokenError();
        }
        return storedId === tokenId;
    }

    async invalidate(userId: number): Promise<void> {
        await this.cacheManager.del(this.getKey(userId));
    }

    private getKey(userId: number): string {
        return `user-${userId}`;
    }
}
