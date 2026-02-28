interface Window {
  Kakao: {
    init: (appKey: string) => void;
    isInitialized: () => boolean;
    Share: {
      sendDefault: (options: {
        objectType: string;
        content: {
          title: string;
          description: string;
          imageUrl: string;
          link: {
            mobileWebUrl: string;
            webUrl: string;
          };
        };
      }) => void;
    };
  };
}
