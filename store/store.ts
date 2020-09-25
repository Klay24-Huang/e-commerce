import { Module, State } from 'vuex-simple';
import { BarModule } from './modules/bar';

export class MyStore {

    @Module()
    public bar = new BarModule();

    @State()
    public version = "2.0.0";
}
