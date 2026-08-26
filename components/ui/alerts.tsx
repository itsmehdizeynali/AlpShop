import Alert from "../generic/alert";
import { AlertColors } from "../generic/types";

export default function UiAlerts() {
  const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit";
  const colors:AlertColors[] = ["info", "success", "warning", "danger"];
  return (
    <div className="w-full">
      <div className="container pb-5 last:pb-0">
        {colors.map((item, index) => (
          <div key={index}>
            <Alert color={item} hasIcon={false} className="mb-4">
              {text}
            </Alert>
          </div>
        ))}
      </div>

      <div className="container pb-5 last:pb-0">
        {colors.map((item, index) => (
          <div key={index}>
            <Alert color={item} className="mb-4">
              {text}
            </Alert>
          </div>
        ))}
      </div>

      <div className="container pb-5 last:pb-0">
        {colors.map((item, index) => (
          <div key={index}>
            <Alert
              variant="lightness"
              color={item}
              hasIcon={false}
              className="mb-4"
            >
              {text}
            </Alert>
          </div>
        ))}
      </div>

      <div className="container pb-5 last:pb-0">
        {colors.map((item, index) => (
          <div key={index}>
            <Alert variant="lightness" color={item} className="mb-4">
              {text}
            </Alert>
          </div>
        ))}
      </div>

      <div className="container pb-5 last:pb-0">
        {colors.map((item, index) => (
          <div key={index}>
            <Alert variant="text" color={item} hasIcon={false} className="mb-4">
              {text}
            </Alert>
          </div>
        ))}
      </div>

      <div className="container pb-5 last:pb-0">
        {colors.map((item, index) => (
          <div key={index}>
            <Alert variant="text" color={item} className="mb-4">
              {text}
            </Alert>
          </div>
        ))}
      </div>
    </div>
  );
}
