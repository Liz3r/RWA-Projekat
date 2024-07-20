import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
    secret: 'kljuc za token',
  };


export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
  