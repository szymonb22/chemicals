import { Component, inject, OnInit } from '@angular/core';
import { List } from "./components/list/list";
import { PeriodicElementsStore } from './store/store';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [List,MatSpinner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  periodicStore = inject(PeriodicElementsStore);
  protected title = 'chemicals';
  ngOnInit(): void {
    this.periodicStore.loadAll().then(()=>console.log("loaded"))
  }
}
