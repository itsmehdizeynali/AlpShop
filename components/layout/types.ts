export interface CategoryModalListItemPropsType {
  item: {
    name: string;
    href: string;
    childrens?: {
      name: string;
      href: string;
    }[];
  };
  className?:string
}
export interface CategoryModalPropsType {
  closeModal: ()=>void;
  isOpenModal:boolean
}
