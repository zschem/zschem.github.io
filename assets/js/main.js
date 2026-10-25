/* ==========================================================================
   Shah Lab / Muhammad Zeeshan Shah, Ph.D. — Interactive Scripts
   Handles Shair-Lab style Slide-in Menu Drawer, Site Search Modal, and Filters
   ========================================================================== */

const SITE_SEARCH_INDEX = [
  {
    title: "Research Overview — Biomaterials, Polymer Chemistry & Lipid Nanoparticles",
    url: "research.html",
    snippet: "Rational design, RAFT polymerization, modular bioconjugation (PEG, amino acids, VEMADs), and self-assembled polymer–lipid nanodiscs (VEMALPs & SMALPs, 3–60 nm)."
  },
  {
    title: "Vinyl Ether–Maleic Acid (VEMA) Block & Alternating Copolymers",
    url: "research.html#thrust-nanodiscs",
    snippet: "Chain-extended amphiphilic block copolymers (VEMA-b-nBA, VEMA-b-tBA/AA) tuning lipid nanoparticle diameters from 60 nm down to 3 nm (Biomacromolecules 2024; Polymer Chemistry 2026)."
  },
  {
    title: "Bioconjugation & Charge-Tunable VEMA Derivatives (VEMADs)",
    url: "research.html#thrust-bioconjugation",
    snippet: "Nucleophilic ring-opening bioconjugation with PEG chains, amino acids, and cationic/anionic/zwitterionic modifiers stable across pH 3.0–9.0 and up to 30 mM Mg2+."
  },
  {
    title: "Ultra-Mild (<60 s) Cyclohexyl-VEMA (CH-VEMA) Nanoparticle Formulation",
    url: "research.html#thrust-rapid",
    snippet: "Spontaneous aqueous self-assembly with lipid bilayers in under 60 seconds without mechanical shear, organic co-solvents, or freeze–thaw cycles."
  },
  {
    title: "Muhammad Zeeshan Shah, Ph.D. Candidate — Biography & Education",
    url: "about.html",
    snippet: "Ph.D. in Chemistry at Miami University (Defending Oct 19, 2026), advised by Prof. Dominik Konkolewicz & Prof. Rick Page in collaboration with Prof. Gary Lorigan."
  },
  {
    title: "Team, Collaborators & Mentorship (13 Junior Researchers)",
    url: "about.html#mentorship",
    snippet: "Lead Research Mentor for 11 undergraduate and 2 graduate students; President of ACS POLY/PMSE Cincinnati Chapter (2024–2025)."
  },
  {
    title: "Publications (9 Peer-Reviewed Articles + 6 Manuscripts Submitted/In Prep)",
    url: "publications.html",
    snippet: "First-author and co-authored papers in Biomacromolecules (2024), Polymer Chemistry (2026, 2022), ACS Macro Letters (2026), Polymer (2026), BBA-Biomembranes (2025)."
  },
  {
    title: "Procedure 1: SMA 2:1 & SMA 3:1 Synthesis and Making Lipid Discs (SMALPs)",
    url: "sma-synthesis-procedure.html",
    snippet: "Interactive 4-step laboratory protocol and stoichiometric calculator for SMA 2:1 & 3:1 RAFT polymerization, BPO end-group removal, NaOH hydrolysis, and lipid nanodisc formulation."
  },
  {
    title: "Technical Skills, Analytical Instrumentation & CV Downloads",
    url: "skills.html",
    snippet: "RAFT polymerization, Liposomes (POPC, POPG, DMPC), HPLC, SEC/GPC, DLS, TEM/SEM, 1D 1H & DOSY NMR, CW-EPR, Rheometry, Instron, ICP-OES."
  },
  {
    title: "Contact & Collaboration Opportunities",
    url: "contact.html",
    snippet: "Department of Chemistry & Biochemistry, Miami University, Oxford, OH | mzeeshanshahkazmi@gmail.com | shahm@miamioh.edu | +1 (513) 620-0653."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.getElementById("modal-backdrop");
  const drawer = document.getElementById("slide-in-drawer");
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("site-search-input");
  const searchResultsContainer = document.getElementById("site-search-results");

  function closeAllModals() {
    if (drawer) drawer.classList.remove("open");
    if (searchModal) searchModal.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }

  document.querySelectorAll("[data-open-drawer]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (searchModal) searchModal.classList.remove("open");
      if (drawer) drawer.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
    });
  });

  document.querySelectorAll("[data-open-search]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (drawer) drawer.classList.remove("open");
      if (searchModal) searchModal.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
      if (searchInput) setTimeout(() => searchInput.focus(), 120);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeAllModals);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // Live site search inside modal
  if (searchInput && searchResultsContainer) {
    const renderSearchResults = (query) => {
      const q = query.trim().toLowerCase();
      if (!q) {
        searchResultsContainer.innerHTML = "";
        return;
      }
      const matches = SITE_SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q)
      );
      if (matches.length === 0) {
        searchResultsContainer.innerHTML = `<div class="search-result-item"><p>No matching pages or publications found for "${query}".</p></div>`;
        return;
      }
      searchResultsContainer.innerHTML = matches.map(item => `
        <div class="search-result-item">
          <a href="${item.url}">${item.title}</a>
          <p>${item.snippet}</p>
        </div>
      `).join("");
    };

    searchInput.addEventListener("input", (e) => renderSearchResults(e.target.value));
  }

  // Publications page tab switching ("All Papers" vs "Procedures") and live search filtering
  const pubFilterBtns = document.querySelectorAll(".pub-filter-btn");
  const pubFilterInput = document.getElementById("pub-live-filter");
  const pubEntries = document.querySelectorAll(".pub-entry");
  const tabPanelPapers = document.getElementById("tab-panel-papers");
  const tabPanelProcedures = document.getElementById("tab-panel-procedures");

  if (pubEntries.length > 0) {
    let activeCategory = "all";
    let filterQuery = "";

    const updatePublicationsView = () => {
      if (tabPanelPapers && tabPanelProcedures) {
        if (activeCategory === "procedures") {
          tabPanelPapers.style.display = "none";
          tabPanelProcedures.style.display = "block";
        } else {
          tabPanelPapers.style.display = "block";
          tabPanelProcedures.style.display = "none";
        }
      }

      pubEntries.forEach(entry => {
        const cats = (entry.getAttribute("data-category") || "").toLowerCase();
        const text = entry.textContent.toLowerCase();
        const isProcedureEntry = cats.includes("procedures");
        const matchesTab = activeCategory === "procedures" ? isProcedureEntry : !isProcedureEntry;
        const matchesText = !filterQuery || text.includes(filterQuery);
        entry.style.display = (matchesTab && matchesText) ? "" : "none";
      });
    };

    pubFilterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        pubFilterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.getAttribute("data-filter") || "all";
        if (history.replaceState) {
          const newHash = activeCategory === "procedures" ? "#procedures" : "";
          history.replaceState(null, "", window.location.pathname + newHash);
        }
        updatePublicationsView();
      });
    });

    if (window.location.hash === "#procedures") {
      const procBtn = document.querySelector('.pub-filter-btn[data-filter="procedures"]');
      if (procBtn) {
        pubFilterBtns.forEach(b => b.classList.remove("active"));
        procBtn.classList.add("active");
        activeCategory = "procedures";
      }
    }

    updatePublicationsView();

    if (pubFilterInput) {
      pubFilterInput.addEventListener("input", (e) => {
        filterQuery = e.target.value.trim().toLowerCase();
        updatePublicationsView();
      });
    }
  }

  // Visual No-Code Editor Mode (Text + Click-to-Change Photos)
  const adminFooterArea = document.querySelector(".admin-login");
  if (adminFooterArea) {
    const editToggleBtn = document.createElement("button");
    editToggleBtn.type = "button";
    editToggleBtn.id = "visual-edit-toggle";
    editToggleBtn.textContent = "✏️ Edit Page & Photos";
    editToggleBtn.style.cssText = "margin-left:12px; background:#a51c30; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-size:0.78rem; font-weight:700; cursor:pointer;";
    adminFooterArea.appendChild(editToggleBtn);

    // Hidden file input for replacing clicked images
    const imgFileInput = document.createElement("input");
    imgFileInput.type = "file";
    imgFileInput.accept = "image/*";
    imgFileInput.style.display = "none";
    document.body.appendChild(imgFileInput);

    let activeTargetImg = null;
    let isEditing = false;
    let saveBtn = null;

    imgFileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file || !activeTargetImg) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        activeTargetImg.src = ev.target.result;
      };
      reader.readAsDataURL(file);
      imgFileInput.value = "";
    });

    const handleImageClick = (e) => {
      if (!isEditing) return;
      e.preventDefault();
      e.stopPropagation();
      activeTargetImg = e.currentTarget;
      imgFileInput.click();
    };

    editToggleBtn.addEventListener("click", () => {
      isEditing = !isEditing;
      const editableNodes = document.querySelectorAll("h1, h2, h3, h4, p, li, figcaption, .metric-number, .metric-label, .navbar-brand-subtext, .thrust-tag, .pub-meta-badge");
      const allImages = document.querySelectorAll("img");

      editableNodes.forEach(el => {
        if (el.closest("#visual-editor-bar")) return;
        el.contentEditable = isEditing ? "true" : "false";
        el.style.outline = isEditing ? "1px dashed rgba(165, 28, 48, 0.45)" : "";
      });

      allImages.forEach(img => {
        if (isEditing) {
          img.style.outline = "3px dashed #216890";
          img.style.cursor = "pointer";
          img.title = "Click to replace this photo from your computer";
          img.addEventListener("click", handleImageClick);
        } else {
          img.style.outline = "";
          img.style.cursor = "";
          img.removeAttribute("title");
          img.removeEventListener("click", handleImageClick);
        }
      });

      if (isEditing) {
        editToggleBtn.textContent = "✅ Exit Edit Mode";
        if (!saveBtn) {
          saveBtn = document.createElement("button");
          saveBtn.type = "button";
          saveBtn.textContent = "💾 Download Saved Page";
          saveBtn.style.cssText = "margin-left:8px; background:#216890; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-size:0.78rem; font-weight:700; cursor:pointer;";
          saveBtn.addEventListener("click", () => {
            editableNodes.forEach(el => {
              el.removeAttribute("contenteditable");
              el.style.outline = "";
            });
            allImages.forEach(img => {
              img.style.outline = "";
              img.style.cursor = "";
              img.removeAttribute("title");
              img.removeEventListener("click", handleImageClick);
            });
            editToggleBtn.remove();
            saveBtn.remove();
            imgFileInput.remove();
            const pageFileName = window.location.pathname.split("/").pop() || "index.html";
            const htmlContent = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = pageFileName;
            a.click();
            location.reload();
          });
          adminFooterArea.appendChild(saveBtn);
        }
        alert("Visual Edit Mode ON:\n• Click any TEXT to type changes.\n• Click any PHOTO (outlined in blue) to choose a new image from your computer.\n• When done, click '💾 Download Saved Page' at the bottom right.");
      } else {
        editToggleBtn.textContent = "✏️ Edit Page & Photos";
        if (saveBtn) {
          saveBtn.remove();
          saveBtn = null;
        }
      }
    });
  }
});
