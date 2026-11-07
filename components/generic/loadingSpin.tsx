import clsx from "clsx";

export default function LoadingSpin({color="white",className=""}:{color?:"primary"|"white",className?:string}) {
  const colors={
    primary:"border-r-primary",
    white:"border-r-white",
  }
  return (
    <span className={clsx(colors[color],className,"my-2 w-5 h-5 border-[3px] border-solid border-b-primary border-primary/10 rounded-full block animate-spin m-auto")}></span>
  );
}
