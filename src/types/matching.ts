import { Gender } from '@/types/SocialSignUp';

export interface ElderDataTemp {
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

export interface ElderData {
  elderlyId: number;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: Gender;
  elderlyLocation: string;
  elderlyCareLevel: string;
  elderlyProfileImageUrl: string;
}

export interface ElderListResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  content: ElderData[];
}
