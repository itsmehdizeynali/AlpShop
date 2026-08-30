import Text from "./text";
import type { PricePropsType } from "./types";


export default function Price({children}:PricePropsType){
    return(
        <Text color="black" weight="black" size="base">
            ${children}
        </Text>
    )
}