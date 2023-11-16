import { useState, useEffect } from "react";

const MemberAvatarUtils = () => {
  const [themeIndex, setThemeIndex] = useState(0);

  const handleThemeIndex = () => {
    const currentThemeIndex = Math.floor(Math.random() * 5) + 1;
    if (currentThemeIndex >= 1 && currentThemeIndex <= 5) {
      setThemeIndex(currentThemeIndex);
    } else {
      setThemeIndex(0);
    }
  };

  useEffect(() => {
    handleThemeIndex();
  }, []);

  return {
    themeIndex,
  };
};

export default MemberAvatarUtils;
