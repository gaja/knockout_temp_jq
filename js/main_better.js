var blocker = 0;

// prototype data model -- later excanged with server data
var beersStore =  [
	  {name:"pan dark beer", brewery:"Pan", style:"dark"},
	  {name: "pan regular", brewery:"Pan", style:"regular"},
	  {name: "pan Half", brewery:"Pan", style:"half-dark"},
	  {name: "Budwiser Dark", brewery:"Budwiser", style:"dark"},
	  {name: "Budwiser Regular", brewery:"Budwiser", style:"regular"},
	  {name: "Becks Regular", brewery:"Becks", style:"regular"}
	];

var autoCompleteWords = [];

// push names from data model to array -- for autocomplete function
function addExistingBeerNames (copyTo) {
	console.log('Adding data to auto complete ...');	
	if (blocker == 0){
		for (var name in beersStore) {
			copyTo.push(beersStore[name].name);
			if (beersStore.length == autoCompleteWords.length)
			{
				console.log('sucess!\nInserted ' + autoCompleteWords.length + ' names to auto-search.');	
			}
		}
	blocker += 1;
	} else {
		console.log ('Can\'t add, allready added!');
	}
}

// copy clicked list data to search box
function copyLiToSearch () {
	$('div.showAll>ul>li>strong').click(function () {
		var clickedText = $(this).text();
		console.log('You have clicked ' + clickedText);
		$('div.inputArea > input').val(clickedText);	
		$('div.inputArea>input').focus();
	});
}

// insert value into array on enter
$('div.inputArea>input').keypress(function(e) {
    if(e.which == 13) {
        console.log('The Enter was Pressed.');
        //vm.res.pop(beersStore[beersStore.length-1]);
        //var getLastElIndex = vm.res.length;
        var inputBoxValue = $('div.inputArea > input').val();
        //var lastEnteredValue = (typeof lastEnteredValue === 'undefined') ? 'empty' : vm.res()[vm.res().length-1].name;
        var lastEnteredValue = vm.res()[vm.res().length-1].name;
        if (vm.res()[vm.res().length] == 0 && inputBoxValue != '') {vm.search();console.log('first input');}
        if(lastEnteredValue != 'undefined' && lastEnteredValue == inputBoxValue && vm.res().length > 0 && inputBoxValue != "") {
        	console.log('inside if of ENTER function');
        	vm.search(); 
        }
		
		// vm.res.pop(beersStore);
    }
});

// 
function deleteListItem () {
	$('div.showTable>ul>li').click(function () {	
		// TODO 
		// count list items inside div class
		// get clicked list item number
		// use that number to delete object inside res ko.observableArray()
		// use pop method
		// check best method -- array holes
		var listItem_clicked = $('div.showTable>ul>li').index( this );

		console.log('You have pressed on '+ (listItem_clicked + 1) + '. element inside list.');
		vm.res.splice(listItem_clicked, 1);		// looks like splice didn't live holes inside array :)
	});
}


// ko view model -- controls inputed data
var vm = {
	beers: ko.observableArray(beersStore),
	inputValue: ko.observable(''),
	res: ko.observableArray(),

	search: function () {
		// clear all data from variable
		if(vm.res.length = 0)
			vm.res.splice();
		//else
		//	vm.res.splice(vm.res.length-1);

		for (var i = 0; i < beersStore.length; i++)	{
			if (beersStore[i].name == vm.inputValue()) {
				vm.res.push(beersStore[i]);
				console.log('sucess!\nInserted ' + vm.res().length + ' objects');
				break;
			}else {
				console.log(beersStore[i]);
			}
		}
	},
	resetList: function () {
		delete vm.res([]);
		//vm.res = vm.res().filter(function(n){return n});	// should remove all empty (deleted) items position in res field
		$('div.inputArea > input').val('');	
	}
};

// subscribe view to viewModel; i think this is a delegate between event and method
vm.inputValue.subscribe(vm.search);

// auto-complete stuff
vm.ac = ko.dependentObservable (function () {
	var search = this.inputValue().toLowerCase();
	return ko.utils.arrayFilter(beersStore, function (allBeers){
		return allBeers.name.toLowerCase().indexOf(search) >= 0;
	});
}, vm);

// binds some functionality when page is loaded
$(document).ready( function () {
	ko.applyBindings(vm);
	addExistingBeerNames(autoCompleteWords);
	copyLiToSearch();
	deleteListItem();
} );

// Webteh, Infinum, Pet minuta i Mono


// TODO
// i saw a double inset insted of single -- dont know the trigger yet
// when populate list is deleteted if text stay on input fileld and o want to add this item it want let me(difference between clicked and input value)
// delete list item wont work even when it's activated on page load
// after deleteing populating list last item can't be passed to res array; can be passed after some other object. Check lastEntered variable (error: undefined)