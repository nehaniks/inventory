import firebaseDb from "../firebase";
import { getDatabase, ref, get, set, child } from "firebase/database";

export async function getProducts() {
  const dbRef = ref(getDatabase());

  var products = [];
  await get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.val().forEach((child) => {
          products.push(child);
        });
      } else {
        console.log("No data available");
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });

    var result = {};

    Array.from(products).forEach((product) => {
      if (result[product.ProductName]) {
        result[product.ProductName]["Quantity"] += Number(product.Quantity);
        result[product.ProductName]["Cost"] += Number(product.Cost);
      } else {
        result[product.ProductName] = {
          ProductName: product.ProductName,
          Quantity: Number(product.Quantity),
          Cost: Number(product.Cost),
        };
      }
    });
  
    return Object.values(result);
}

export async function getPId() {
  const dbRef = ref(getDatabase());

  const result = await get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.size;
      } else {
        console.log("No data available");
        return 0;
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
}

export async function addNewProduct(
  pId,
  cost,
  date,
  pName,
  supplier,
  rate,
  quantity,
  unit
) {
  set(ref(firebaseDb, `products/${pId}`), {
    PId: pId,
    Cost: cost,
    ProductName: pName,
    Quantity: quantity,
    Rate: rate,
    Supplier: supplier,
    Unit: unit,
    Date: date,
  })
    .then(alert("Product Added Successfully !!!"))
    .catch((error) => {
      console.error(error);
    });
}

export async function deleteProduct(pId) {
  set(ref(firebaseDb, `products/${pId}`), null)
    .then(alert("Product Deleted Successfully !!!"))
    .catch((error) => {
      console.error(error);
    });
}

export async function getProductsOnDate(queryDate) {
  const dbRef = ref(getDatabase());

  var result = [];

  await get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.val().forEach((child) => {
          if (child.Date === queryDate) {
            result.push(child);
          }
        });
      } else {
        console.log("No data available");
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
}

export async function getProductsByName(prodName) {
  const dbRef = ref(getDatabase());

  var result = [];

  await get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.val().forEach((child) => {
          if (child.ProductName === prodName) {
            result.push(child);
          }
        });
      } else {
        console.log("No data available");
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
}

export async function getProductsNameList() {
  const dbRef = ref(getDatabase());

  var result = [];

  await get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.val().forEach((child) => {
          if (!result.includes(child.ProductName)) {
            result.push(child.ProductName);
          }
        });
      } else {
        console.log("No data available");
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
}

export async function getSuppliersNameList() {
  const dbRef = ref(getDatabase());

  var result = [];

  await get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.val().forEach((child) => {
          if (!result.includes(child.Supplier)) {
            result.push(child.Supplier);
          }
        });
      } else {
        console.log("No data available");
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
}

export async function getSuppliersByName(suppName) {
  const dbRef = ref(getDatabase());

  var result = [];

  await get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.val().forEach((child) => {
          if (child.Supplier === suppName) {
            result.push(child);
          }
        });
      } else {
        console.log("No data available");
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
}

export async function getTotal(products) {
    var result = {
      Quantity: 0,
      Cost: 0,
    };

    Array.from(products).forEach((product) => {
        result["Quantity"] += Number(product.Quantity);
        result["Cost"] += Number(product.Cost);
    });
  
    return Object.values(result);
}