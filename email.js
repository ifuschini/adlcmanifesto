document.querySelectorAll(".obfuscated-email").forEach((link) => {
  const { user, domain, tld } = link.dataset;
  const address = [user, "@", domain, ".", tld].join("");
  link.href = `mailto:${address}`;
  link.textContent = address;
});
