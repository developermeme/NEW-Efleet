import React, { useEffect, useState } from "react";
import "./TaskView.scss";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import useRiders from "../../useRiders";

import Modal from "../../../../ui-kit/modal/modal";

import { DataPicker } from "../../../packages/ReceivedPackages/Data-Picker/DataPicker";
import { ITaskDetails } from "../../../../redux/slice/riders-slice/Types";

export const TaskView = () => {
  const {
    fetchDeliveryDetailByDate,
    fetchDeliveryDetail,
    selectedRider,
    taskDetails,
  } = useRiders();

  const [selectedDate, setSelectedDate] = useState(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    fetchDeliveryDetail(selectedRider.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHeaders = [
    "Order Number",
    "Item Name",
    "Date",
    "Weight",
    "Address",
    "Delivery Status",
  ];

  const handleGetData = (date: any) => {
    if (date) {
      setSelectedDate(date);
      fetchDeliveryDetailByDate(selectedRider.userId, date);
      toggleModal();
    }
  };

  const getDetails = (details: ITaskDetails[]) => {
    const statusOrder = ["pending", "delivered"];
    let orderedList = [...details] || [];
    orderedList = orderedList.sort(function (a, b) {
      return (
        statusOrder.indexOf(a.deliverystatus) -
        statusOrder.indexOf(b.deliverystatus)
      );
    });
    return orderedList;
  };

  let tableComponent;

  if (taskDetails && taskDetails?.length) {
    tableComponent = (
      <table>
        <thead>
          <tr>
            {tableHeaders.map((item: string) => (
              <th key={item}>
                <label>{item}</label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getDetails(taskDetails).map((item: ITaskDetails) => {
            return (
              <tr key={item.name}>
                <td data-label="Order Number">{item.orderNumber}</td>
                <td data-label="Item Name">{item.itemName}</td>
                <td data-label="Date">{item.date}</td>
                <td data-label="Weight">{item.weight}</td>
                <td data-label="Address">
                  {item.suburb} <br />
                  {item.city} <br />
                  {item.building} <br />
                  {item.street} <br />
                  {item.state}, {item.country}
                </td>
                <td data-label="Status">
                  <button className={`btn-status ${item.deliverystatus}`}>
                    {item.deliverystatus}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    tableComponent = <h5 className="empty-data">No Data Available</h5>;
  }

  return (
    <div className="rider-task-wrapper">
      <div className="task-topNav">
        {selectedDate && <span>Selected Date : {selectedDate} </span>}
        <TextButton
          isprimary={true}
          items="Change Date"
          onClick={toggleModal}
        />
      </div>
      {tableComponent}
      <Modal onClose={toggleModal} visibilty={openModal}>
        <DataPicker handleGetData={handleGetData} />
      </Modal>
    </div>
  );
};
