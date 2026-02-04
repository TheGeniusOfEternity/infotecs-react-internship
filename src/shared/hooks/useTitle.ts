import { useEffect } from "react";

export const useTitle = (
  title: string,
  defaultTitle = "React - Тестовое задание",
) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `ИнфоТеКС - ${title || defaultTitle}`;

    return () => {
      document.title = prevTitle;
    };
  }, [title, defaultTitle]);
};
