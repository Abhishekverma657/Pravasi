import * as XLSX from "xlsx";

export function exportPravasiToExcel(list = []) {
  if (!list.length) return;

  const data = list.map((p, index) => ({
    "S.No": index + 1,
    "Public ID": p.publicId,
    Name: p.name,
    Occupation: p.occupation || "-",
    "Blood Group": p.bloodGroup || "-",
    "Current City": p.currentCity || "-",
    Phone: p.phone || "-",
    Verified: p.isVerified ? "Yes" : "No",
    "Joined Date": p.joinedDate
      ? new Date(p.joinedDate).toLocaleDateString()
      : "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Pravasi List");

  XLSX.writeFile(workbook, "pravasi_list.xlsx");
}
