import { format } from "date-fns";


const useFormatDate=()=>{

    const getFormatDateToHours=(date:string)=>{
        return format(new Date(date), "HH:mm")
    }
    const getFormatDateToDay=(date:string)=>{
        return format(new Date(date), "dd/MM/yyy")
    }
    return {getFormatDateToHours,getFormatDateToDay}
}
export default useFormatDate