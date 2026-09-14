export interface ArticleType {
  id: string;
  img: string;
  title: string;
  paragraph: string;
  category: {
    name: string;
    textColor: string;
    backgroundColor: string;
  };
  date: string;
  time: number;
}

export interface ProductType {
  id: string;
  img: string;
  name: string;
  rate: {
    users: number;
    rate: number;
  };
  discount?: number;
  price: number;
  realPrice: number;
}
