async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return response.json();
}

function renderLinks(links) {
  if (!Array.isArray(links)) return "";
  return links
    .filter((link) => link.label && link.url)
    .map((link) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`)
    .join("");
}

function renderListItems(items, template) {
  if (!Array.isArray(items) || items.length === 0) {
    return "<li class='muted'>No items yet.</li>";
  }
  return items.map(template).join("");
}

async function initHomePage() {
  const profile = await loadJson("data/profile.json");
  const updates = await loadJson("data/updates.json");

  const nameEl = document.getElementById("name");
  if (!nameEl) return;

  document.getElementById("name").textContent = profile.name || "Your Name";
  document.getElementById("headline").textContent = profile.headline || "";
  document.getElementById("aboutMe").textContent = profile.bio || "";
  document.getElementById("profileLinks").innerHTML = renderLinks(profile.links);
  document.getElementById("lastUpdated").textContent = profile.lastUpdated || "-";

  if (profile.profilePhoto) {
    document.getElementById("profilePhoto").src = profile.profilePhoto;
  }

  document.getElementById("currentWorkSummary").textContent =
    profile.currentWorkSummary || "Add your current work summary in data/profile.json.";

  document.getElementById("currentWorkList").innerHTML = renderListItems(
    profile.currentWorkItems,
    (item) => `<li>${item}</li>`
  );

  const researchFocusList = document.getElementById("researchFocusList");
  researchFocusList.innerHTML = renderListItems(
    profile.researchFocusAreas,
    (item) => `<li>${item}</li>`
  );

  document.getElementById("experienceList").innerHTML = renderListItems(
    profile.workExperience,
    (item) => `
      <li>
        <div class="item-title">${item.role || ""} ${item.org ? `- ${item.org}` : ""}</div>
        <div class="muted">${item.period || ""}</div>
        <div>${item.summary || ""}</div>
      </li>
    `
  );

  document.getElementById("timelineList").innerHTML = renderListItems(
    updates,
    (item) => `
      <li>
        <span class="timeline-date">${item.date || ""}</span>
        <span class="item-title">${item.title || ""}</span>
        <div class="muted">${item.details || ""}</div>
      </li>
    `
  );

  const gallery = document.getElementById("gallery");
  const photos = Array.isArray(profile.galleryPhotos) ? profile.galleryPhotos : [];
  if (photos.length === 0) {
    gallery.innerHTML = "<p class='muted'>No photos added yet.</p>";
  } else {
    gallery.innerHTML = photos
      .map(
        (photo) =>
          `<img src="${photo.src}" alt="${photo.alt || "Gallery photo"}" loading="lazy">`
      )
      .join("");
  }

  const highlightedWorks = document.getElementById("highlightedWorks");
  const works = Array.isArray(profile.highlightedWorks) ? profile.highlightedWorks : [];
  if (works.length === 0) {
    highlightedWorks.innerHTML = "<p class='muted'>No highlighted works yet.</p>";
  } else {
    highlightedWorks.innerHTML = works
      .map(
        (work) => `
        <article class="highlight-card">
          ${work.image ? `<img src="${work.image}" alt="${work.title || "Highlighted work"}" loading="lazy">` : ""}
          <div class="content">
            ${work.concept ? `<span class="concept-tag">${work.concept}</span>` : ""}
            <div class="item-title">${work.title || ""}</div>
            <div class="muted">${work.description || ""}</div>
          </div>
        </article>
      `
      )
      .join("");
  }
}

async function initPublicationsPage() {
  const list = document.getElementById("publicationsList");
  if (!list) return;

  const publications = await loadJson("data/publications.json");
  list.innerHTML = renderListItems(
    publications,
    (item) => `
      <li>
        <div class="item-title">${item.title || "Untitled"}</div>
        <div class="muted">${item.authors || ""}</div>
        <div>${item.venue || ""} ${item.year ? `(${item.year})` : ""}</div>
        ${
          item.link
            ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">View paper</a>`
            : ""
        }
      </li>
    `
  );
}

async function initPhotographyPage() {
  const stories = document.getElementById("photoStories");
  if (!stories) return;

  const profile = await loadJson("data/profile.json");
  const photos = Array.isArray(profile.photography) ? profile.photography : [];
  if (photos.length === 0) {
    stories.innerHTML = "<p class='muted'>No photography entries yet.</p>";
  } else {
    stories.innerHTML = photos
      .map(
        (photo) => `
        <figure class="photo-story">
          <img src="${photo.src}" alt="${photo.alt || "Photography image"}" loading="lazy">
          <figcaption>
            <div class="item-title">${photo.title || "Untitled"}</div>
            <div class="muted">${photo.caption || ""}</div>
          </figcaption>
        </figure>
      `
      )
      .join("");
  }
}

async function bootstrap() {
  try {
    await initHomePage();
    await initPublicationsPage();
    await initPhotographyPage();
  } catch (error) {
    console.error(error);
    const fallback = document.createElement("p");
    fallback.className = "muted";
    fallback.textContent = "Could not load some content. Check JSON files in data/.";
    document.body.appendChild(fallback);
  }
}

bootstrap();
