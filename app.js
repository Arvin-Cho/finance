var uiController = (function () {
  var DOMstrings = {
    input: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput() {
      return {
        type: document.querySelector(DOMstrings.input).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDomstrings: function () {
      return DOMstrings;
      ("");
    },
  };
})();

var financeController = (function () {})();
var Income = function (id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};
var Expense = function (id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};
var data = {
  allItems: {
    inc: [],
    exp: [],
  },
  total: {
    inc: 1500,
    exp: 0,
  },
};
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log(uiController.getInput());
  };
  // 1/'oruulah uguduluudiig delgetsnees olj avna

  // 2/olj avsan uguduluudiig sanhuugii  controllert hadgalana
  //3/olj avsan ugduluudee web iiin ali hesegt tavih gargan
  //4/tusuviin tootsoog gargana
  //5/etssiin uldegdel tootsgg urdeng deggestend gargana

  var setUpEventListener = function () {
    var DOM = uiController.getDomstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function () {
      console.log(" Programm Ehellee");
      setUpEventListener();
    },
  };
})(uiController, financeController);
appController.init();
