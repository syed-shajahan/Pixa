export interface IpropsData {
    alt_description: string;
    urls: ImageUrls;
    sponsorship: IsponserShips;
    user: Iusers;
    total_pages?: number;
    id?:number;
  }
  
  interface ImageUrls {
    raw: string;
    full: string;
    small: string;
    regular: string;
  }
  
  interface IsponserShip {
    instagram_username: string;
    twitter_username: string;
  }
  
  interface IsponserShips {
    sponsor: IsponserShip;
  }
  
  interface IprofilePictureProps {
    medium: string;
    large: string;
    regular: string;
  }
  
  interface Iusers {
    first_name: string;
    profile_image: IprofilePictureProps;
  }