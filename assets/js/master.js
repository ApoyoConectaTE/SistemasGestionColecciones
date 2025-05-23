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
 * Each product's cell in the row will list the specified attributes and their values.
 * If a single attribute is provided, it spans the full width of the cell's content area.
 * If multiple attributes are provided, they are laid out in columns (e.g., col-4).
 * @param {string[]} attributeNames - An array of attribute names to display in this row.
 * @param {object} product1Data - The data object for the first platform.
 * @param {object} product2Data - The data object for the second platform.
 * @returns {string} The HTML string for the row.
 */
function renderAttributeRow(attributeNames, product1Data, product2Data) {
  const generateCellHtml = (productData) => {
    if (attributeNames.length === 1) {
      // Single attribute: render it to take full width (col-12)
      const attrName = attributeNames[0];
      const value = productData.hasOwnProperty(attrName) ? productData[attrName] : "-";
      return `
        <div class="col-12 p-y-1 p-x-1">
          <p class="m-b-0 destacado"><strong>${attrName}:</strong></p>
          <p class="m-b-0">${formatValue(value)}</p>
        </div>
      `;
    } else {
      // Multiple attributes: use existing col-4 layout
      return attributeNames
        .map((attrName) => {
          const value = productData.hasOwnProperty(attrName) ? productData[attrName] : "-";
          return `
            <div class="col-4 item border-r p-y-1 p-x-1">
              <p class="m-b-0 destacado"><strong>${attrName}:</strong></p>
              <p class="m-b-0">${formatValue(value)}</p>
            </div>
          `;
        })
        .join("");
    }
  };

  const product1HtmlContent = generateCellHtml(product1Data);
  const product2HtmlContent = generateCellHtml(product2Data);

  return `
      <div class="row p-r-1">
        <div class="col-6 border">
          <div class="row">
          ${product1HtmlContent}
          </div>
        </div>
        <div class="col-6 border">
          <div class="row">
            ${product2HtmlContent}
          </div>
        </div>
      </div>
  `;
}

/**
 * Renders the entire comparison table based on selected products.
 * "Acciones" is displayed first on its own line.
 * Remaining attributes are grouped: first 3, last 3, and middle ones individually.
 */
function renderComparisonTable() {
  if (selectedProduct1 && selectedProduct2) {
    noSelectionMessage.classList.add("hidden"); // Hide no selection message
    comparisonTableContainer.classList.remove("hidden"); // Show table container

    let tableHtml = `
          <div class="row p-r-1">
              <div class="col-6 align-content-center border">
                  <a href="${selectedProduct1.Enlace}" target="_blank" rel="noopener noreferrer">
                  <img class="logos" src="${selectedProduct1.logo}" alt="${selectedProduct1.Nombre}">
                  </a>
              </div>
              <div class="col-6 align-content-center border">
                  <a href="${selectedProduct2.Enlace}" target="_blank" rel="noopener noreferrer">
                      <img class="logos" src="${selectedProduct2.logo}" alt="${selectedProduct2.Nombre}">
                  </a>
              </div>
          </div>
      `;

    // Get all attribute keys, excluding those handled in the header
    const allProductKeys = Object.keys(selectedProduct1).filter((key) => key !== "Nombre" && key !== "Enlace" && key !== "logo");

    const accionesKey = "Acciones";
    let remainingAttributeKeys = [...allProductKeys];

    // Render "Acciones" first if it exists
    if (allProductKeys.includes(accionesKey)) {
      tableHtml += renderAttributeRow([accionesKey], selectedProduct1, selectedProduct2);
      remainingAttributeKeys = allProductKeys.filter((key) => key !== accionesKey);
    }

    // Define the desired order for the REMAINING attributes
    const desiredOrderForRemaining = ["Estándares", "Alfabetismos", "Mantenimiento", "Escalabilidad", "Costos", "Tipo de licencia"];

    // Sort the REMAINING attributes
    remainingAttributeKeys.sort((a, b) => {
      const indexA = desiredOrderForRemaining.indexOf(a);
      const indexB = desiredOrderForRemaining.indexOf(b);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b); // Fallback for keys not in desiredOrderForRemaining
    });

    const n = remainingAttributeKeys.length;

    if (n === 0) {
      // No more attributes to display after "Acciones"
    } else if (n <= 3) {
      tableHtml += renderAttributeRow(remainingAttributeKeys, selectedProduct1, selectedProduct2);
    } else if (n > 3 && n <= 6) {
      tableHtml += renderAttributeRow(remainingAttributeKeys.slice(0, 3), selectedProduct1, selectedProduct2);
      tableHtml += renderAttributeRow(remainingAttributeKeys.slice(3), selectedProduct1, selectedProduct2);
    } else {
      // n > 6 attributes
      tableHtml += renderAttributeRow(remainingAttributeKeys.slice(0, 3), selectedProduct1, selectedProduct2);

      // Middle attributes: render each one individually in its own row
      const middleKeys = remainingAttributeKeys.slice(3, n - 3);
      middleKeys.forEach((key) => {
        tableHtml += renderAttributeRow([key], selectedProduct1, selectedProduct2);
      });

      // Group last 3 attributes
      tableHtml += renderAttributeRow(remainingAttributeKeys.slice(n - 3), selectedProduct1, selectedProduct2);
    }

    comparisonTableContainer.innerHTML = tableHtml; // Inject generated HTML
  } else {
    noSelectionMessage.classList.remove("hidden"); // Show no selection message
    comparisonTableContainer.classList.add("hidden"); // Hide table container
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

  if (!product) {
    console.error(`Producto no encontrado con el nombre: ${selectedName}`);
    return;
  }

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
    logo: "assets/img/Logo_omeka.webp",
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
    logo: "assets/img/Logo_wax.webp",
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
    logo: "assets/img/Logo_collection.webp",
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
    logo: "assets/img/Logo_atom.webp",
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
    logo: "assets/img/Logo_oclc.webp",
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
    logo: "assets/img/Logo_tropy.webp",
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
    logo: "assets/img/Logo_transkribus.webp",
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
    logo: "assets/img/Logo_mukurtu.webp",
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
    logo: "assets/img/Logo_scalar.webp",
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
    logo: "assets/img/Logo_islandora.webp",
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
    logo: "assets/img/Logo_collective.webp",
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
    logo: "assets/img/Logo_space.webp",
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
    logo: "assets/img/Logo_fedora.webp",
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
    logo: "assets/img/Logo_greenstone.webp",
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
    logo: "assets/img/Logo_resource.webp",
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
    logo: "assets/img/Logo_past.webp",
  },
];
