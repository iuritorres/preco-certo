export class amazonInjector {
  #blockedPathnames = [];

  bindAffiliateID() {
    if (this.#blockedPathnames.includes(window.location.pathname)) return;
  }
}
