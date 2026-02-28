import { Gender } from '@repo/common';

export interface BaseUserInfo {
  name: string;
  phoneNumber: string;
  gender: Gender;
  age: number;
  profileImageUrl: string;
}
