import { About } from "../components/About";
import { Values } from "../components/Values";
import { Owners } from "../components/Owners";

export function AboutPage() {
  return (
    <div className="pt-20">
      <About />
      <Owners />
      <Values />
    </div>
  );
}