import firebaseDb from "../firebase";
import { getDatabase, ref, get, set, child } from "firebase/database";

export async function getProducts() {
  const dbRef = ref(getDatabase());

  const result = await get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
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

  // console.log(result);
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
