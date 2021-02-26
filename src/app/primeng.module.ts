import {NgModule} from '@angular/core';

import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    MenubarModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    MenubarModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [],
})

export class PrimengModule {

}