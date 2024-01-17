const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

const WIDTHS = [720, null];

function getExt(src) {
  const ext = path.extname(src).substring(1);
  return ext === "jpg" ? "jpeg" : ext;
}

function extToOptions(ext) {
  if (ext === "png") {
    return {
      sharpWebpOptions: { nearLossless: true },
    };
  }
  return {};
}

function getSizes(largestWidth) {
  const sizes = [
    "(max-width: 42em) calc(100vw - 2rem)", // small screen with body padding
    `min(calc(70ch - 80px), ${largestWidth}px)`, // other viewports with figure's default margin - or the image width
  ];
  return sizes.join(",");
}

function imageShortcode(src, alt = "") {
  const srcExt = getExt(src);
  const options = {
    svgShortCircuit: true,
    outputDir: "./_site/img/generated",
    urlPath: "/img/generated/",
    formats: ["webp", "auto"],
    widths: WIDTHS,
    ...extToOptions(srcExt),
  };

  // https://gfscott.com/blog/eleventy-img-without-central-image-directory/#the-solution
  const fileSrc = path.join(".", path.dirname(this.page.inputPath), src);

  // generate images, while this is async we don’t wait
  eleventyImage(fileSrc, options);

  // get metadata even the images are not fully generated
  const metadata = eleventyImage.statsSync(fileSrc, options);

  const originalFile = metadata[srcExt].at(-1);
  const originalWidth = originalFile.width;
  const imageAttributes = {
    alt,
    decoding: "async",
    sizes: getSizes(originalWidth),
  };
  const imageHtml = eleventyImage.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });

  if (originalWidth > 300) {
    return `<a href="${originalFile.url}" class="link-img">${imageHtml}</a>`;
  } else {
    return imageHtml;
  }
}

module.exports = { imageShortcode };
