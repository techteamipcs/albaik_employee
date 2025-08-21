import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService, Availability } from '../../providers/employee/employee.service';

@Component({
	selector: 'app-employee-availability',
	templateUrl: './employee-availability.component.html',
	styleUrls: ['./employee-availability.component.scss']
})
export class EmployeeAvailabilityComponent {

	@Input() employeeId!: string;
	availability: Availability[] = [];

	constructor(private employeeService: EmployeeService) { }

	ngOnInit(): void {
		if (this.employeeId) {
			this.employeeService.getEmployeeWithId(this.employeeId).subscribe({
				next: (res) => (this.availability = res.availability),
				error: (err) => console.error('Error fetching availability:', err),
			});
		}
	}
}
