import React from "react";
import { PresetSelector } from "./preset-selector";
import { ThemeToggle } from "./theme-toggle";

const Navbar: React.FC = () => {
  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Lexer</h1>

          <div className="ml-auto flex items-center space-x-4">
            <PresetSelector />

            <ThemeToggle/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
