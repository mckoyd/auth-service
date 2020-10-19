import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export default class Password {
  static async toHash(pswd: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(pswd, salt, 64)) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(givenPswd: string, storedPswd: string) {
    const [hashedPswd, salt] = storedPswd.split('.');
    const buffer = (await scryptAsync(givenPswd, salt, 64)) as Buffer;
    return buffer.toString('hex') === hashedPswd;
  }
}
