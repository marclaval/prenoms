import { PrenomsPage } from './app.po';

describe('prenoms App', () => {
  let page: PrenomsPage;

  beforeEach(() => {
    page = new PrenomsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
