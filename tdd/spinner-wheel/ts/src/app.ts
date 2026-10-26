export function mountSpinner(root: HTMLElement, random: () => number): void {
  root.innerHTML = `
    <h1>Spinner Wheel</h1>
    <form>
      <label for="name">Name</label>
      <input id="name" autocomplete="off" />
      <button type="submit">Hinzufügen</button>
    </form>
    <ul aria-label="Teilnehmer"></ul>
    <button type="button" data-action="spin" disabled>Drehen</button>
    <p role="status">Füge zuerst einen Namen hinzu.</p>
  `;
}
