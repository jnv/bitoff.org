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
/*
<iframe src="https://codesandbox.io/embed/react-forms-native-validation-kfg10c?fontsize=14&hidenavigation=1&initialpath=%2F404.html&module=%2Fsrc%2F01-plain-form.js&theme=light&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-forms-native-validation"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

*/

function codesandbox(
  urlOrId,
  runonclick = 0,
  view = "preview",
  title = "",
  path,
  module
) {
  let id = urlOrId;
  if (urlOrId.startsWith("https://")) {
    const url = new URL(urlOrId);
    const pathParts = url.pathname.split("/");
    id = pathParts[2]; // ['', 's', 'id-1234']
  }

  const iframeUrl = new URL(id, "https://codesandbox.io/embed/");
  // https://codesandbox.io/docs/embedding#embed-options
  const params = {
    codemirror: 1,
    hidenavigation: 1,
    initialpath: path,
    runonclick,
    module,
    view,
  };
  for (const [key, value] of Object.entries(params)) {
    if (value != null) {
      iframeUrl.searchParams.set(key, value);
    }
  }

  return `<iframe class="embed-codesandbox" src="${iframeUrl.toString()}" title="${title}" loading="lazy" sandbox="allow-forms allow-scripts"></iframe>`;
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPairedShortcode("figure", figure);
  eleventyConfig.addPairedShortcode("codesandbox", codesandbox);
};
