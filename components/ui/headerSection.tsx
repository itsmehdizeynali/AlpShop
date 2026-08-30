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
        endSide={
          <Btn
            size="sm"
            icon="icon-right-arrow"
            iconPlace="end"
            className="ms-auto"
            variant="outline"
          >
            show all
          </Btn>
        }
      >
        test text
      </HeaderSection>
    </div>
    
    <div className="container mb-8">
      <HeaderSection
        endSide={
          <Chip color="neutral" className="ms-auto">
            account number:  553526875
          </Chip>
        }
      >
        test text
      </HeaderSection>
    </div>
    
    <div className="container mb-8">
      <HeaderSection
        endSide={
          <Chip color="primary">
            spacial
          </Chip>
        }
      >
        test text
      </HeaderSection>
    </div>
    
    <div className="container mb-8">
      <HeaderSection
        endSide={
          <>
          <Chip color="primary" className="me-auto">
            spacial
          </Chip>
          <Btn
            size="sm"
            icon="icon-right-arrow"
            iconPlace="end"
          >
            show all
          </Btn>
          </>
        }
      >
        test text
      </HeaderSection>
    </div>
    </>
  );
}
