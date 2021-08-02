import { Component } from '@angular/core';
import { AutoComplete } from './core/auto-complete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  toImport = '';
  shortList = '';
  start = ''
  items = ''

  ac: AutoComplete;


  constructor () {

    this.ac = new AutoComplete(); 
  }


  onImport() {
    let dic = this.toImport.split(' ')

      this.ac.addDictionary(dic);


      let comp = this.ac.getDictionary();

      let res = '';

      comp.forEach(element => {
        res += ' | ' + element; 
      });

      this.items = res;
  }


  valuechange(newValue: string) {
    let res = this.ac.getList(newValue);

    this.shortList = '';

    res.forEach(element => {
      this.shortList += ' | ' + element;
    });
  }
}
