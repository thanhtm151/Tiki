class Cart {
    constructor() {}
    getCart() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }
    setCart(listProduct) {
      localStorage.setItem("cart", JSON.stringify(listProduct));
    }
    addProduct(product, quantity = 1) {
      let cart = this.getCart();
      let pro = cart.find((item) => item.id === product.id);
      if (pro) {
        pro.quantity += quantity;
        this.setCart(cart);
      } else {
        product.quantity = quantity;
        cart.push(product);
        this.setCart(cart);
      }
    }
    removeProduct(id) {
      let cart = this.getCart();
      cart = cart.filter((item) => item.id !== id);
      this.setCart(cart);
    }
    getTotalItem() {
      let total = 0;
      let cart = this.getCart();
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity;
      }
      return total;
    }
    getPayment() {
      return this.getCart().reduce((prev, curr) => {
        return prev + curr.quantity * curr.price;
      }, 0);
    }
}