import { Inter } from "next/font/google";
import "@bitovyevolki/ui-kit-int/css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <div>
          <nav>
            <ul>
              <li>
                <Link href="/forgotpassword">Forgot password</Link>
              </li>
              <li>
                <Link href="/signin">Sign In</Link>
              </li>
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
