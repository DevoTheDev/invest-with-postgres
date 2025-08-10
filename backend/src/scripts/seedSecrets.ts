// src/seeds/seed.ts
import { AppDataSource } from '../data-source';
import { Secret } from '../entities/Secret';

const seed = async () => {
  await AppDataSource.initialize();

  const secrets = [
    {
      key_name: 'jwt_secret',
      key_value: 'your-super-secret-key',
    },
    {
      key_name: 'alpha_vantage_key',
      key_value: 'PL8HXL9DJH4ZSCQU',
    },
    {
      key_name: 'polygon_io_key',
      key_value: 'PV52UC0UkhnXU0ihkvi27Bdu_YctpZeB',
    },
  ];

  for (const s of secrets) {
    const existing = await AppDataSource.manager.findOne(Secret, {
      where: { key_name: s.key_name },
    });

    if (!existing) {
      const secret = new Secret();
      secret.key_name = s.key_name;
      secret.key_value = s.key_value;
      await AppDataSource.manager.save(secret);
      console.log(`✅ Seeded ${s.key_name}`);
    } else {
      console.log(`⚠️  ${s.key_name} already exists`);
    }
  }

  process.exit();
};

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
