import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../Slices/userSlice";
import { selectAllProducts, addNewSizeAsync } from "../../Slices/productSlice";
import { KIDS_SIZES, MEN_SIZES, WOMEN_SIZES } from "../../data/shoesData";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Badge } from "primereact/badge";
import { MultiSelect } from "primereact/multiselect";

const ProductsSize = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const token = useSelector(selectToken);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSizes, setSlectedSizes] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [product, setProduct] = useState(null);
  const [productSizes, setProductSizes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewSizeAsync({ data: product, newSizes: selectedSizes, token: token })
    );
    setSlectedSizes([]);
    setProduct([]);
  };

  useEffect(() => {
    if (product) {
      let tempSizes = [];
      for (let prod of allProducts) {
        if (prod.name === product.name) {
          tempSizes.push(prod.size);
        }
      }
      setSizes(tempSizes.sort());
      if (product.gender_category === "Women") {
        setProductSizes(WOMEN_SIZES);
      } else if (product.gender_category === "Men") {
        setProductSizes(MEN_SIZES);
      } else {
        setProductSizes(KIDS_SIZES);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.name === thing.name)
      )
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Register</h5>
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <Dropdown
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  options={filteredProducts}
                  optionLabel="name"
                  required
                />
                <label htmlFor="product">Product</label>
              </span>
            </div>
            <div className="field">
              {sizes &&
                sizes.map((s) => (
                  <Badge
                    key={s}
                    value={s}
                    size="xlarge"
                    severity="success"
                    style={{ marginRight: "5px" }}
                  ></Badge>
                ))}
            </div>
            <div className="field">
              <span className="p-float-label">
                <MultiSelect
                  value={selectedSizes}
                  options={productSizes}
                  optionLabel="size"
                  onChange={(e) => setSlectedSizes(e.value)}
                  maxSelectedLabels={5}
                  required
                />
                <label htmlFor="size">Sizes*</label>
              </span>
            </div>
            <Button type="submit" label="Add" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsSize;
