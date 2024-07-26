import { Switch } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.className = theme;
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
        <Switch onClick={toggleTheme} defaultChecked/>
      </nav>
    </header>
  );
};

export default Header;
