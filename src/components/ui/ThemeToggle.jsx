import React from "react";
import Button from "./Button.jsx";
import { useTheme } from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? 'Light' : 'Dark';
  const emoji = theme === 'dark' ? '🌞' : '🌙';
  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
      <Button variant="ghost" onClick={toggleTheme}>{emoji} {label}</Button>
    </div>
  );
}

export default ThemeToggle;


