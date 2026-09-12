import LoginScreen from "@/components/login/LoginScreen";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import React from "react";

export default function HomePage() {
  return (
    <ScreenTransition>
      <LoginScreen></LoginScreen>
    </ScreenTransition>
  );
}
