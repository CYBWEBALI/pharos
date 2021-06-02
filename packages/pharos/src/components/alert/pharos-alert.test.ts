import { html, fixture, expect } from '@open-wc/testing';
import './pharos-alert';
import type { PharosAlert } from './pharos-alert';

describe('pharos-alert', () => {
  let component: PharosAlert;

  beforeEach(async () => {
    component = await fixture(html` <pharos-alert status="success"> It worked! </pharos-alert> `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(html` <pharos-alert> It worked! </pharos-alert> `);
    expect(component).dom.to.equal(`<pharos-alert status="">It worked!</pharos-alert>`);
  });

  it('renders the base alert when a status is not provided', async () => {
    component = await fixture(html` <pharos-alert> It worked! </pharos-alert> `);
    expect(component).shadowDom.to.equal(`
      <div
        class="alert"
        role="alert"
        tabindex="0"
      >
        <pharos-icon
          class="alert__icon"
          description=""
          height="24"
          name="base"
          width="24"
        >
        </pharos-icon>
        <div class="alert__body">
          <slot>
          </slot>
        </div>
      </div>
    `);
  });

  it('throws an error for an invalid status value', async () => {
    component = await fixture(html`
      <pharos-alert status="fake"> It worked! </pharos-alert>
    `).catch((e) => e);
    expect('fake is not a valid status. Valid statuses are: info, success, warning, error').to.be
      .thrown;
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);
    const alert = component.renderRoot.querySelector('.alert');

    component.focus();

    expect(activeElement === alert).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });
});