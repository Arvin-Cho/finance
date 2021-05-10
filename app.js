var uiController = (function () {
  var DOMstrings = {
    input: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomList: ".income__list",
    expenseList: ".expenses__list",
  };
  return {
    getInput() {
      return {
        type: document.querySelector(DOMstrings.input).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    getDomstrings: function () {
      return DOMstrings;
    },
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      // Conver list to array
      var fieldsArr = Array.prototype.slice.call(fields);
      // for (i = 0; i < fields.length; i++) {
      //   fieldsArr[i].value = "";
      // }
      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });
      fieldsArr[0].focus();
    },
    addListItem: function (item, type) {
      // Orloga zarlagiin elementiig agulsan Html beltegene
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomList;
        html =
          '<div class="item clearfix" id="income-%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">%VAL%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">%VAL%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        // '   <div class="item clearfix" id="expense-%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">- %VAL%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.total[type] = sum;
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
    tusuv: 0,
    huvi: 0,
  };
  return {
    tusuvTootsooloh: function () {
      calculateTotal("inc");
      calculateTotal("exp");
      data.tusuv = data.total.inc - data.total.exp;
      data.huvi = Math.round((data.total.exp / data.total.inc) * 100);
    },
    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
      };
    },
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
    if (input.description !== "" && input.value !== "") {
      // 2/olj avsan uguduluudiig sanhuugii  controllert hadgalana

      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      //3/olj avsan ugduluudee web iiin ali hesegt tavih gargan

      uiController.addListItem(item, input.type);
      uiController.clearFields();
      //4/tusuviin tootsoog gargana
      financeController.tusuvTootsooloh();
      //5/etssiin uldegdel tootsgg urdeng deggestend gargana
      var tusuv = financeController.tusviigAvah();
      console.log(tusuv);
    }
  };

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
