import { Module, State } from 'vuex-simple';
import { MainModule } from './modules/main';

export class MyStore {

    @Module()
    public main = new MainModule();

    @State()
    public version = "2.0.0";
}
