import { Button } from "../ui/button";
import { ToggleLanguage } from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-8">
      <div className="flex items-center space-x-8">
        <a href="/" className="text-2xl font-bold text-primary">
          API Hub
        </a>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a href="/" className="text-lg font-medium text-primary">
                Docs
              </a>
            </li>
            <li>
              <a href="/" className="text-lg font-medium text-primary">
                Blog
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="space-x-4 flex items-center">
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
      <div className="space-x-4 flex items-center">
        <ToggleLanguage />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
