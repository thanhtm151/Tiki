var app = angular.module("myapp", ["ngRoute"]);
app.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});
app.controller("myctrl", function ($scope, $http, $rootScope) {
    $scope.dsSanPham = [];
    var cart = new Cart();
    $scope.tongSP = cart.getTotalItem() || 0;
    $scope.cart = [];
    $scope.cart = cart.getCart();
    $scope.thongBaoThemSPThanhCong = () => {
        var myToastEl = document.getElementById("themSanPhamThanhCong");
        var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl, { delay: 1000, });
        myToast.show();
    };

    $http.get("js/product.json").then(function (response) {
        $scope.dsSanPham = response.data;
    });
    $scope.search = function () {
        $scope.searchList = $scope.keyword;
    }
    $scope.add = function (sp) {
        cart.addProduct(sp);
        $scope.tongSP = cart.getTotalItem();
        $scope.thongBaoThemSPThanhCong();
    };
    $scope.remove = function (id) {
        cart.removeProduct(id);
        $scope.tongSP = cart.getTotalItem();
        $scope.cart = cart.getCart();
        $scope.tongTien = cart.getPayment();
    };
    $scope.handleQuantityChange = () => {
        cart.setCart($scope.cart)
        $scope.tongSP = cart.getTotalItem();
        $scope.tongTien = cart.getPayment();

    }
    $scope.tongTien = cart.getPayment();
});