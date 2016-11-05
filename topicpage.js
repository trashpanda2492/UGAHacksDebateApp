import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './topic.html';


Template.startfunc.events
(
	{
  'click button'(event, instance) 
		{
    // increment the counter when button is clicked
		prompt("hello");

		},
	}
);
