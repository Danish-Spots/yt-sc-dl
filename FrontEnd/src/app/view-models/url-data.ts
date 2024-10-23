export interface UrlData {
  title: string;
  artist: string;
  /**
   * Base64 encoded string
   * or image url
   */
  image: string;
  /**
   * Any extra images if provided
   */
  images?: string[];
}
