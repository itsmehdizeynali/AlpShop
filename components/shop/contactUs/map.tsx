"use client";

import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";

export default function ShopContactUsMap() {
  return (
    <div className="container my-section">
      <Card hasBorder color="transparent">
        <HeaderSection size="h3" className="mb-sm-section" shape>
          Map
        </HeaderSection>
          <iframe className="w-full h-[450px] rounded-xl grayscale-100" src="https://balad.ir/embed?p=4TQe87lw3v36aq" title="el goli"></iframe>
      </Card>
    </div>
  );
}
