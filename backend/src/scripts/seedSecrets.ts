// scripts/seedSecrets.ts
import { AppDataSource } from '../data-source';
import { Secret } from '../entities/Secret';

async function seedSecrets() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Secret);

  const existing = await repo.findOne({ where: { key_name: 'jwt_secret' } });
  if (!existing) {
    const secret = repo.create({
      key_name: 'jwt_secret',
      key_value: 'your_super_secure_jwt_secret'
    });
    await repo.save(secret);
    console.log('✅ jwt_secret added');
  } else {
    console.log('⚠️ jwt_secret already exists');
  }

  await AppDataSource.destroy();
}

seedSecrets().catch(console.error);
