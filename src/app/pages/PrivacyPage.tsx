import { PrivacyPolicy } from "../components/PrivacyPolicy";
import { useNavigate } from "react-router-dom";

export function PrivacyPage() {
  const navigate = useNavigate();
  return <PrivacyPolicy onBack={() => navigate("/")} />;
}
