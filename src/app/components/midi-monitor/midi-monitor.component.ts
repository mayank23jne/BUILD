import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { MidiService } from '../../services/midi.service';
import WebMidi from 'webmidi';
import {throwError} from 'rxjs';
declare var $ :any;
@Component({
  selector: 'app-midi-monitor',
  templateUrl: './midi-monitor.component.html',
  styleUrls: ['./midi-monitor.component.scss']
})
export class MidiMonitorComponent implements OnInit {

 model :any ={};
  constructor(private midiService: MidiService,private cd: ChangeDetectorRef) { }

  ngOnInit() {
   this.model.test = setInterval(()=>{
       this.midiService.getData() },100); 
 		
 
 }

 check(e){

   if(e.target.checked){
   		        this.model.test = setInterval(()=>{
       this.midiService.getData() },100); 
   }
   else{
   		clearInterval(this.model.test);
   		
   }
 }
}
