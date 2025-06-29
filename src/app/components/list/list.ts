import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PeriodicElement } from '../../models/periodicElement';
import { Edit } from '../edit/edit';
import { MatDialog } from '@angular/material/dialog';
import { PeriodicElementsStore } from '../../store/store';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,MatButton],
  templateUrl: './list.html',
  styleUrl: './list.css'
})

export class List implements OnInit {
  store = inject(PeriodicElementsStore);
  periodicData: PeriodicElement[] = []
  dataSource = new MatTableDataSource<PeriodicElement>;
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.store.periodicElements());

  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    setTimeout(() => { this.dataSource.filter = filterValue.trim().toLowerCase() }, 2000);
  }

  openEdit(id: number) {
    this.dialog.open(Edit, {
      width: "25%", exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms', data: {
        'id': id
      }
    }).afterClosed().subscribe(o => this.store.loadAll())
  }
}
