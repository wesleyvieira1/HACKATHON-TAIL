import { Suspense } from "react";
import LinkIdentifier from "./components/LinkIdentifier";

export default function Home() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
    <LinkIdentifier/>
    </Suspense>
  );
}
