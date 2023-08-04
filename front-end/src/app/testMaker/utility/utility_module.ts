import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directive';
import { LoaderComponent } from './loader/loader_componer';

@NgModule({
  declarations: [HighlightDirective, LoaderComponent],
  imports: [CommonModule],
  exports: [HighlightDirective, LoaderComponent],
})
export class UtilityModule {}