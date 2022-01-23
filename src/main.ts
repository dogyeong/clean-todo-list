import { Controller } from "./adapters/controller";
import { Presenter } from "./adapters/presenter";
import { View } from "./adapters/view";
import { localStorageDriver } from "./drivers/storage.driver";
import { Interactor } from "./models/interactor.use-case";
import './style.css'

const interactor = new Interactor(localStorageDriver)
const presenter = new Presenter(interactor)

new View(document.getElementById('app')!, presenter)
new Controller(document.getElementById('app')!, interactor)
