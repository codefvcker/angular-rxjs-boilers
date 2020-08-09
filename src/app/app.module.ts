import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchTwoComponent } from './search-two/search-two.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, SearchComponent, SearchTwoComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
