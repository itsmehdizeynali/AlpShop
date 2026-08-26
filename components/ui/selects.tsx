import Btn from "../generic/btn";
import Chip from "../generic/chip";
import SelectBox from "../generic/select";
import { ChipColors } from "../generic/types";

export default function UiSelects() {
    const options:{value:number,label:string}[] = [
        {
            value: 0,
            label: 'test 0'
        },
        {
            value: 1,
            label: 'test 1'
        },
        {
            value: 2,
            label: 'test 2'
        },
        {
            value: 3,
            label: 'test 3'
        },
    ]
    const optionsCustom:{
            value: number,
            label: string,
            statusText: string,
            status: ChipColors,
        }[] = [
        {
            value: 0,
            label: 'test 0',
            statusText: 'true',
            status: 'success',
        },
        {
            value: 1,
            label: 'test 1',
            statusText: 'false',
            status: 'danger',
        },
        {
            value: 2,
            label: 'test 1',
            statusText: 'false',
            status: 'warning',
        },
        {
            value: 3,
            label: 'test 1',
            statusText: 'true',
            status: 'info',
        },
    ]
    return (
        <div className="container pb-8">
            <div className="mb-8 last:mb-0">
                <SelectBox
                    label={' select'}
                    options={options}
                />
            </div>
            <div className="mb-8 last:mb-0">
                <SelectBox
                    label={' select endSideLabel'}
                    endSideLabel={<Btn color="primary" size="sm" variant="text">add</Btn>}
                    options={options}
                />
            </div>
            <div className="mb-8 last:mb-0">
                <SelectBox
                    label={' select with castum option'}
                    options={optionsCustom}
                    formatOption={(option) => (
                        <span className="flex items-center text-sm">
                            <span className="inline-block me-3">
                                {option.label}
                            </span>
                            <Chip variant="lightness" color={option.status}>
                                {option.statusText}
                            </Chip>
                        </span>
                    )}
                />
            </div>
        </div>
    )
}