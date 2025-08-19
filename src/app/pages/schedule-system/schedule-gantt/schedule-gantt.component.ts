import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { EmployeeService } from 'src/app/providers/employee/employee.service';
@Component({
  selector: 'app-schedule-gantt',
  templateUrl: './schedule-gantt.component.html',
  styleUrls: ['./schedule-gantt.component.scss']
})
export class ScheduleGanttComponent {
@ViewChild('editor') editor: GanttEditorComponent;
  // public editorOptions: GanttEditorOptions;
  public data: any;
  public empdata: any;
  public employeeData: any[] = [];
  public msg_danger: boolean = false;
  constructor(public fb: FormBuilder,
    public employeeService: EmployeeService,
  ) {
  }

  ngOnInit() {
    // this.data = this.initialData();
    this.editorOptions = {
      vFormat: 'day'
    }
    this.getEmployeeData();
  }


  initialData() {
    return [{
      'pID': 1,
      'pName': 'Define Chart API',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
    },
    {
      'pID': 11,
      'pName': 'Chart Object',
      'pStart': '2017-02-20', 
      'pEnd': '2017-02-20',
      'pClass': 'gmilestone',
      'pLink': '',
      'pMile': 1,
      'pRes': 'Shlomy',
      'pComp': 100,
      'pGroup': 0,
      'pParent': 1,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 12,
      'pName': 'Task Objects',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy',
      'pComp': 40,
      'pGroup': 1,
      'pParent': 1,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 121,
      'pName': 'Constructor Proc #1234 of February 2017',
      'pStart': '2017-02-21',
      'pEnd': '2017-03-09',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian T.',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 122,
      'pName': 'Task Variables',
      'pStart': '2017-03-06',
      'pEnd': '2017-03-11',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': 121,
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 123,
      'pName': 'Task by Minute/Hour',
      'pStart': '2017-03-09',
      'pEnd': '2017-03-14 12: 00',
      'pClass': 'gtaskyellow',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Ilan',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 124,
      'pName': 'Task Functions',
      'pStart': '2017-03-09',
      'pEnd': '2017-03-29',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Hayati TAŞTAN',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': '123SS',
      'pCaption': 'This is a caption',
      'pNotes': null
    },
    {
      'pID': 2,
      'pName': 'Create HTML Shell',
      'pStart': '2017-03-24',
      'pEnd': '2017-03-24',
      'pClass': 'gtaskyellow',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Emre TAŞTAN',
      'pComp': 20,
      'pGroup': 0,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': 122,
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 3,
      'pName': 'Code Javascript',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 31,
      'pName': 'Define Variables',
      'pStart': '2017-02-25',
      'pEnd': '2017-03-17',
      'pClass': 'gtaskpurple',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 30,
      'pGroup': 0,
      'pParent': 3,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 32,
      'pName': 'Calculate Chart Size',
      'pStart': '2017-03-15',
      'pEnd': '2017-03-24',
      'pClass': 'gtaskgreen',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Eren TAŞTAN',
      'pComp': 40,
      'pGroup': 0,
      'pParent': 3,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 33,
      'pName': 'Draw Task Items',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Someone',
      'pComp': 40,
      'pGroup': 2,
      'pParent': 3,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 332,
      'pName': 'Task Label Table',
      'pStart': '2017-03-06',
      'pEnd': '2017-03-09',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 33,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 333,
      'pName': 'Task Scrolling Grid',
      'pStart': '2017-03-11',
      'pEnd': '2017-03-20',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 0,
      'pParent': 33,
      'pOpen': 1,
      'pDepend': '332',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 34,
      'pName': 'Draw Task Bars',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Anybody',
      'pComp': 60,
      'pGroup': 1,
      'pParent': 3,
      'pOpen': 0,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 341,
      'pName': 'Loop each Task',
      'pStart': '2017-03-26',
      'pEnd': '2017-04-11',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 34,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 342,
      'pName': 'Calculate Start/Stop',
      'pStart': '2017-04-12',
      'pEnd': '2017-05-18',
      'pClass': 'gtaskpink',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 34,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 343,
      'pName': 'Draw Task Div',
      'pStart': '2017-05-13',
      'pEnd': '2017-05-17',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 34,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 344,
      'pName': 'Draw Completion Div',
      'pStart': '2017-05-17',
      'pEnd': '2017-06-04',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 34,
      'pOpen': 1,
      'pDepend': '342,343',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 35,
      'pName': 'Make Updates',
      'pStart': '2017-07-17',
      'pEnd': '2017-09-04',
      'pClass': 'gtaskpurple',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 30,
      'pGroup': 0,
      'pParent': 3,
      'pOpen': 1,
      'pDepend': '333',
      'pCaption': '',
      'pNotes': ''
    }];
  }


public editorOptions: object = {
  taskFields: {
    id: 'id',
    name: 'name',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    child: 'subTasks'
  },
  editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  }
};


  getEmployeeData() {
  this.employeeService.getallEmployeeDetails({}).subscribe(
    (response) => {
      if (response.code === 200 && response.result?.length) {
        this.data = response.result.map((item, index) => {
          const today = new Date();
          const start = today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
          const end = new Date(today.getTime() + 3 * 86400000)
                        .toISOString().slice(0, 10);

          return {
            pID: item._id || index + 1,
            pName: item.username,
            // pStart: start,
            pStart: item.hireDate,
            pEnd: end,
            pClass: 'gtaskblue',
            pLink: '',
            pMile: 0,
            pRes: item.username,
            pComp: 0,
            pGroup: 0,
            pParent: 0,
            pOpen: 1,
            pDepend: '',
            pCaption: 'hi this is gantt chart',
            pNotes: 'make any note'
          };
        });

        console.log('Mapped Gantt data (jsgantt):', this.data);
      } else {
        this.msg_danger = true;
      }
    }
  );
}




}
