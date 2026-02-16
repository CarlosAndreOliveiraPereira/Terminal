import { TermsOfUse } from "../components/TermsOfUse";
import { useNavigate } from "react-router-dom";

export function TermsPage() {
  const navigate = useNavigate();
  return <TermsOfUse onBack={() => navigate("/")} />;
}
