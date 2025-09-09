export interface PostcodeData {
  roadAddress: string;
  jibunAddress: string;
  autoRoadAddress: string;
  autoJibunAddress: string;
  zonecode: string;
}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: { oncomplete: (data: PostcodeData) => void }) => {
        open: () => void;
        embed: (el: HTMLElement, opts?: { autoClose?: boolean }) => void;
      };
    };
  }
}
