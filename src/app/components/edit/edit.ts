import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Element } from '../../services/element.service';
import { PeriodicElement } from '../../models/periodicElement';
import { PeriodicElementsStore } from '../../store/store';

@Component({
  selector: 'app-edit',
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<Edit>, private service: Element) { }
  store = inject(PeriodicElementsStore);
  periodicForm = new FormGroup({
    id: new FormControl(0),
    position: new FormControl(0),
    name: new FormControl(''),
    weight: new FormControl(0),
    symbol: new FormControl(''),
  })
  ngOnInit(): void {
    this.service.getById(this.data.id).subscribe(
      item => {
        let _data = item;
        if (_data != null) {
          this.periodicForm.setValue({
            id: _data.id,
            name: _data.name,
            position: _data.position,
            weight: _data.weight,
            symbol: _data.symbol
          })
        }
      }
    )

  }
  save() {
    let _data: PeriodicElement = {
      id: this.data.id as number,
      name: this.periodicForm.value.name as string,
      weight: this.periodicForm.value.weight as number,
      symbol: this.periodicForm.value.symbol as string,
      position: this.periodicForm.value.position as number
    }
     this.store.update(_data).then(()=>this.closepopup());
  }
  
  closepopup() {
    this.ref.close();
  }
}
