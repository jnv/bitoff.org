const path = require("path");
const { escape } = require("html-escaper");
const Image = require("@11ty/eleventy-img");

function getExt(src) {
  const ext = path.extname(src).substring(1);
  return ext === "jpg" ? "jpeg" : ext;
}

function extToFormats(ext) {
  switch (ext) {
    case "jpeg":
      return ["avif", "webp", "jpeg"];
    case "png":
      return ["avif", "webp", "png"];
    case "svg":
      return ["svg"];
    default:
      return undefined;
  }
}

// Until we get .at in Node 18
function lastItem(arr) {
  return arr[arr.length - 1];
}

function imageShortcode(src, alt = "") {
  const srcExt = getExt(src);
  const options = {
    formats: extToFormats(srcExt),
    outputDir: "./_site/img",
  };

  // https://gfscott.com/blog/eleventy-img-without-central-image-directory/#the-solution
  const fileSrc = path.join(".", path.dirname(this.page.inputPath), src);

  // generate images, while this is async we don’t wait
  Image(fileSrc, options);

  const imageAttributes = {
    // ffs https://github.com/11ty/eleventy-img/issues/82
    alt: escape(alt),
    loading: "lazy",
    decoding: "async",
  };
  // get metadata even the images are not fully generated
  const metadata = Image.statsSync(fileSrc, options);

  const imageHtml = Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });

  const originalFile = lastItem(metadata[srcExt]);
  if (originalFile.width > 300) {
    return `<a href="${originalFile.url}" class="link-img">${imageHtml}</a>`;
  } else {
    return imageHtml;
  }
}

function figure(content, src, alt) {
  const img = imageShortcode.call(this, src, alt);

  const caption =
    content.trim() === "" ? "" : `<figcaption>\n${content}\n</figcaption>`;
  return `<figure>
${img}
${caption}
</figure>`;
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPairedShortcode("figure", figure);
};
