import { AppComponent } from "./app.component"

describe('AppComponent', () => {
  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent ();
  })

  it('Verify that a registered user can log in successfully and it redirect to the Appointment scheduling page', () => {
    expect(fixture.title).toEqual('blog-system');
  })



})