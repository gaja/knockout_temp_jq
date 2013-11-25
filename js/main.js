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
function addExistingBeerNames (filler) {
	console.log('Adding data to auto complete ...');
	for (var name in beersStore) {
		filler.push(beersStore[name].name);
	}

}

// ko view model -- controls inputed data
var vm = {
	beers: ko.observableArray(beersStore),
	inputValue: ko.observable(''),
	res: ko.observableArray(),

	search: function () {
		// clear all data from variable
		vm.res.splice(0, vm.res.length);

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
	
};
// subscribe view to viewModel; i think this is a delegate between event and method
vm.inputValue.subscribe(vm.search);

// implements autocomplete functionality -- uses jQueryUI(autocomplete function)
ko.bindingHandlers.ko_autocomplete = {
    init: function (element, params) {
        $(element).autocomplete(params());
    },
    update: function (element, params) {
        $(element).autocomplete("option", "source", params().source);
    }
}

ko.applyBindings(vm);




// Webteh, Infinum, Pet minuta i Mono