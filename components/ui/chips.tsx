import Chip from "../generic/chip"
import { ChipColors } from "../generic/types"

export default function UiChips() {
    const text = 'test text'
    const colors:ChipColors[] = ["info", "success", "warning", "danger", "primary", "neutral"]
    return (
        <div>
            <div className="container pb-8 last:pb-0">
                <div className="-m-2 flex flex-wrap">
                    {
                        colors.map((item, index) => (
                            <div className="p-2" key={index}>
                                <Chip color={item} icon='icon-right-arrow'>
                                    {text}
                                </Chip>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="container pb-8 last:pb-0">
                <div className="-m-2 flex flex-wrap">
                    {
                        colors.map((item, index) => (
                            <div className="p-2" key={index}>
                                <Chip variant="lightness" color={item} icon='icon-right-arrow' >
                                    {text}
                                </Chip>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="container pb-8 last:pb-0">
                <div className="-m-2 flex flex-wrap">
                    {
                        colors.map((item, index) => (
                            <div className="p-2" key={index}>
                                <Chip variant="outline" color={item} icon='icon-right-arrow' >
                                    {text}
                                </Chip>
                            </div>
                        ))
                    }
                </div>
            </div>          
        </div>
    )
}