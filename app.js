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
    },
    addListItem: function (item, type) {
      // Orloga zarlagiin elementiig agulsan Html beltegene
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">%VAL%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expense__list";
        html =
          '   <div class="item clearfix" id="expense-%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">- %VAL%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Ter html er orson utagiig replace hiij solij ugnu
      html = html.replace("%ID%", item.id);
      html = html.replace("%DESC%", item.description);
      html = html.replace("%VAL%", item.value);

      //Etssiin uldegdel tootsoog delgetsen der gargana
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

var financeController = (function () {
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
    items: {
      inc: [],
      exp: [],
    },
    total: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    addItem: function (type, desc, val) {
      var item, id;
      if (data.items[type].length === 0) {
        id = 1;
      } else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if (item === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
      return item;
    },
    data: function () {
      return data;
    },
  };
})();

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1/'oruulah uguduluudiig delgetsnees olj avna

    var input = uiController.getInput();

    // 2/olj avsan uguduluudiig sanhuugii  controllert hadgalana

    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );
    //3/olj avsan ugduluudee web iiin ali hesegt tavih gargan

    uiController.addListItem(item, input.type);
  };

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
