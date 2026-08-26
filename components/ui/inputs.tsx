import Input from "../generic/input";

export default function UiInputs() {
  return (
    <div className="container">
      <div className="-m-2 flex flex-wrap">
        <div className="w-1/2 p-2 last:mb-0">
          <Input label="input title" placeholder="Email" />
        </div>
        <div className="w-1/2 p-2 last:mb-0">
          <Input label="input title with end-side" endSide={<div className="pe-3 text-sm text-dim-light">$</div>} />
        </div>
        <div className="w-1/2 p-2 last:mb-0">
          <Input label="input title with start-side" startSide={<div className="ps-3 text-sm text-dim-light">$</div>} />
        </div>
        <div className="w-1/2 p-2 last:mb-0">
          <Input
            label="input title"
            showMsg={true}
            msg="error"
            msgType="danger"
          />
        </div>
        <div className="w-1/2 p-2 last:mb-0">
          <Input
            label="input title"
            showMsg={true}
            msg="warning"
            msgType="warning"
          />
        </div>
        <div className="w-1/2 p-2 last:mb-0">
          <Input
            label="input title"
            showMsg={true}
            msg="success"
            msgType="success"
          />
        </div>
        <div className="w-1/2 p-2 last:mb-0">
          <Input
            label="input title"
            showMsg={true}
            msg="info"
            msgType="info"
          />
        </div>
      </div>
    </div>
  );
}
