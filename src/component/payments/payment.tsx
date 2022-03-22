import { useEffect, useState } from "react";
import clsx from "clsx";
import { AddIcon } from "../../asset/Icons/Icons";
import { PaymentDetails } from "./paymentDetails";
import usePayment from "./paymentDetails/usePayment";
import usePaymentformula from "./PaymentFormula/usePaymentformula";
import PaymentFormula from "./PaymentFormula/Index";
import { TextButton } from "../../ui-kit/TextButton/TextButton.view";
import PaymentFormulaModel from "./PaymentFormula/PaymentFormulaModel";
import useRiders from "../riders/useRiders";

export default function PaymentView() {
  const tabs = ["Payment", "PaymentFormula"];
  const [activeTab, setActiveTab] = useState("Payment");
  const { loader, error } = usePaymentformula();
  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [updateformulaModelShow, setupdateformulaModelShow] = useState(false);

  const updateFormulaToggleModel = () => {
    console.log("called");
    setupdateformulaModelShow(!updateformulaModelShow);
  };
  const { getriderPayments } = usePayment();
  const { getPaymentformula } = usePaymentformula();

  const { fetchRider } = useRiders();

  useEffect(() => {
    getriderPayments();
    getPaymentformula();

    // to get rider details
    fetchRider();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return loader;
  }

  if (error) {
    return error;
  }
  return (
    <>
      <div className="app-page-title">
        <ul className="nav-line nav">
          {tabs.map((tab) => (
            <li
              key={tab}
              id={tab}
              className={clsx("nav-link", { active: activeTab === tab })}
              onClick={() => {
                toggle(tab);
              }}
            >
              {tab}
              <div className="divider"></div>
            </li>
          ))}
        </ul>
        {activeTab === tabs[0] ? null : (
          <>
            <div className="button-wrapper">
              <TextButton
                onClick={() => updateFormulaToggleModel()}
                items={<AddIcon />}
                id="add-zone"
              />
            </div>
          </>
        )}
      </div>
      <>
        {activeTab === tabs[0] ? <PaymentDetails /> : <PaymentFormula />}
        <PaymentFormulaModel
          show={updateformulaModelShow}
          onHide={updateFormulaToggleModel}
        />
      </>
    </>
  );
}
