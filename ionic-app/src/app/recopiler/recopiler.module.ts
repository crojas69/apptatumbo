import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecopilerComponent } from './recopiler';  // Importamos el componente

@NgModule({
  declarations: [RecopilerComponent],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [RecopilerComponent]  // Exportamos el componente para su uso si es necesario
})
export class RecopilerModule {}
