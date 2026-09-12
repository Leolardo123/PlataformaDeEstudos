import { Home } from "@/components/home/Home";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import React from "react";

export default function HomePage() {
  return (
    <ScreenTransition>
      <Home></Home>
    </ScreenTransition>
  );
}
