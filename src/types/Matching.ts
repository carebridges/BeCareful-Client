import { Gender } from '@/types/SocialSignUp';

export interface ElderData {
  isMatching?: boolean;
  elderlyId: number;
  name: string;
  age: number;
  gender: Gender;
  careLevel: string;
  caregiverNum?: number;
  imageUrl?: string;
  cognitiveLevel?: string;
}
