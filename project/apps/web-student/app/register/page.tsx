import { Home } from "@/components/home/Home";
import RegisterScreen from "@/components/register/RegisterScreen";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import React from "react";

export default function HomePage() {
  return (
    <ScreenTransition>
      <RegisterScreen></RegisterScreen>
    </ScreenTransition>
  );
}
