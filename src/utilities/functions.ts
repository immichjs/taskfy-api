import * as bcrypt from 'bcryptjs';

export async function encryptData(value: string): Promise<string> {
  return bcrypt.hash(value, 10);
}

export async function compareEncryptedValue(
  encryptValue: string,
  compareValue: string,
): Promise<boolean> {
  return bcrypt
    .compare(compareValue, encryptValue)
    .then((response) => response);
}
