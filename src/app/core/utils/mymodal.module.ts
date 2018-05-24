//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {ModalModule} from "ngx-bootstrap";

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
      <div class="row container-fluid">
    <button (click)="myModal.open()"> open my modal</button>
    <modal #myModal>
        <modal-header>
            <h1>Modal header</h1>
        </modal-header>
        <modal-content>
            Hello Modal!
        </modal-content>
        <modal-footer>
            <button class="btn btn-primary" (click)="myModal.close()">close</button>
        </modal-footer>
    </modal>
</div>
    </div>
  `,
})
export class App {
  name:string;
  constructor() {
    this.name = 'Angular2'
  }
}

@NgModule({
  imports: [ BrowserModule,ModalModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class MyModalModule {}