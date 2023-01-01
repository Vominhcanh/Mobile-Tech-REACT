import logo from "../assets/images/LOGO-MAIN.png";
// import Moment from "react-moment";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Font,
  Image,
} from "@react-pdf/renderer";
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontFamily: "Roboto",
  },
  section: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: 500,
    marginTop: 20,
  },
  header: {
    fontSize: 15,
    lineHeight: 1.5,
    margin: "30px 50px",
  },
});
const PDFfile = (PdfFiles) => {
  var moment = require("moment");
  console.log(PdfFiles.PdfFiles?.Dowloads);
  console.log(PdfFiles.PdfFiles?.Dowloads?.product[0]?.quantity);
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Image style={{ width: "70px" }} src={logo}></Image>
            <Text style={{ marginTop: "15px" }}>Hóa đơn mua hàng</Text>
          </View>
          <View style={styles.header}>
            <Text>
              Mã hóa đơn:&nbsp;
              {PdfFiles.PdfFiles?.Dowloads?.boughtBy}
            </Text>
            <Text>
              Tên khách hàng:&nbsp;
              {PdfFiles.PdfFiles?.Dowloads?.name}
            </Text>
            <Text>
              Sdt:&nbsp;
              {PdfFiles.PdfFiles?.Dowloads?.sdt}
            </Text>
            <Text>
              Địa chỉ:&nbsp;
              {PdfFiles.PdfFiles?.Dowloads?.address}
            </Text>
            <Text>
              Trạng thái:&nbsp;
              {PdfFiles.PdfFiles?.Dowloads?.orderStatus}
            </Text>
            <Text>
              Trạng thái thanh toán:&nbsp;
              {PdfFiles.PdfFiles?.Dowloads?.payStatus}
            </Text>
            <Text>
              Người giao hàng:&nbsp;
              {PdfFiles.PdfFiles?.Dowloads?.shipBy?.name}
            </Text>
            <Text>
              Ngày đặt hàng:&nbsp;
              {moment(PdfFiles.PdfFiles?.Dowloads?.createdAt).format(
                "DD/MM/YYYY"
              )}
            </Text>
            {PdfFiles.PdfFiles?.Dowloads?.orderStatus == "Đã giao hàng" && (
              <Text>
                Ngày giao hàng:&nbsp;
                {moment(PdfFiles.PdfFiles?.Dowloads?.updatedAt).format(
                  "DD/MM/YYYY"
                )}
              </Text>
            )}
            <View>
              <Text> Danh sách sản phẩm mua</Text>
              {PdfFiles.PdfFiles?.Dowloads?.product.map((pr) => (
                <Text
                  style={{
                    flexDirection: "column",
                    border: "1px solid #000",
                    fontSize: "12px",
                    padding: "5px",
                  }}
                >
                  <Text>Tên :&nbsp;{pr?.product?.name}</Text>
                  &nbsp;&nbsp;&nbsp;&brvbar;&nbsp;&nbsp;&nbsp;
                  <Text>
                    Giá :&nbsp;
                    {String(pr?.product?.price).replace(
                      /(.)(?=(\d{3})+$)/g,
                      "$1."
                    )}{" "}
                    vnđ
                  </Text>{" "}
                  &nbsp;&nbsp;&nbsp;&brvbar;&nbsp;&nbsp;&nbsp;
                  <Text>
                    Số lượng :&nbsp;
                    {pr?.quantity}
                  </Text>
                </Text>
              ))}
            </View>
            <Text>
              Tổng tiền:&nbsp;&nbsp;
              {String(PdfFiles.PdfFiles?.Dowloads?.total).replace(
                /(.)(?=(\d{3})+$)/g,
                "$1."
              )}
              vnđ
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default PDFfile;
