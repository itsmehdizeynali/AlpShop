import type { ReactNode } from "react"

export interface RatingPropsType{
    productRate:number,
    users:number,
    className?:string,
    disabled?:boolean
}

export interface ModalPropsType{
    children:ReactNode,
    closeModal:()=>void,
    isOpenModal:boolean
}