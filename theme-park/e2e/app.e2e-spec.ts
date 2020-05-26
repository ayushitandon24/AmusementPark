import { ThemeParkAngularPage } from './app.po';

describe('eshop-angular App', () => {
  let page: ThemeParkAngularPage;

  beforeEach(() => {
    page = new ThemeParkAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
