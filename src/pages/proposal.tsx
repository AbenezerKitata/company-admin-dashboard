import React from "react";
import Input from "./components/form-components/TextInput";
import TextArea from "./components/form-components/TextAreaInput";
import Checkbox from "./components/form-components/CheckboxInput";
import DateInput from "./components/form-components/DateInput";
import Label from "./components/form-components/Label";
import InfoButton from "./components/form-components/InfoButton";
import RadioGroup from "./components/form-components/RadioInput";
const CreateForm: React.FC = () => {
  const [eventName, setEventName] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [pickupDate, setPickupDate] = React.useState("");
  const [nofppl, setNofppl] = React.useState("");
  const [offeredServices, setOfferedServices] = React.useState<string[]>([]);
  const [transportNotes, setTransportNotes] = React.useState("");
  const [bookingType, setBookingType] = React.useState("");

  const handleEventName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };
  const handleNoOfPpl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNofppl(event.target.value);
  };
  const handleOrganization = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization(event.target.value);
  };
  const handleBookingTypeChange = (value: string) => {
    setBookingType(value);
  };

  const handleEventDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventDate(event.target.value);
  };
  const handlePickupDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickupDate(event.target.value);
  };
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTransportNotes(event.target.value);
  };
  const radioOptions = [
    { value: "partner_collects_voucher", label: "Partner Collects / Voucher" },
    { value: "deposit", label: "Deposit up Front    " },
    { value: "sb_collects", label: "Sunbuggy Collects up Front" },
    { value: "eticket", label: "E-ticket" },
    { value: "other", label: "Other" },
    { value: "not_commission", label: "Not a Commission Booking" },
  ];

  const handleCheckboxChange = (values: string[]) => {
    setOfferedServices(values);
  };

  const checkboxOptions = {
    "Mini Baja Time Trial": "Mini Baja Time Trial",
    "VIP - Use New Helmets": "VIP - Use New Helmets",
    "VIP - Keep New Helmets": "VIP - Keep New Helmets",
    "VIP Shuttles": "VIP Shuttles",
    "Mini Baja Chase": "Mini Baja Chase",
    "Night Chase After Dark": "Night Chase After Dark",
    "Presidential Limo": "Presidential Limo",
    "30 Min Chase Singles": "30 Min Chase Singles",
    Bandanas: "Bandanas",
    Gloves: "Gloves",
  };
  return (
    <form>
      <div className="flex items-center gap-2">
        <InfoButton infoText="Name of event" />
        <Input
          label="Event Name"
          onChange={handleEventName}
          className=" border border-slate-800 "
        />
      </div>
      <div className="flex items-center gap-2">
        <InfoButton infoText="Name of event" />
        <Input
          label="Organization "
          onChange={handleOrganization}
          className=" border border-slate-800 "
        />{" "}
      </div>

      <div className="flex items-center gap-2">
        <InfoButton infoText="Name of event" />
        <TextArea
          onChange={handleTextAreaChange}
          label="Transport By:"
          className=" border border-slate-800 "
        />{" "}
      </div>

      <div className="flex items-center gap-2">
        <InfoButton infoText="Name of event" />
        <DateInput
          label="Event Date"
          onChange={handleEventDate}
          value={eventDate}
        />{" "}
      </div>

      <div className="flex items-center gap-2">
        <InfoButton infoText="Name of event" />
        <DateInput
          label="Pickup Date "
          onChange={handlePickupDate}
          value={pickupDate}
        />{" "}
      </div>

      <div className="flex items-center gap-2">
        <InfoButton infoText="Name of event" />
        <Input
          label="Number of  people "
          onChange={handleNoOfPpl}
          type="number"
        />{" "}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <InfoButton infoText="Name of event" />

          <Label label="Offered Services" />
        </div>
        <div className="flex flex-col justify-center">
          {Object.keys(checkboxOptions).map((key) => (
            <Checkbox
              key={key}
              label={key}
              value={checkboxOptions}
              selectedValues={offeredServices}
              onChange={handleCheckboxChange}
              className="my-checkbox"
            />
          ))}{" "}
        </div>
        <div className="flex flex-col justify-center">
          <RadioGroup
            label="Booking Type:"
            options={radioOptions}
            onChange={handleBookingTypeChange}
            selectedValue={bookingType}
          />
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateForm;
