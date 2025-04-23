import { AppDataSource } from '../data-source';
import { Secret } from '../entities/Secret';
import { logMessage } from './logger';

type SecretKeyName = 'alpha_vantage_key' | 'polygon_io_key' | 'jwt_secret';

const secretCache = new Map<SecretKeyName, string>();

export async function getSecret(keyName: SecretKeyName): Promise<string> {
  if (secretCache.has(keyName)) {
    logMessage('info', `Using cached secret for ${keyName}`);
    return secretCache.get(keyName)!;
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logMessage('info', 'Initialized AppDataSource for secret retrieval');
    }

    const secretRepository = AppDataSource.getRepository(Secret);
    const secret = await secretRepository.findOne({
      where: { key_name: keyName }
    });

    if (!secret || !secret.key_value) {
      logMessage('error', `Secret '${keyName}' not found in secrets table`);
      throw new Error(`Secret '${keyName}' not found in database. Please add it to the secrets table.`);
    }

    secretCache.set(keyName, secret.key_value);
    logMessage('info', `Successfully fetched and cached secret for ${keyName}`);
    return secret.key_value;
  } catch (error: any) {
    logMessage('error', `Failed to fetch secret '${keyName}': ${error.message}`);
    throw new Error(`Failed to fetch secret '${keyName}': ${error.message}`);
  }
}