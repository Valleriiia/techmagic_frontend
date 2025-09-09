import { AdminOnlyDirective } from './admin-only.directive';

describe('AdminOnlyDirective', () => {
  it('should create an instance', () => {
    const templateRefSpy = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    const viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);
    const directive = new AdminOnlyDirective(templateRefSpy, viewContainerRefSpy, authServiceSpy);
    expect(directive).toBeTruthy();
  });
});
