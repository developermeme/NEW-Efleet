import React, { useState } from "react";
import usePayment from "./usePayment";
import UpdatePaymentModel from "./UpdatePaymentModel";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";

import "./Style.scss";
import { IRiderPayments } from "../../../redux/slice/payment-slice/Types";

// import useRiders from "../../riders/useRiders";

export const PaymentDetails = () => {
  const { loader, error, payments, updatePaymenttoggleModal } = usePayment();
  // const { ridersList } = useRiders();

  let PaymentHeader = [
    "Rider ID",
    "Name",
    "Last Paid Amount",
    "Last Paid Date",
    "Bal Amount",
    "",
  ];

  const [openPaymentmodal, setOpenPaymentmodal] = useState(false);

  const togglePaymentModal = () => {
    setOpenPaymentmodal(!openPaymentmodal);
  };

  if (loader) {
    return loader;
  }

  if (error) {
    return error;
  }

  const handlePageredirect = (payment: IRiderPayments, e: any) => {
    // const selectedRider = ridersList?.find(
    //   (rider: any) => rider.userId === payment.riderId
    // );
    // history.push("/Riders");
    // fetchRidersDetails(selectedRider as any);
  };

  return (
    <React.Fragment>
      <div className="payment-table  u-h6">
        <table>
          <thead>
            <tr>
              {PaymentHeader.map((head: string) => (
                <th key={head}>
                  <label>{head}</label>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {payments?.map((payment: IRiderPayments) => {
              return (
                <tr
                  className="tableBody"
                  key={payment.rpid}
                  onClick={(e) => handlePageredirect(payment, e)}
                >
                  <td data-label="Rider ID">{payment.riderId}</td>
                  <td data-label="Name">{payment.name}</td>
                  <td data-label="Last Paid Amount">{payment.amountpaid}</td>
                  <td data-label="Last Paid Date">{payment.lastpaid}</td>
                  <td data-label="Bal Amount">
                    {payment.pending || Math.round(0)}
                  </td>

                  <td>
                    <TextButton
                      className="btn-add"
                      isprimary={true}
                      onClick={() =>
                        updatePaymenttoggleModal(payment, togglePaymentModal)
                      }
                      items="update"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <UpdatePaymentModel show={openPaymentmodal} onHide={togglePaymentModal} />
    </React.Fragment>
  );
};
