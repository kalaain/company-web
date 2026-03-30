import { useEffect } from "react";
 
type PageSeoOptions = {
  title: string;
  description: string;
};
 
export function usePageSeo({ title, description }: PageSeoOptions) {
  useEffect(() => {
    document.title = `${title} | PT SMJ Agro`;
 
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);
  }, [title, description]);
}
 