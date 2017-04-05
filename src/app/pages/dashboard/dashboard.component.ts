import { Component,OnInit } from '@angular/core';
import { UserGroupService  } from './usergroup.service';
import { ViewContainerRef, ViewEncapsulation } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';


@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
  providers: [Modal]
})
export class Dashboard implements OnInit{


  public userGroups = [];
  public userGroupName : string;

   // roles = [
   //     {id:0, name: "--Select--"},
   //     {id: 1, name: "Create"},
   //     {id: 2, name: "Update"},
   //     {id: 3, name: "Edit"},
   //     {id: 4, name: "Delete"}
   //   ];

  public items = [];
  public item: string;

  constructor(private userGroupService : UserGroupService,public modal: Modal) {

    this.userGroupService.getUserGroups().subscribe(data => {
      this.userGroups = data;

      console.log(data);
    }, error => console.log('Could not load userGroups '));
    
  }

  removeRecordPlugin(item) {
        // this.recentlyRemoveUsers = this.table.items.remove(item);
    }
 
  addUserGroup() { //userGrpName : string
    //console.log("inside add")
        if (this.userGroupName) {
            //this.userGroupName = userGrpName;

            console.log( "func "+this.userGroupName);
            this.userGroupService.addUserGroup(this.userGroupName).
                subscribe((r:Response)=>{
                  console.log(r);
                });
            console.log("user group saved successfully!!");
            
            window.location.reload();
        }
    }


  onEdit(){
    console.log("clicking on edit")
  }
 onClick() {
    this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('A simple Alert style modal window')
        .body(`<div class="container-fluid">
  <p></p>
  <dual-list [sort]="keepSorted" [source]="source" [key]="key" [display]="display" [filter]="filter" [(destination)]="confirmed" height="265px"></dual-list>

  

  <div class="tab-content">
    <div class="tab-pane" [class.active]="tab===1">
      <div class="row">
        <div class="col-sm-6" style="margin-top:32px;"><h4>Source</h4><pre><small>{{source|json}}</small></pre></div>
        <div class="col-sm-6" style="margin-top:32px;"><h4>Confirmed</h4><pre><small>{{confirmed|json}}</small></pre></div>
      </div>
    </div>

    <div class="tab-pane" [class.active]="tab===2">
      <div class="row" style="margin-top:20px;">
        <div class="col-sm-6">
          <label>Modify parent's source</label>
          <form class="form-inline well">
            <input class="form-control col-sm-1" style="margin-right:4px;" [(ngModel)]="userAdd" name="userAdd">
            <button class="btn btn-success" (click)="doCreate()" [disabled]="!userAdd.length">Create</button>
            <button class="btn btn-danger" (click)="doDelete()">Delete</button>
          </form>
        </div>
        <div class="col-sm-6">
          <label>Modify parent's confirmed</label>
          <form class="form-inline well">
          <button class="btn btn-default" (click)="doAdd()">Add</button>
          <button class="btn btn-default" (click)="doRemove()">Remove</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <label>General</label><br/>
        <form class="form-inline well">
          <button class="btn btn-default" (click)="doFilter()">{{filterBtn()}}</button>
          <button class="btn btn-default" (click)="doSwap()">Swap source</button>
          <button class="btn btn-primary" (click)="doReset()">Reset</button>
        </form>
      </div>
    </div>
  </div>
</div>
            `)
        .open();
  }

  private tab:number = 1;

  private keepSorted:boolean = true;

  private key:string;
  private display:string;
  private filter:boolean = false;
  private source:Array<any>;
  private confirmed:Array<any>;

  private sourceStations:Array<any>;
  private sourceChessmen:Array<any>;

  private confirmedStations:Array<any>;
  private confirmedChessmen:Array<any>;

  private toggle:boolean = true;

  private userAdd:string = '';

