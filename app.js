var uiController = (function () {})();

var financeController = (function () {})();

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log("tovch dargdlaa");
  };
  // 1/'oruulah uguduluudiig delgetsnees olj avna

  // 2/olj avsan uguduluudiig sanhuugii  controllert hadgalana
  //3/olj avsan ugduluudee web iiin ali hesegt tavih gargan
  //4/tusuviin tootsoog gargana
  //5/etssiin uldegdel tootsgg urdeng deggestend gargana

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
