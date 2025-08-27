import { Component } from '@angular/core';

@Component({
  selector: 'app-shift-schedule',
  templateUrl: './shift-schedule.component.html',
  styleUrls: ['./shift-schedule.component.scss']
})
export class ShiftScheduleComponent {
empdetails = [{
		'name'	: 'Asad',
		'empId':'ALBKEMP-123',
		'position': 'Level A',
		'department': 'Production',
		'location': 'dubai',
		'email': 'asadipcs@gmail.com',
		'phone': '123-456-7890',
		'photo': 'path/to/photo.jpg',
		'shift': 'Morning',
		'leaves': 12,
		'joiningDate': '2020-01-15'
	}];
  upcomingShifts = [
    { day: 'Fri', date: '7 ', month: 'MAR', time: '5:00 AM - 10:00 PM', department: 'The Department of Reporting Manager' },
    { day: 'Mon', date: '10 ', month: 'MAR', time: '5:00 AM - 10:00 PM', department: 'The Department of Reporting Manager' },
    { day: 'Tue', date: '11 ', month: 'MAR', time: '5:00 AM - 10:00 PM', department: 'The Department of Reporting Manager' },
    { day: 'Wed', date: '12 ', month: 'MAR', time: '5:00 AM - 10:00 PM', department: 'The Department of Reporting Manager' },
    { day: 'Thu', date: '13 ', month: 'MAR', time: '5:00 AM - 10:00 PM', department: 'The Department of Reporting Manager' },
  ];
}
