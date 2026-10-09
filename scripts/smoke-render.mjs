import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

const routes = [
  ["/", "Home"],
  ["/archive", "Archive"],
  ["/timeline", "Timeline"],
  ["/network", "Network"],
  ["/overview", "Overview"],
];

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { projects } = await server.ssrLoadModule("/src/content/projects.js");
  const { projectScenes } = await server.ssrLoadModule(
    "/src/content/projectScenes.js",
  );
  const { experiences } = await server.ssrLoadModule(
    "/src/content/experience.js",
  );
  if (experiences.length !== 3 || experiences[0].id !== "NTI") {
    throw new Error("Experience timeline is missing the current NTI role");
  }
  const codes = new Set();
  for (const project of projects) {
    if (codes.has(project.code)) throw new Error(`Duplicate project code: ${project.code}`);
    if (projectScenes[project.code]?.length !== 3) {
      throw new Error(`Missing three-stage map for ${project.code}`);
    }
    codes.add(project.code);
  }

  for (const [path, name] of routes) {
    const { default: Page } = await server.ssrLoadModule(
      `/src/pages/${name}.jsx`,
    );
    const html = renderToString(
      React.createElement(
        StaticRouter,
        { location: path },
        React.createElement(Page),
      ),
    );
    if (!html.trim()) throw new Error(`${path} rendered no content`);
    console.log(`${path} rendered (${html.length} characters)`);
  }

  const { default: Archive } = await server.ssrLoadModule(
    "/src/pages/Archive.jsx",
  );
  for (const project of projects) {
    const html = renderToString(
      React.createElement(
        StaticRouter,
        { location: `/archive?project=${project.code}` },
        React.createElement(Archive),
      ),
    );
    if (!html.includes(project.title)) {
      throw new Error(`Archive did not render ${project.code}`);
    }
  }
  console.log(`All ${projects.length} project deep links rendered`);
} finally {
  await server.close();
}
