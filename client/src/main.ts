import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import '@ui5/webcomponents/dist/Table.js';
import '@ui5/webcomponents-compat/dist/TableColumn.js';
import '@ui5/webcomponents/dist/TableRow.js';
import '@ui5/webcomponents/dist/TableCell.js';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
