import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";

export default function ShopAboutServices() {
  return (
    <div className="container mb-section">
      <HeaderSection size="h3" className="mb-sm-section" shape>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </HeaderSection>
      <div className="flex flex-wrap -m-2">
        <div className="md:w-1/4 sm:w-1/2 grow lg:p-2 p-1">
          <Card>
            <div className="w-12 h-12 mb-2.5 flex items-center justify-center bg-primary-light text-primary rounded-lg">
              <i className="icon-chart text-xl"></i>
            </div>
            <Heading variant="h4" className="mb-2">
              lorem ipsum
            </Heading>
            <Text color="dim">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            </Text>
          </Card>
        </div>
        <div className="md:w-1/4 sm:w-1/2 grow lg:p-2 p-1">
          <Card>
            <div className="w-12 h-12 mb-2.5 flex items-center justify-center bg-primary-light text-primary rounded-lg">
              <i className="icon-chart text-xl"></i>
            </div>
            <Heading variant="h4" className="mb-2">
              lorem ipsum
            </Heading>
            <Text color="dim">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            </Text>
          </Card>
        </div>
        <div className="md:w-1/4 sm:w-1/2 grow lg:p-2 p-1">
          <Card>
            <div className="w-12 h-12 mb-2.5 flex items-center justify-center bg-primary-light text-primary rounded-lg">
              <i className="icon-chart text-xl"></i>
            </div>
            <Heading variant="h4" className="mb-2">
              lorem ipsum
            </Heading>
            <Text color="dim">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            </Text>
          </Card>
        </div>
        <div className="md:w-1/4 sm:w-1/2 grow lg:p-2 p-1">
          <Card>
            <div className="w-12 h-12 mb-2.5 flex items-center justify-center bg-primary-light text-primary rounded-lg">
              <i className="icon-chart text-xl"></i>
            </div>
            <Heading variant="h4" className="mb-2">
              lorem ipsum
            </Heading>
            <Text color="dim">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
}
