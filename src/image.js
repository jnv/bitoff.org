const path = require("path");
const { escape } = require("html-escaper");
const Image = require("@11ty/eleventy-img");

const WIDTHS = [720, null];
const SIZES = [
  "(max-width: 42em) calc(100vw - 2rem)", // small screen with body padding
  "calc(70ch - 80px)", // other viewports with figure's default margin
];

function getExt(src) {
  const ext = path.extname(src).substring(1);
  return ext === "jpg" ? "jpeg" : ext;
}

function extToOptions(ext) {
  switch (ext) {
    case "jpeg":
      return { formats: ["webp", "jpeg"] };
    case "png":
      return {
        formats: ["webp", "png"],
        sharpWebpOptions: {
          nearLossless: true,
        },
      };
    default:
      return { formats: [null] };
  }
}

// Until we get .at in Node 18
function lastItem(arr) {
  return arr[arr.length - 1];
}

function imageShortcode(src, alt = "") {
  const srcExt = getExt(src);
  const options = {
    svgShortCircuit: true,
    outputDir: "./_site/img",
    widths: WIDTHS,
    ...extToOptions(srcExt),
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
    sizes: SIZES,
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

module.exports = { imageShortcode };
