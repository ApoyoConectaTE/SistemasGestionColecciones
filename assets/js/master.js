// Get references to HTML elements
const selectProduct1 = document.getElementById("select-product-1");
const selectProduct2 = document.getElementById("select-product-2");
const comparisonTableContainer = document.getElementById("comparison-table-container");
const noSelectionMessage = document.getElementById("no-selection-message");

let selectedProduct1 = null;
let selectedProduct2 = null;

/**
 * Populates the dropdowns with platform names.
 */
function populateDropdowns() {
  // Clear existing options
  selectProduct1.innerHTML = "";
  selectProduct2.innerHTML = "";

  platformData.forEach((product) => {
    const option1 = document.createElement("option");
    option1.value = product.Nombre;
    option1.textContent = product.Nombre;
    selectProduct1.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = product.Nombre;
    option2.textContent = product.Nombre;
    selectProduct2.appendChild(option2);
  });

  // Set initial selections
  if (platformData.length >= 2) {
    selectProduct1.value = platformData[0].Nombre;
    selectProduct2.value = platformData[1].Nombre;
    selectedProduct1 = platformData[0];
    selectedProduct2 = platformData[1];
  } else if (platformData.length === 1) {
    selectProduct1.value = platformData[0].Nombre;
    selectedProduct1 = platformData[0];
  }

  renderComparisonTable(); // Render table with initial selections
}

/**
 * Formats the value for display in the table. Handles array values.
 * @param {*} value - The value to format.
 * @returns {string} The formatted value.
 */
function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return value;
}

/**
 * Renders a single attribute row for the comparison table.
 * The attribute name is now displayed as a title within each value cell.
 * @param {string} attributeName - The name of the attribute.
 * @param {*} value1 - The value for the first platform.
 * @param {*} value2 - The value for the second platform.
 * @returns {string} The HTML string for the row.
 */
function renderAttributeRow(attributeName, value1, value2) {
  return `
      <div class="row">
          <div class="col-5 offset-1 border p-y-1 p-x-3">
              <p class="m-b-0 destacado"><strong>${attributeName}:</strong></p>
              <p>${formatValue(value1)}</p>
          </div>
          <div class="col-5 border p-y-1 p-x-3">
              <p class="m-b-0 destacado"><strong>${attributeName}:</strong></p>
              <p>${formatValue(value2)}</p>
          </div>
      </div>
  `;
}

/**
 * Renders the entire comparison table based on selected products.
 */

function renderComparisonTable() {
  if (selectedProduct1 && selectedProduct2) {
    noSelectionMessage.classList.add("hidden"); // Hide no selection message
    comparisonTableContainer.classList.remove("hidden"); // Show table container

    let tableHtml = `
          <div class="row">
              <div class="col-5 align-content-center offset-1 border">
                  <a href="${selectedProduct1.Enlace}" target="_blank" rel="noopener noreferrer">
                  <img class="logos" src="${selectedProduct1.logo}" alt="${selectedProduct1.Nombre}">
                  </a>
              </div>
              <div class="col-5 align-content-center border">
                  <a href="${selectedProduct2.Enlace}" target="_blank" rel="noopener noreferrer">
                      <img class="logos" src="${selectedProduct2.logo}" alt="${selectedProduct2.Nombre}">
                  </a>
              </div>
          </div>
      `;

    // Iterate over keys to render attribute rows
    Object.keys(selectedProduct1).forEach((key) => {
      // Exclude 'Nombre', 'Enlace', and 'logo' as they are handled in the header/logo section
      if (key !== "Nombre" && key !== "Enlace" && key !== "logo") {
        tableHtml += renderAttributeRow(key, selectedProduct1[key], selectedProduct2[key]);
      }
    });

    comparisonTableContainer.innerHTML = tableHtml; // Inject generated HTML
  } else {
    noSelectionMessage.classList.remove("hide"); // Show no selection message
    comparisonTableContainer.classList.add("hide"); // Hide table container
  }
}

/**
 * Event handler for dropdown changes.
 * @param {Event} event - The change event.
 * @param {number} productNum - Identifier for which product (1 or 2) is being changed.
 */
