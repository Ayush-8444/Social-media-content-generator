import React from "react";

const OutputDisplay = ({ output, loading }) => {
  if (loading) {
    return <p>Generating content... 🚀</p>;
  }

  if (!output) return null;

  const parseOutput = (text) => {
    const mainPostMatch = text.match(/Main Post:\s*([\s\S]*?)\s*Caption:/);
    const captionMatch = text.match(/Caption:\s*([\s\S]*?)\s*Hashtags:/);
    const hashtagsMatch = text.match(/Hashtags:\s*([\s\S]*)/);

    return {
      mainPost: mainPostMatch ? mainPostMatch[1].trim() : "",
      caption: captionMatch ? captionMatch[1].trim() : "",
      hashtags: hashtagsMatch ? hashtagsMatch[1].trim() : "",
    };
  };

  const { mainPost, caption, hashtags } =
    typeof output === "string" ? parseOutput(output) : {};

  return (
    <div className="output-container">
      {mainPost && (
        <div className="output-box">
          <h3>Main Post</h3>
          <p>{mainPost}</p>
        </div>
      )}

      {caption && (
        <div className="output-box">
          <h3>Caption</h3>
          <p>{caption}</p>
        </div>
      )}

      {hashtags && (
        <div className="output-box">
          <h3>Hashtags</h3>
          <p>{hashtags}</p>
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;
