import { NgModule } from '@angular/core';
import { PairFilterPipe } from './pair/pair';
import { DateRangePipe } from './date/date';

@NgModule({
	declarations: [PairFilterPipe, DateRangePipe],
	imports: [],
	exports: [PairFilterPipe, DateRangePipe]
})
export class PipesModule {}
