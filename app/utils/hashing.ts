import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';

config();

export const hashPassword = async (
  password: string
): Promise<string> => {
  return await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_ROUND)
  );
};