function handleProductChange(event, productNum) {
  const selectedName = event.target.value;
  const product = platformData.find((p) => p.Nombre === selectedName);

  if (productNum === 1) {
    selectedProduct1 = product;
  } else {
    selectedProduct2 = product;
  }
  renderComparisonTable(); // Re-render table with new selections
}

// Add event listeners to dropdowns
selectProduct1.addEventListener("change", (e) => handleProductChange(e, 1));
selectProduct2.addEventListener("change", (e) => handleProductChange(e, 2));

// Initial population and rendering when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", populateDropdowns);

// Data for the platforms in JSON format
const platformData = [
  {
    Nombre: "Omeka",
    Enlace: "https://omeka.org/",
    Estándares: "Dublin Core",
    Alfabetismos: "Medio",
    Mantenimiento: "Medio",
    Acciones: [
      "Organización  y gestión de archivos",
      "diseño y creación de metadatos",
      "conformidad y validación con respecto a estándares",
      "Interfaces  de presentación, navegación, visualización",
    ],
    Escalabilidad: "Alta",
    Costos: "Modelo híbrido",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_omeka.webp",
  },
  {
    Nombre: "Wax",
    Enlace: "https://minicomp.github.io/wax/",
    Estándares: "Agnóstico",
    Alfabetismos: "Alto",
    Mantenimiento: "Bajo",
    Acciones: ["Interfaces  de presentación, navegación, visualización", "Organización  y gestión de archivos"],
    Escalabilidad: "Baja",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_wax.webp",
  },
  {
    Nombre: "Collection builder",
    Enlace: "https://collectionbuilder.github.io/",
    Estándares: "Agnóstico",
    Alfabetismos: "Medio",
    Mantenimiento: "Bajo",
    Acciones: ["Interfaces  de presentación, navegación, visualización", "Organización  y gestión de archivos"],
    Escalabilidad: "Baja",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_collection.webp",
  },
  {
    Nombre: "AtoM",
    Enlace: "https://www.accesstomemory.org/es/",
    Estándares: "ISAD(G), ISAAR CPF, ISDF",
    Alfabetismos: "Alto",
    Mantenimiento: "Alto",
    Acciones: ["Organización  y gestión de archivos", "conformidad y validación con respecto a estándares"],
    Escalabilidad: "Alta",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_atom.webp",
  },
  {
    Nombre: "CONTENTdm",
    Enlace: "https://www.oclc.org/es/contentdm.html",
    Estándares: "Dublin Core, IIIF",
    Alfabetismos: "Bajo",
    Mantenimiento: "Bajo",
    Acciones: [
      "Organización  y gestión de archivos",
      "diseño y creación de metadatos",
      "conformidad y validación con respecto a estándares",
      "Interfaces  de presentación, navegación, visualización",
      "alojamiento y transmisión en línea",
    ],
    Escalabilidad: "Alta",
    Costos: "De pago",
    "Tipo de licencia": "Propietaria",
    logo: "/assets/img/Logo_oclc.webp",
  },
  {
    Nombre: "Tropy",
    Enlace: "https://tropy.org/",
    Estándares: "IIIF",
    Alfabetismos: "Medio",
    Mantenimiento: "Medio",
    Acciones: [
      "Organización  y gestión de archivos",
      "diseño y creación de metadatos",
      "conformidad y validación con respecto a estándares",
      "Interfaces  de presentación, navegación, visualización",
    ],
    Escalabilidad: "Alta",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_tropy.webp",
  },
  {
    Nombre: "Transkribus",
    Enlace: "https://www.transkribus.org/",
    Estándares: "Agnóstico",
    Alfabetismos: "Medio",
    Mantenimiento: "Alto",
    Acciones: ["Digitalización", "Procesamiento de texto"],
    Escalabilidad: "Media",
    Costos: "Modelo híbrido",
    "Tipo de licencia": "Propietaria",
    logo: "/assets/img/Logo_transkribus.webp",
  },
  {
    Nombre: "Mukurtu",
    Enlace: "https://mukurtu.org/",
    Estándares: "Agnóstico",
    Alfabetismos: "Medio",
    Mantenimiento: "Alto",
    Acciones: [
      "Organización  y gestión de archivos",
      "conformidad y validación con respecto a estándares",
      "Interfaces  de presentación, navegación, visualización",
    ],
    Escalabilidad: "Alta",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_mukurtu.webp",
  },
  {
    Nombre: "Scalar",
    Enlace: "https://scalar.me/anvc/scalar/",
    Estándares: "RDF",
    Alfabetismos: "Alto",
    Mantenimiento: "Alto",
    Acciones: ["Organización  y gestión de archivos", "Interfaces  de presentación, navegación, visualización"],
    Escalabilidad: "Media",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_scalar.webp",
  },
  {
    Nombre: "Islandora",
    Enlace: "https://www.islandora.ca/",
    Estándares: "MODS,Dublin Core, IIIF",
    Alfabetismos: "Alto",
    Mantenimiento: "Alto",
    Acciones: [
      "Organización  y gestión de archivos",
      "diseño y creación de metadatos",
      "conformidad y validación con respecto a estándares",
      "Digitalización",
      "Interfaces  de presentación, navegación, visualización",
    ],
    Escalabilidad: "Alta",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_islandora.webp",
  },
  {
    Nombre: "CollectiveAccess",
    Enlace: "https://collectiveaccess.org/",
    Estándares: "Dublin Core, MODS, EAD, METS",
    Alfabetismos: "Alto",
    Mantenimiento: "Alto",
    Acciones: [
      "Organización  y gestión de archivos",
      "diseño y creación de metadatos",
      "conformidad y validación con respecto a estándares",
      "Interfaces  de presentación, navegación, visualización",
    ],
    Escalabilidad: "Alta",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_collective.webp",
  },
  {
    Nombre: "DSpace",
    Enlace: "https://dspace.org/",
    Estándares: "Dublin Core, Qualified DC, OAI‑PMH, IIIF, SWORD",
    Alfabetismos: "Medio",
    Mantenimiento: "Medio",
    Acciones: [
      "Organización  y gestión de archivos",
      "diseño y creación de metadatos",
      "conformidad y validación con respecto a estándares",
      "Interfaces  de presentación, navegación, visualización",
    ],
    Escalabilidad: "Alta",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_space.webp",
  },
  {
    Nombre: "Fedora Commons",
    Enlace: "https://fedorarepository.org/",
    Estándares: "RDF, Dublin Core, PREMIS",
    Alfabetismos: "Alto",
    Mantenimiento: "Alto",
    Acciones: ["Organización  y gestión de archivos", "diseño y creación de metadatos", "conformidad y validación con respecto a estándares"],
    Escalabilidad: "Alta",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_fedora.webp",
  },
  {
    Nombre: "Greenstone",
    Enlace: "https://www.greenstone.org/index_es",
    Estándares: "Dublin Core",
    Alfabetismos: "Medio",
    Mantenimiento: "Medio",
    Acciones: [
      "Organización  y gestión de archivos",
      "diseño y creación de metadatos",
      "Interfaces  de presentación, navegación, visualización",
      "alojamiento y transmisión en línea",
      "conformidad y validación con respecto a estándares",
    ],
    Escalabilidad: "Media",
    Costos: "Gratuito",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_greenstone.webp",
  },
  {
    Nombre: "ResourceSpace",
    Enlace: "https://www.resourcespace.com/",
    Estándares: "Dublin Core, IPTC, XMP",
    Alfabetismos: "Bajo",
    Mantenimiento: "Medio",
    Acciones: [
      "Organización  y gestión de archivos",
      "diseño y creación de metadatos",
      "conformidad y validación con respecto a estándares",
      "Interfaces  de presentación, navegación, visualización",
      "alojamiento y transmisión en línea",
    ],
    Escalabilidad: "Alta",
    Costos: "Modelo híbrido",
    "Tipo de licencia": "Código abierto",
    logo: "/assets/img/Logo_resource.webp",
  },
  {
    Nombre: "PastPerfect Museum Software",
    Enlace: "https://www.museumsoftware.com/",
    Estándares: "Propio (exporta a Dublin Core, EAD)",
    Alfabetismos: "Bajo",
    Mantenimiento: "Medio",
    Acciones: ["Organización  y gestión de archivos", "diseño y creación de metadatos", "Interfaces  de presentación, navegación, visualización"],
    Escalabilidad: "Media",
    Costos: "De pago",
    "Tipo de licencia": "Propietaria",
    logo: "/assets/img/Logo_past.webp",
  },
];
