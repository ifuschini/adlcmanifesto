#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const siteRoot = path.join(repoRoot, "site");
const ignoredSchemes = /^(https?:|mailto:|tel:|data:|javascript:)/i;

function walk(directory, predicate, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, predicate, files);
    } else if (entry.isFile() && predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function htmlIds(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  return new Set(
    [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]),
  );
}

function sitePathToFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);

  if (cleanPath === "" || cleanPath === "/") {
    return path.join(siteRoot, "index.html");
  }

  const withoutLeadingSlash = cleanPath.replace(/^\//, "");
  const asDirectoryIndex = path.join(siteRoot, withoutLeadingSlash, "index.html");

  if (fs.existsSync(asDirectoryIndex)) {
    return asDirectoryIndex;
  }

  return path.join(siteRoot, withoutLeadingSlash);
}

function resolveLocalTarget(sourceFile, rawUrl) {
  const [withoutHash] = rawUrl.split("#");
  const [withoutQuery] = withoutHash.split("?");

  if (withoutQuery === "") {
    return sourceFile;
  }

  if (withoutQuery.startsWith("/")) {
    return sitePathToFile(withoutQuery);
  }

  return path.resolve(path.dirname(sourceFile), withoutQuery);
}

function checkHtmlLinks() {
  const htmlFiles = walk(siteRoot, (filePath) => filePath.endsWith(".html"));
  const idCache = new Map();
  const problems = [];

  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, "utf8");
    const sourceLabel = path.relative(repoRoot, filePath);

    for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
      const rawUrl = match[1];

      if (rawUrl === "#" || ignoredSchemes.test(rawUrl)) {
        continue;
      }

      const target = resolveLocalTarget(filePath, rawUrl);

      if (!fs.existsSync(target)) {
        problems.push(`${sourceLabel}: missing local target ${rawUrl}`);
        continue;
      }

      const hash = rawUrl.includes("#") ? rawUrl.split("#")[1].split("?")[0] : "";

      if (hash && target.endsWith(".html")) {
        if (!idCache.has(target)) {
          idCache.set(target, htmlIds(target));
        }

        if (!idCache.get(target).has(hash)) {
          problems.push(`${sourceLabel}: missing anchor ${rawUrl}`);
        }
      }
    }
  }

  return problems;
}

function checkCssAssets() {
  const cssFiles = walk(siteRoot, (filePath) => filePath.endsWith(".css"));
  const problems = [];

  for (const filePath of cssFiles) {
    const css = fs.readFileSync(filePath, "utf8");
    const sourceLabel = path.relative(repoRoot, filePath);

    for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
      const rawUrl = match[1];

      if (rawUrl.startsWith("#") || ignoredSchemes.test(rawUrl)) {
        continue;
      }

      const [withoutHash] = rawUrl.split("#");
      const [withoutQuery] = withoutHash.split("?");
      const target = path.resolve(path.dirname(filePath), withoutQuery);

      if (!fs.existsSync(target)) {
        problems.push(`${sourceLabel}: missing CSS asset ${rawUrl}`);
      }
    }
  }

  return problems;
}

function checkSiteStructure() {
  const requiredPages = [
    "index.html",
    "it/index.html",
    "es/index.html",
    "fr/index.html",
    "changelog/index.html",
  ];

  return requiredPages
    .filter((pagePath) => !fs.existsSync(path.join(siteRoot, pagePath)))
    .map((pagePath) => `site: missing expected page ${pagePath}`);
}

const problems = [
  ...checkSiteStructure(),
  ...checkHtmlLinks(),
  ...checkCssAssets(),
];

if (problems.length > 0) {
  console.error("Link check failed:");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log("Link check passed.");
