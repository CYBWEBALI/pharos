import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { setViewport } from '@web/test-runner-commands';

import type { PharosSidenavButton } from './pharos-sidenav-button';

describe('pharos-sidenav', () => {
  let component: PharosSidenavButton;

  beforeEach(async () => {
    await setViewport({ width: 1055, height: 768 });
    component = await fixture(html`<test-pharos-sidenav-button></test-pharos-sidenav-button>`);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is not visible when viewport is larger than 1055px', async () => {
    await setViewport({ width: 1056, height: 768 });
    const display = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(display).to.equal('none');
  });

  it('is visible when viewport is below than 1056px', async () => {
    const button = document.querySelector('test-pharos-sidenav-button');
    expect(button).to.not.be.null;
  });

  it('slides in the sidenav when clicked', async () => {
    const sidenav = document.createElement('test-pharos-sidenav');
    document.body.appendChild(sidenav);

    component.click();
    expect(sidenav.slide).to.be.true;
  });

  it('focuses the sidenav after being clicked', async () => {
    const sidenav = document.createElement('test-pharos-sidenav');
    document.body.appendChild(sidenav);

    component.click();
    await sidenav.updateComplete;

    const renderedSidenav = document.body.querySelector('test-pharos-sidenav');
    expect(document.activeElement === renderedSidenav).to.be.true;
  });
});
