import ProductsList from "../components/item-list-container/Item.json"

export const APIProductsList = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ProductsList);
    }, 3000);
  });