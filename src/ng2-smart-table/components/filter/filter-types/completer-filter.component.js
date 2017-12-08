var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CompleterService } from 'ng2-completer';
import { DefaultFilter } from './default-filter';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
var CompleterFilterComponent = (function (_super) {
    __extends(CompleterFilterComponent, _super);
    function CompleterFilterComponent(completerService) {
        var _this = _super.call(this) || this;
		_this.inputControl = new FormControl();
        _this.completerService = completerService;
        _this.completerContent = new Subject();
        return _this;
    }
    CompleterFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        var config = this.column.getFilterConfig().completer;
        config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
        config.dataService.descriptionField(config.descriptionField);
        this.changesSubscription = this.completerContent
            .map(function (ev) { return (ev && ev.title) || ev || ''; })
            .distinctUntilChanged()
            .debounceTime(this.delay)
            .subscribe(function (search) {
            _this.query = search;
            _this.setFilter();
        });
		
		/*this.inputControl.valueChanges
            .skip(1)
            .distinctUntilChanged()
            .debounceTime(this.delay)
            .subscribe(function (value) { return _this.setFilter(); });*/
    
    };
    CompleterFilterComponent.prototype.inputTextChanged = function (event) {
		console.log(event);
		if(event!==null) {
		if(Array.isArray(event)) {
		const q = [];
		for(var i in event) {
			q.push(event[i].name);
		}
		this.query = q;
		
		}
		else
		this.query = event.name.toString();
		this.setFilter(); 
		}
		else
		{
			this.query='';
			this.setFilter();
		}
		//this.inputControl.setValue(event.name);
		        // workaround to trigger the search event when the home/end buttons are clicked
        // when this happens the [(ngModel)]="query" is set to "" but the (selected) method is not called
        // so here it gets called manually
        if (event === '') {
            //this.completerContent.next(event);
        }
    };
    return CompleterFilterComponent;
}(DefaultFilter));
CompleterFilterComponent = __decorate([
    Component({
        selector: 'completer-filter',
        template: "\n  <ng-select placeholder=\"Filter\" [multiple]=\"column.getFilterConfig().completer.multiple || false\" class=\"filterselect\" [formControl]=\"inputControl\"\n [items]=\"column.getFilterConfig().completer.data\" bindLabel=\"name\" bindValue=\"name\"  (change)=\"inputTextChanged($event)\"> </ng-select> \n  ",
    }),
    __metadata("design:paramtypes", [CompleterService])
], CompleterFilterComponent);
export { CompleterFilterComponent };
//# sourceMappingURL=completer-filter.component.js.map