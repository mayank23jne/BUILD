import { Injectable } from '@angular/core';
import {forkJoin} from 'rxjs'; 
import WebMidi from 'webmidi';
declare var $ :any;
@Injectable({
  providedIn: 'root'
})
export class MidiService {
model :any ={};
  constructor() { }
 
 
	getData(){
	
         var self = this;
		   WebMidi.enable(function () {
		   self.model.inputs = [];
		  			var test = WebMidi.inputs;
		    	if(test){
		    	 $.each(test,function(i,val){
		    	 	self.model.inputs.push(val.name);
		    	 });
		    	}
		    	
		    	var input = WebMidi.inputs[0];
		    	
		    	input.addListener('noteon', "all",
				    function (e) {
				    console.log(e);
				     self.model.channel = e.channel;
				   	 self.model.cc = e.type;
				     self.model.value = e.value;
				     self.model.velocity = e.rawVelocity;
				     

				    }
				  );
		 		input.addListener('pitchbend', "all",
				    function (e) {
				     self.model.channel = e.channel;
				   	 self.model.cc = e.type;
				     self.model.value = e.value;
				     self.model.velocity = e.rawVelocity;
				     
				    }
				  );
				input.addListener('controlchange', "all",
				    function (e) {
				    
				     self.model.channel = e.channel;
				   	 self.model.cc = e.type;
				     self.model.value = e.value;
				     self.model.velocity = e.rawVelocity;
				     
				    }
				  );  
				  input.addListener('programchange', "all",
				    function (e) {
				   
				     self.model.channel = e.channel;
				   	 self.model.cc = e.type;
				     self.model.value = e.value;
				     self.model.velocity = e.rawVelocity;
				     
				    }
				  ); 
    			
    		
			},true);
     }
  
 
}

