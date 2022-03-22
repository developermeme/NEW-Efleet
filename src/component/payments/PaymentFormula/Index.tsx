import React from "react";
import { DeleteIcon } from "../../../asset/Icons/Icons";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import usePayment from "../paymentDetails/usePayment";
import usePaymentformula from "./usePaymentformula";

export default function PaymentFormula() {
  const { deletePaymentformula } = usePaymentformula();
  const { paymentFormula } = usePayment();

  let PaymentFormulaheaders = ["TYPE", "COST PER KG", "COST PER KM", ""];

  return (
    <React.Fragment>
      <div className="payment-table  u-h6">
        <table>
          <thead>
            <tr>
              {PaymentFormulaheaders.map((head: string) => (
                <th key={head}>
                  <label>{head}</label>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paymentFormula?.map((Pformula: any) => {
              return (
                <tr className="tableBody" key={Pformula.fid}>
                  <td data-label="TYPE">{Pformula.type}</td>
                  <td data-label="COST PER KG">{Pformula.weight}</td>
                  <td data-label="COST PER KM">{Pformula.distance}</td>

                  <td>
                    <div className="button-wrapper">
                      <TextButton
                        items={<DeleteIcon />}
                        onClick={() => deletePaymentformula(Pformula.fid)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
