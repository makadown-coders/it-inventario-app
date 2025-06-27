// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-portal.directive.ts
import { Directive, ViewContainerRef, TemplateRef, Input, OnDestroy } from '@angular/core';
import { Portal, ComponentPortal, TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
// import { DropdownMenuContentComponent } from './dropdown-menu-content/dropdown-menu-content.component'; // Import the content component

@Directive({
  selector: '[appDropdownMenuPortal]',
  standalone: true,
})
export class DropdownMenuPortalDirective implements OnDestroy{
  private portal: TemplatePortal<any> | null = null;
  private portalOutlet: CdkPortalOutlet | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any> // Reference to the template it's applied to
  ) {}

  // You might need an input to explicitly show/hide the portal content
  @Input() set appDropdownMenuPortal(show: boolean) {
    if (show) {
      this.attachPortal();
    } else {
      this.detachPortal();
    }
  }


  private attachPortal(): void {
    if (!this.portal) {
      // Create a TemplatePortal
      this.portal = new TemplatePortal(this.templateRef, this.viewContainerRef);
    }
    // Necesitamos un PortalOutlet para adjuntar el portal
    // Si no hay uno, podemos usar el ViewContainerRef directamente
    if (!this.portal.isAttached) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  private detachPortal(): void {
    if (this.portal && this.portal.isAttached) {
      // this.portal.detach();
      this.viewContainerRef.clear();
    }
  }

  ngOnDestroy(): void {
    this.detachPortal();
  }
}
