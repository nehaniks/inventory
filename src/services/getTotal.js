export async function getProductsTotal(products) {
  var result = {};

  Array.from(products).forEach((product) => {
    if (result[product.ProductName]) {
      result[product.ProductName]["Quantity"] += product.Quantity;
      result[product.ProductName]["Cost"] += product.Cost;
    } else {
      result[product.ProductName] = {
        ProductName: product.ProductName,
        Quantity: product.Quantity,
        Cost: product.Cost,
      };
    }
  });

  return Object.entries(result);
}
