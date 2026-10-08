// The only file to edit for content.
// Photo files go in img/ (long edge 1400px) and img/thumb/ (long edge 300px).
// Naming: <slug>-<NN>.jpg, NN = 01, 02, ... in order. Run tools/make-web-images.py to build both sizes.
const SITE = {
  name: "Your Name",
  role: "Photographer",
  email: "hello@example.com",
  instagram: "https://www.instagram.com/",
  info: [
    "Write two or three sentences about the practice here.",
    "Representation, print sales and books go in the sections below."
  ],
  sections: [
    { title: "Contact", lines: ["hello@example.com"] },
    { title: "Representation", lines: ["Agency name, City"] }
  ],
  // Order here = order of the viewer, the thumbnails and the index.
  works: [
    { slug: "alpha", title: "Alpha", year: 2026, count: 12 },
    { slug: "beta",  title: "Beta",  year: 2026, count: 12 },
    { slug: "gamma", title: "Gamma", year: 2025, count: 12 }
  ],
  // Optional captions: captions["alpha-01"] = "Text under the photo".
  captions: {}
};
