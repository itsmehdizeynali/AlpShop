import Btn from "../generic/btn";
import Chip from "../generic/chip";
import HeaderSection from "../generic/headerSection";

export default function UiHeaderSection() {
  return (
    <>
    <div className="container mb-8">
      <HeaderSection>
        test text
      </HeaderSection>
    </div>

    <div className="container mb-8">
      <HeaderSection
      icon="icon-user"
      shape={false}
        link="/"
      >
        test text
      </HeaderSection>
    </div>
    
    <div className="container mb-8">
      <HeaderSection
        mainSide={
          <Chip color="neutral" variant="lightness" className="ms-auto">
            product number:  553526875
          </Chip>
        }
      >
        test text
      </HeaderSection>
    </div>
    </>
  );
}
