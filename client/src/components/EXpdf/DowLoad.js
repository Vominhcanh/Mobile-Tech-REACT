import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import PDFfile from "./PDFfile";
import "../EXpdf/PDFstyles.scss";
const DowLoad = (Dowloads) => {
  return (
    <div>
      <PDFDownloadLink
        document={<PDFfile PdfFiles={Dowloads} />}
        fileName="Mobile Tech"
      >
        <button className="button-dow">Xuất hóa đơn</button>
      </PDFDownloadLink>
    </div>
  );
};

export default DowLoad;
