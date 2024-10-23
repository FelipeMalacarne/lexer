import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-lg font-semibold">Lexer</h1>

            <div className="ml-auto flex items-center space-x-4">
              <Button>teste</Button>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
