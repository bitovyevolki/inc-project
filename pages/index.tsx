import { Button } from "@/node_modules/@bitovyevolki/ui-kit-int/dist/index";
import { Inter } from "next/font/google";
import "@bitovyevolki/ui-kit-int/css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <Button variant="primary" fullWidth={true}>
          hi
        </Button>
      </div>
    </>
  );
}
