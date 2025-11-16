export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface MediaPresignedUrlRequest {
  fileName: string;
  fileSize: number;
  contentType: string;
  fileType: 'FILE' | 'IMAGE' | 'VIDEO';
  videoDuration?: number;
}

export interface PresignedUrlResponse {
  tempKey: string;
  presignedUrl: string;
}
