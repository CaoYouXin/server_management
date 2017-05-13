import { ServerManagementPage } from './app.po';

describe('server-management App', function() {
  let page: ServerManagementPage;

  beforeEach(() => {
    page = new ServerManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
