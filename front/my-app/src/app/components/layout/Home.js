import React from "react";
import { Link } from "react-router-dom";
import { selectIsAdmin } from "../../Slices/userSlice.js";
import { useSelector } from "react-redux";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import "./Home.css";
import AdminButtons from "../admin/AdminButtons.js";

export default function Home() {
  
  const isUserAdmin = useSelector(selectIsAdmin);

  return isUserAdmin ? ( // if admin user logged
    <AdminButtons />
  ) : (
    <MDBCarousel showControls showIndicators fade>
      <MDBCarouselItem
        itemId={1}
        src={require("../../assets/men_shoes.png")}
        alt="men shoes"
      >
        <h1>
          <Link style={{ color: "white" }} to="/products/Men">
            Men Shoes
          </Link>
        </h1>
      </MDBCarouselItem>
      <MDBCarouselItem
        itemId={2}
        src={require("../../assets/women_shoes.png")}
        alt="womenshoes"
      >
        <h1>
          <Link style={{ color: "white" }} to="/products/Women">
            Women Shoes
          </Link>
        </h1>
      </MDBCarouselItem>
      <MDBCarouselItem
        itemId={3}
        src={require("../../assets/children_shoes.png")}
        alt="children shoes"
      >
        <h1>
          <Link style={{ color: "white" }} to="/products/Kids">
            Kids Shoes
          </Link>
        </h1>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}
