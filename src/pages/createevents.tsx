import React from "react";
import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
function Test() {
  const [formData, setFormData] = useState({
    eventName: "",
    organizationName: "",
    eventDate: "",
    pickupDate: "",
    noOfPeople: 0,
    service: "",
    add_shuttle: "",
    transport_by: "",
    hotel: "",
    driver_notes: "",
    addmeal: "",
    meal_by: "",
    food_notes: "",
    // Add other form fields
  });
  return (
    <div className="container">
      <h1>Create Event</h1>
      <form action="" method="post">
        <div className="form-group">
          <label htmlFor="event-name">Event Name:</label>
          <input type="text" id="event-name" name="event-name" required />
        </div>
        <div className="form-group">
          <label htmlFor="organization-name">Organization:</label>
          <input
            type="text"
            id="organization-name"
            name="organization-name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-date">Event Date:</label>
          <input type="date" id="event-date" name="event-date" required />
        </div>
        <div className="form-group">
          <label htmlFor="pickup-date">Pickup Date:</label>
          <input
            type="datetime-local"
            id="pickup-date"
            name="pickup-date"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="no_of_ppl">Number of People</label>
          <input type="number" id="no_of_ppl" name="no_of_ppl" required />
        </div>

        <hr className="my-4" />

        <div className="form-group-radio">
          <h3>Offered Services</h3>
          <div className="services-list">
            <label>
              <input
                type="checkbox"
                name="service"
                value="mini-baja-time-trial"
              />{" "}
              Mini Baja Time Trial
            </label>
            <label>
              <input type="checkbox" name="service" value="vip-new-helmets" />{" "}
              VIP - Use New Helmets
            </label>
            <label>
              <input type="checkbox" name="service" value="vip-keep-helmets" />{" "}
              VIP - Keep New Helmets
            </label>
            <label>
              <input type="checkbox" name="service" value="vip-shuttles" /> VIP
              Shuttles
            </label>
            <label>
              <input type="checkbox" name="service" value="mini-baja-chase" />{" "}
              Mini Baja Chase
            </label>
            <label>
              <input type="checkbox" name="service" value="night-chase" /> Night
              Chase After Dark
            </label>
            <label>
              <input type="checkbox" name="service" value="presidential-limo" />{" "}
              Presidential Limo
            </label>
            <label>
              <input
                type="checkbox"
                name="service"
                value="30-min-chase-singles"
              />{" "}
              30 Min Chase Singles
            </label>
            <label>
              <input type="checkbox" name="service" value="bandanas" /> Bandanas
            </label>
            <label>
              <input type="checkbox" name="service" value="gloves" /> Gloves
            </label>
          </div>
        </div>

        <hr className="my-4" />
        <div className="transportation">
          <h3>Transportation</h3>
          <label>
            <input type="checkbox" name="add_shuttle" id="add_shuttle" /> Add
            Shuttle
          </label>
          <div className="form-group">
            <label htmlFor="transpost_by">Transport by:</label>
            <input type="text" id="transport_by" name="transport_by" />
          </div>
          <label htmlFor="pickup">
            Choose a pickup location:
            <select name="pickup" id="pickup">
              <option value="hotel">hotel</option>
            </select>
          </label>
          <div className="form-group">
            <label htmlFor="driver">Transport notes:</label>
            <textarea id="driver_notes"> </textarea>
          </div>
        </div>

        <hr className="my-4" />
        <div className="food">
          <h3>Food Services</h3>
          <label>
            <input type="checkbox" name="addmeal" /> Add a meal
          </label>
          <div className="form-group">
            <label htmlFor="driver">Meal provided by:</label>
            <input type="text" id="meal_by" name="meal_by" />
          </div>

          <div className="form-group">
            <label htmlFor="food">Food service notes:</label>
            <textarea id="food_notes"> </textarea>
          </div>
        </div>

        <hr className="my-4" />
        <div className="extras">
          <h3>Extra Services</h3>
          <label>
            <input type="checkbox" name="shirt" value="shuttle" /> Add Logo
            T-Shirts
          </label>
          <label>
            <input type="checkbox" name="shirt" value="shuttle" /> Add Logos on
            Buggy
          </label>
          <label htmlFor="custom">
            Amount of Custom Bugggys:
            <select name="custom" id="custom">
              <option value="custom">None</option>
              <option value="custom">1</option>
              <option value="custom">2</option>
              <option value="custom">3</option>
              <option value="custom">4</option>
            </select>
          </label>
          <div className="form-group">
            <label htmlFor="service">Extra service notes:</label>
            <textarea id="service-notes"> </textarea>
          </div>
        </div>

        <hr className="my-4" />
        <h3>Price Information</h3>
        <div className="form-group">
          <label htmlFor="price">Retail Price</label>
          <input type="number" id="price" name="price" required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price Per Person</label>
          <input type="number" id="price" name="price" required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Discount Price</label>
          <input type="number" id="price" name="price" required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price Per Person</label>
          <input type="number" id="price" name="price" required />
        </div>
        <hr className="my-4" />

        <div className="form-group-radio">
          <label>Booking Type:</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="booking-type"
                value="partner-collects"
              />
              Partner Collects / Voucher
            </label>
            <label>
              <input type="radio" name="booking-type" value="deposit-upfront" />
              Deposit up Front
            </label>
            <label>
              <input
                type="radio"
                name="booking-type"
                value="sunbuggy-upfront"
              />
              Sunbuggy Collects up Front
            </label>
            <label>
              <input type="radio" name="booking-type" value="e-ticket" />
              E-ticket
            </label>
            <label>
              <input type="radio" name="booking-type" value="other" />
              Other
            </label>
            <label>
              <input type="radio" name="booking-type" value="not-commission" />
              Not a Commission Booking
            </label>
          </div>
        </div>
        <hr />

        <div className="form-group">
          <input type="submit" value="Create Event" />
        </div>
      </form>
    </div>
  );
}

export default Test;
