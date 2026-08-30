import Btn from "@/components/generic/btn";
import Heading from "@/components/generic/heading";
import { BtnColors } from "../generic/types";

export default function UiBtns() {
  const text = "continue";
  const colors:BtnColors[] = ["primary" , "success" , "warning" , "danger", "info", "neutral","dim","black"];
  return (
    <div>
      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          normal
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item}>{text}</Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          width icon in right
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} icon="icon-info-circle">
                {text}
              </Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          width icon in left
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} icon="icon-info-circle" iconPlace="end">
                {text}
              </Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          disabled
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} disabled>
                {text}
              </Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          loading
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} loading>
                {text}
              </Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          lightness
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} variant="lightness">
                {text}
              </Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          outline
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} variant="outline">
                {text}
              </Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          outline & lightness
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} variant="outline-lightness">
                {text}
              </Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          text
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} variant="text">
                {text}
              </Btn>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-8">
        <Heading variant="h4" className="mb-2">
          square
        </Heading>
        <div className="-m-2 flex flex-wrap">
          {colors.map((item, index) => (
            <div className="p-2" key={index}>
              <Btn color={item} square icon="icon-info-circle" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
