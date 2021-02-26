import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'storage-mendes-ui';

  items!: MenuItem[];

  ngOnInit() {
    this.items = [
        {
            label: 'Cliente',
            items: [{
                    label: 'Novo Cliente', 
                    icon: 'pi pi-fw pi-plus',
                    },
                    {
                    label: 'Listar Clientes', 
                    icon: 'pi pi-fw pi-folder-open',
                    }
          ]
        },
        {
          label: 'Lançamento',
          items: [{
                  label: 'Novo Lançamento', 
                  icon: 'pi pi-fw pi-plus',
                  },
                  {
                  label: 'Listar Lançamentos', 
                  icon: 'pi pi-fw pi-folder-open',
                  }
        ]
        }
    ];
  }
}
