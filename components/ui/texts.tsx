import Text from "../generic/text";

export default function UiTexts(){
    return (
        <div className="container">
            <Text size="lg" className="mb-2 last:mb-0 block w-full">
                test text
            </Text>
            <Text size="md" className="mb-2 last:mb-0 block w-full">
                test text
            </Text>
            <Text size="base" className="mb-2 last:mb-0 block w-full">
                test text
            </Text>
            <Text size="sm" className="mb-2 last:mb-0 block w-full">
                test text
            </Text>
            <Text size="xs" className="mb-2 last:mb-0 block w-full">
                test text
            </Text>
        </div>
    )
}