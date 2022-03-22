import { useState, Fragment } from "react";
import { ChartView } from "./earnings-view";
import { TaskView } from "./task-view/TaskView";
import { UserView } from "./user-view/UserView";
import useRiders from "../useRiders";
import "./Style.scss";
import { Transaction } from "./transaction-history";

const tabs = [
  "Rider Details",
  "Task Details",
  "Earnings",
  "Transtaction history",
];

export const RiderDetails = () => {
  const [value, setValue] = useState(0);

  const { handleGoBack } = useRiders();

  return (
    <div className="rider-detail-tabs">
      <button className="prev-btn" onClick={handleGoBack}></button>
      <main>
        {tabs.map((item: string, index: number) => {
          return (
            <Fragment key={index}>
              <input
                id={`tab${index + 1}`}
                type="radio"
                name="tabs"
                className="tab-input"
                onClick={() => setValue(index)}
                checked={index === value ? true : false}
                readOnly
              />
              <label htmlFor={`tab${index + 1}`} className="tab-label">
                {item}
              </label>
            </Fragment>
          );
        })}

        <section id="content1" className="tab-content">
          <UserView />
        </section>

        <section id="content2" className="tab-content">
          <TaskView />
        </section>
        <section id="content3" className="tab-content">
          <ChartView />
        </section>

        <section id="content4" className="tab-content">
          <Transaction />
        </section>
      </main>
    </div>
  );
};
