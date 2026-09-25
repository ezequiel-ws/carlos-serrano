(() => {
  const selected = "min-h-11 border border-ink bg-ink px-4 text-xs tracking-label text-paper uppercase";
  const idle = "min-h-11 border border-line bg-paper px-4 text-xs tracking-label text-soft uppercase hover:border-ink hover:text-ink";
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  const count = document.querySelector("[data-count]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      buttons.forEach((item) => {
        const on = item === button;
        item.className = on ? selected : idle;
        item.setAttribute("aria-pressed", on ? "true" : "false");
      });
      let visible = 0;
      cards.forEach((card) => {
        const show = filter === "Todos" || card.getAttribute("data-category") === filter;
        card.classList.toggle("hidden", !show);
        if (show) visible += 1;
      });
      if (count) count.textContent = visible + (visible === 1 ? " trabajo" : " trabajos");
    });
  });

  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const closeMenu = () => {
    menu?.classList.add("hidden");
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) toggle.textContent = "Menú";
  };
  toggle?.addEventListener("click", () => {
    const willOpen = menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    toggle.textContent = willOpen ? "Cerrar" : "Menú";
  });
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const form = document.querySelector("[data-contact]");
  const setError = (id, message) => {
    const input = document.getElementById(id);
    if (!input) return;
    let err = document.getElementById(id + "-error");
    if (!message) {
      err?.remove();
      input.removeAttribute("aria-invalid");
      return;
    }
    if (!err) {
      err = document.createElement("p");
      err.id = id + "-error";
      err.className = "mt-2 text-sm text-accent";
      input.insertAdjacentElement("afterend", err);
    }
    err.textContent = message;
    input.setAttribute("aria-invalid", "true");
  };
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const negocio = document.getElementById("negocio").value.trim();
    const vende = document.getElementById("vende").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    setError("nombre", nombre ? "" : "Decime cómo te llamás.");
    setError("negocio", negocio ? "" : "¿Cómo se llama el negocio?");
    setError("vende", vende ? "" : "Contame qué vendés.");
    let status = document.getElementById("form-status");
    if (!nombre || !negocio || !vende) {
      status?.remove();
      return;
    }
    const text = [
      "Hola Carlos, soy " + nombre + " de " + negocio + ".",
      "Vendo: " + vende + ".",
      mensaje || "Quiero clientes, no likes.",
    ].join(" ");
    const href = "https://wa.me/5491168713479?text=" + encodeURIComponent(text);
    if (!status) {
      status = document.createElement("p");
      status.id = "form-status";
      status.className = "mt-4 text-soft";
      status.setAttribute("role", "status");
      form.append(status);
    }
    status.innerHTML = 'Listo. Si WhatsApp no se abrió, <a class="border-b border-accent text-ink" href="' + href + '">tocá acá</a>.';
    window.open(href, "_blank", "noopener,noreferrer");
  });
})();
