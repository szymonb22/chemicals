import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { PeriodicElement } from "../models/periodicElement";
import { inject } from "@angular/core";
import { Element } from "../services/element.service";

type PeriodicElementState = {
    periodicElements: PeriodicElement[];
    loading: boolean;
}

const initialState: PeriodicElementState = {
    periodicElements: [],
    loading: false,
}

export const PeriodicElementsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, periodicElementsService = inject(Element)) => ({
        async loadAll() {
            patchState(store, { loading: true });
            await periodicElementsService.getAll().subscribe((elements) => {
                patchState(store, { periodicElements: elements, loading: false })
            }
            )
        },
        async update(data: PeriodicElement) {
            patchState(store, { loading: true });
            await periodicElementsService.update(data).subscribe((item) => {
                patchState(store, (state) => ({
                    periodicElements: state.periodicElements.map(t => t.id == data.id ? {...t,item } : t)
                    
                }))
            })
        
        }


    })
    ))
