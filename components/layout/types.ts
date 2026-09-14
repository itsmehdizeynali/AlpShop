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

export interface ToolbarPropsType {
  className:string
}
export interface HeaderPropsType {
  className:string
}
export interface FooterPropsType {
  className:string
}
