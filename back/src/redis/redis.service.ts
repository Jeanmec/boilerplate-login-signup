import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.client.on('error', (err) => {
      console.error('Erreur Redis :', err);
    });
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('✅ Connexion à Redis réussie');
  }

  async onModuleDestroy() {
    await this.client.quit();
    console.log('❌ Déconnexion de Redis');
  }

  async setValidationUserEmail(email: string, code: string): Promise<void> {
    await this.set(`validation:email:${email}`, code, 15 * 60);
  }

  async getValidationUserEmail(email: string): Promise<string | null> {
    return this.get(`validation:email:${email}`);
  }

  async set(
    key: string,
    value: string,
    expireInSeconds?: number,
  ): Promise<void> {
    await this.client.set(key, value);
    if (expireInSeconds) {
      await this.client.expire(key, expireInSeconds);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }
}
