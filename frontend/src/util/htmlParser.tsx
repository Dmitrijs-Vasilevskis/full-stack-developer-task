import parse from "html-react-parser";
import DOMPurify from "dompurify";

export const renderSafeHTML = (htmlString: string) => {
  const cleanedHTML = htmlString.replace(/\\n/g, "").replace(/\\/g, "");

  const cleanHTML = DOMPurify.sanitize(cleanedHTML);
  return parse(cleanHTML);
};
