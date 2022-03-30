import { useEffect } from "react";
import useRiders from "../../useRiders";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import * as XLSX from "xlsx";

export const Transaction = () => {
  let TranscationHeaders = [
    "RiderId",
    "Name",
    "amountpaid",
    "lastpaid",
    "Pending",
  ];

  const { transactionDetails, fetchTransactionDetail } = useRiders();

  useEffect(() => {
    fetchTransactionDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ExcelSheet = (transactionDetails: any) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(transactionDetails);
    XLSX.utils.book_append_sheet(wb, ws, `${transactionDetails[0].name}sheet`);
    XLSX.writeFile(wb, `${transactionDetails[0].name}.xlsx`);
  };

  return (
    <>
      <div className="payment-table  u-h6">
        <table id="riders-payment-transaction">
          <thead>
            <tr>
              {TranscationHeaders.map((head: string) => (
                <th key={head}>
                  <label>{head}</label>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transactionDetails?.map((paid: any, index: any) => {
              return (
                <>
                  <tr className="tableBody" key={index}>
                    <td data-label="RiderId">{paid.riderId} </td>
                    <td data-label="Name">{paid.name}</td>
                    <td data-label="Pending">{paid.amountpaid || "N/A"}</td>
                    <td data-label="lastpaid">{paid.lastpaid || "N/A"}</td>
                    <td data-label="amountpaid">
                      {paid.pending || Math.round(0)}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <div className="button-wrapper">
        <TextButton
          onClick={() => ExcelSheet(transactionDetails)}
          items={<>Export Report</>}
          id="add-zone"
        />
      </div>
    </>
  );
};
