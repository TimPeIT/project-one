export function getSterneIcons(bewertung) {
  const zahl = parseFloat(bewertung.replace(",", "."));
  const ganze = Math.floor(zahl);
  const halber = zahl % 1 >= 0.5;
  const sterne = [];

  for (let i = 0; i < ganze; i++) {
    sterne.push("⭐");
  }
  if (halber) {
    sterne.push("✩");
  }

  return sterne.map((star, i) => <span key={i}>{star}</span>);
}
