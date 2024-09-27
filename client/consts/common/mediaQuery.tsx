class MediaQuery {
  constructor() {
    this.isMobile = "340";
    this.isTablet = "641px";
    this.isSmallDesktop = "1025px";
    this.isMeduimDesktop = "1380px";
    this.isLargeDesktop = "1600px";
  }

  public isMobile: string;
  public isTablet: string;
  public isSmallDesktop: string;
  public isMeduimDesktop: string;
  public isLargeDesktop: string;
}
export const mediaQuery = new MediaQuery();