  private stations:Array<any> = [
    { key: 1, station: 'Antonito', state: 'CO' },
    { key: 2, station: 'Big Horn', state: 'NM' },
    { key: 3, station: 'Sublette', state: 'NM' },
    { key: 4, station: 'Toltec', state: 'NM' },
    { key: 5, station: 'Osier', state: 'CO' },
    { key: 6, station: 'Chama', state: 'NM'},
    { key: 7, station: 'Monero', state: 'NM' },
    { key: 8, station: 'Lumberton', state: 'NM' },
    { key: 9, station: 'Duice', state: 'NM' },
    { key: 10, station: 'Navajo', state: 'NM' },
    { key: 11, station: 'Juanita', state: 'CO' },
    { key: 12, station: 'Pagosa Jct', state: 'CO' },
    { key: 13, station: 'Carracha', state: 'CO' },
    { key: 14, station: 'Arboles', state: 'CO' },
    { key: 15, station: 'Solidad', state: 'CO' },
    { key: 16, station: 'Tiffany', state: 'CO' },
    { key: 17, station: 'La Boca', state: 'CO' },
    { key: 18, station: 'Ignacio', state: 'CO' },
    { key: 19, station: 'Oxford', state: 'CO' },
    { key: 20, station: 'Florida', state: 'CO' },
    { key: 21, station: 'Bocea', state: 'CO' },
    { key: 22, station: 'Carbon Jct', state: 'CO' },
    { key: 23, station: 'Durango', state: 'CO' },
    { key: 24, station: 'Home Ranch', state: 'CO' },
    { key: 25, station: 'Trimble Springs', state: 'CO' },
    { key: 26, station: 'Hermosa', state: 'CO' },
    { key: 27, station: 'Rockwood', state: 'CO' },
    { key: 28, station: 'Tacoma', state: 'CO' },
    { key: 29, station: 'Needleton', state: 'CO' },
    { key: 30, station: 'Elk Park', state: 'CO' },
    { key: 31, station: 'Silverton', state: 'CO' },
    { key: 32, station: 'Eureka', state: 'CO' }
   ];

  private chessmen:Array<any> = [
    { _id: 1, name: "Pawn" },
    { _id: 2, name: "Rook" },
    { _id: 3, name: "Knight" },
    { _id: 4, name: "Bishop" },
    { _id: 5, name: "Queen" },
    { _id: 6, name: "King" }
  ];

  ngOnInit() {
    this.doReset();
  }

  private useStations() {
    this.toggle = true;
    this.key = 'key';
    this.display = 'station';
    this.keepSorted = true;
    this.source = this.sourceStations;;
    this.confirmed = this.confirmedStations;
  }

  private useChessmen() {
    this.toggle = false;
    this.key = '_id';
    this.display = 'name';
    this.keepSorted = false;
    this.source = this.sourceChessmen;
    this.confirmed = this.confirmedChessmen;
  }

  doSwap() {
    if (this.toggle) {
      this.useChessmen();
    } else {
      this.useStations();
    }
  }

  doReset() {
    this.sourceChessmen = JSON.parse(JSON.stringify(this.chessmen));
    this.sourceStations = JSON.parse(JSON.stringify(this.stations));
    this.confirmedChessmen = new Array<any>();
    this.confirmedStations = new Array<any>();

    if (this.toggle) {
      this.useStations();
      this.confirmedStations.push( { key: 32, station: 'Eureka', state: 'CO' } );
    } else {
      this.useChessmen();
    }
  }

  doDelete() {
    if (this.source.length > 0) {
      this.source.splice(0, 1);
    }
  }

  doCreate() {
    let o:any = {};
    o[this.key] = this.source.length + 1;
    o[this.display] = this.userAdd;
    this.source.push( o );
    this.userAdd = '';
  }

  doAdd() {
    for (let i = 0, len = this.source.length; i < len; i += 1) {
      let o = this.source[i];
      let found = this.confirmed.find( (e:any) => e[this.key] === o[this.key] );
      if (!found) {
        this.confirmed.push(o);
        break;
      }
    }
  }

  doRemove() {
    if (this.confirmed.length > 0) {
      this.confirmed.splice(0, 1);
    }
  }

  doFilter() {
    this.filter = !this.filter;
  }

  filterBtn() {
    return (this.filter ? 'Hide Filter' : 'Show Filter');
  }

  
  }
