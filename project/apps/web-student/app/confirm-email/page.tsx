import ConfirmEmailScreen from "@/components/confirmEmail/ConfirmEmail";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import React from "react";

export default function HomePage() {
  return (
    <ScreenTransition>
      <ConfirmEmailScreen></ConfirmEmailScreen>
    </ScreenTransition>
  );
}
