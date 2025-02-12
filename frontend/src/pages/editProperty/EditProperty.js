import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./EditProperty.css";

const EditProperty = () => {
 const [property, setProperty] = useState();
  const [propetyId, setPropertyId] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [numberOfBathRooms, setNumberOfBathRooms] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [isRented, setIsRented] = useState("");
  const [rentedDate, setRentedDate] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [homeType, setHomeType] = useState("");
  const [isForSale, setIsForSale] = useState("");
  const [image, setImage] = useState({ file: null });
  const [images, setImages] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();
  const PROPERTY_URL = process.env.REACT_APP_API_URL + "/properties/" + id;

  useEffect(() => {
    axios.get(PROPERTY_URL).then((res) => {
      setPropertyId(res.data.id);
      setPropertyName(res.data.propertyName);
      setDescription(res.data.description);
      setAddress(res.data.address);
      setStreet(res.data.street);
      setZip(res.data.zip);
      setCity(res.data.city);
      setSquareFeet(res.data.squareFeet);
      setNumberOfRooms(res.data.numberOfRooms);
      setNumberOfBathRooms(res.data.numberOfBathRooms);
      setRentAmount(res.data.rentAmount);
      setIsRented(res.data.isRented);
      setRentedDate(res.data.rentedDate);
      setPropertyType(res.data.propertyType);
      setHomeType(res.data.homeType);
      setIsForSale(res.data.isForSale);
      setImages(res.data.images);

      console.log(res.data.images);
    });
  }, []);

  const data = {
    id: propetyId,
    propertyName: propertyName,
    description: description,
    address: address,
    street: street,
    zip: zip,
    city: city,
    squareFeet: squareFeet,
    numberOfRooms: numberOfRooms,
    numberOfBathRooms: numberOfBathRooms,
    rentAmount: rentAmount,
    isRented: isRented,
    rentedDate: rentedDate,
    propertyType: propertyType,
    homeType: homeType,
    isForSale: isForSale,
    images: [],
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/properties/${id}`)
      .then((res) => {
        setProperty(res.data);
      });
  }, []);

  function onFileUploadChange(e) {
    setImage({ file: e.target.files[0] });
  }
  // function Update(e) {
  //   e.preventDefault();
  //   axios
  //     .put(process.env.REACT_APP_API_URL + `/properties/${id}`, data)
  //     .then(navigate("/"));
  // }
  function Update(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/properties/imgUpload",
        formData,
        config
      )

      .then((res) => {
        console.log(res.data);
        data.images.push({ imgUrl: res.data });
        axios
          .post(process.env.REACT_APP_API_URL + "/properties", data)
          .then((res) => {
            console.log(res.data);
            navigate("/");
          });
      });
  }
  return (
    <div class="container mt-5 mb-5">
      <div className="card ms-auto me-auto p-3 shadow-lg custom--card">
        <form className="row g-3">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Property Name
            </label>
            <input
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <textarea
              class="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>

          <div class="col-12">
            <label for="inputAddress2" class="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              class="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>

          <div class="col-md-4">
            <label for="inputStreet" class="form-label">
              Street
            </label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              class="form-control"
              id="inputCity"
            />
          </div>

          <div class="col-md-4">
            <label for="inputCity" class="form-label">
              City
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              class="form-control"
              id="inputCity"
            />
          </div>

          <div class="col-md-4">
            <label for="inputZip" class="form-label">
              Zip
            </label>
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              type="text"
              class="form-control"
              id="inputZip"
            />
          </div>

          <div class="col-md-2">
            <label for="SquareFeet" class="form-label">
              Square Feet
            </label>
            <input
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
              type="text"
              class="form-control"
              id="SquareFeet"
            />
          </div>

          <div class="col-md-3">
            <label for="inputZip" class="form-label">
              Number Of Rooms
            </label>
            <input
              value={numberOfRooms}
              onChange={(e) => setNumberOfRooms(e.target.value)}
              type="text"
              class="form-control"
              id="inputZip"
            />
          </div>

          <div class="col-md-4">
            <label for="inputZip" class="form-label">
              Number Of Bathrooms
            </label>
            <input
              value={numberOfBathRooms}
              onChange={(e) => setNumberOfBathRooms(e.target.value)}
              type="text"
              class="form-control"
              id="inputZip"
            />
          </div>

          <div class="col-md-3">
            <label for="rentAmount" class="form-label">
              Rent Amount
            </label>
            <input
              value={rentAmount}
              onChange={(e) => setRentAmount(e.target.value)}
              type="text"
              class="form-control"
              id="rentAmount"
            />
          </div>
          <div class="col-md-4">
            <label for="propertyType" class="form-label">
              Property Type
            </label>
            <select
              value={isRented}
              onChange={(e) => setIsRented(e.target.value)}
              id="propertyType"
              class="form-select"
            >
              <option selected>Choose...</option>
              <option>House for Rent</option>
              <option>House for Sale</option>
            </select>
          </div>

          <div class="col-md-4">
            <label for="rentedDate" class="form-label">
              Rented Date
            </label>
            <input
              value={rentedDate}
              onChange={(e) => setRentedDate(e.target.value)}
              type="text"
              class="form-control"
              id="rentedDate"
              placeholder="dd/mm/year"
            />
          </div>

          <div class="col-md-4">
            <label for="homeType" class="form-label">
              Home Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              id="homeType"
              class="form-select"
            >
              <option selected>Choose...</option>
              <option>House</option>
              <option>Trailer</option>
            </select>
          </div>

          <div class="">
            <div class="col-mb-3 form-check 50: 50%">
              <input
                value={homeType}
                onChange={(e) => setHomeType(e.target.value)}
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="isRented">
                Is Rented
              </label>
            </div>

            <div class="col-mb-3 form-check">
              <input
                value={isForSale}
                onChange={(e) => setIsForSale(e.target.value)}
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="isForSale">
                Is For Sale{" "}
              </label>
            </div>
          </div>
          
           <div class="col text-center">
                <img
                  src={ property && property.images.length > 0 ? property.images[0].imgUrl : "" }
                  class="img-thumbnail"
                  width="400"
                  height="400"
                  alt="property image"
                ></img>
            </div>
           <div class="mb-3">
            <label for="formFile" class="form-label">
              Insert pictures
            </label>
            <input
              onChange={onFileUploadChange}
              class="form-control"
              type="file"
              id="formFile"
            />
          </div>

          <div className="text-center">
            <div className="mb-3 ">
              <button onClick={Update} type="submit" class="btn btn-primary">
                Update
              </button>
            </div>

            <Link to={"/home"} type="button" class="btn btn-outline-secondary">
              Back To Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProperty;
