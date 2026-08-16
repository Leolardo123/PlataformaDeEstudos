import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";

export default function DashboardPage() {
  return (
    <ScreenTransition>
      <AdminDashboard />
    </ScreenTransition>
  );
}
    
