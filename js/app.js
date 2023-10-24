const page = document.getElementById("page1");
const result = document.getElementById("page2");
let volumeDesign, width, diameter, p1, p2, p3, p4, st, mh, pi;
var machineName;

function showPage(pageId) {
    const pages = document.querySelectorAll(".page");
    pages.forEach((page) => {
    if (page.id === pageId) {
      page.style.display = "block";
    } else {
      page.style.display = "none";
    }
  });
}

async function processValue() {
  const loadingAnimation = document.getElementById("loadingAnimation");
  loadingAnimation.style.display = "flex";
  // this.classList.add("hidden");
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    loadingAnimation.style.display = "none";
    volume = parseInt(document.getElementById("volumeSelect").value);
  
    if (volume === 1) {
      machineName = "BF-01";
      volumeDesign = (volume * 1.15).toFixed(2);
      width = 1.3;
      mh = 30;
      pi = 1;
    } else if (volume === 2) {
      machineName = "BF-02";
      volumeDesign = (volume * 2.3).toFixed(2);
      width = 1.7;
      mh = 30;
      pi = 1;
    } else if (volume === 3) {
      machineName = "BF-03";
      volumeDesign = (volume * 3.45).toFixed(2);
      width = 2.2;
      mh = 30;
      pi = 1.5;
      console.log(machineName);
    } else if (volume === 4) {
      machineName = "BF-04";
      volumeDesign = (volume * 4.6).toFixed(2);
      width = 2.6;
      mh = 30;
      pi = 1.5;
    } else if (volume === 5) {
      machineName = "BF-05";
      volumeDesign = (volume * 5.75).toFixed(2);
      width = 2.9;
      mh = 30;
      pi = 2;
    } else if (volume === 6) {
      machineName = "BF-06";
      volumeDesign = (volume * 6.9).toFixed(2);
      width = 3.5;
      mh = 60;
      pi = 2;
    } else if (volume === 7) {
      machineName = "BF-07";
      volumeDesign = (volume * 8.05).toFixed(2);
      width = 3.6;
      mh = 60;
      pi = 2.5;
    } else if (volume === 8) {
      machineName = "BF-08";
      volumeDesign = (volume * 9.2).toFixed(2);
      width = 4;
      mh = 60;
      pi = 2.5;
    } else if (volume === 9) {
      machineName = "BF-09";
      volumeDesign = (volume * 10.35).toFixed(2);
      width = 4.4;
      mh = 60;
      pi = 3;
    } else if (volume === 10) {
      machineName = "BF-10";
      volumeDesign = (volume * 11.5).toFixed(2);
      width = 4.6;
      mh = 60;
      pi = 3;
    }

    diameter = Math.sqrt((4 * volumeDesign) / (3.14 * width)).toFixed(2);
    p1 = (0.1 * width).toFixed(2);
    p2 = (0.4 * width).toFixed(2);
    p3 = (0.4 * width).toFixed(2);
    p4 = (0.1 * width).toFixed(2);
    st = (0.8 * p2).toFixed(4);

    document.getElementById("machineName").textContent = machineName;
    document.getElementById("widthValue").textContent = width;
    document.getElementById("diameterValue").textContent = diameter;
    document.getElementById("stValue").textContent = st;

    // document.getElementById("diameterSpan").textContent = diameter;
    // document.getElementById("p1Span").textContent = p1;
    // document.getElementById("p2Span").textContent = p2;
    // document.getElementById("p3Span").textContent = p3;
    // document.getElementById("p4Span").textContent = p4;
    // document.getElementById("stSpan").textContent = st;
    // document.getElementById("mhSpan").textContent = mh;
    // document.getElementById("piSpan").textContent = pi;
    page1.classList.add("hidden");
    result.classList.remove("hidden");

    // showPage("page2");
  } catch (error) {
    console.log("Page Error", error);
  } finally {
        // Hide the loading animation and show the button again
        loadingAnimation.classList.add("hidden");
        // this.classList.remove("hidden");
  }
}

// function gotoPage1() {
//   showPage("page1");
// }
// function gotoPage3() {
//   showPage("page3");
// }
function resetForm() {
  // Clear the input fields
  document.getElementById("volumeSelect").value = "1";

  // Hide the result container and show the generate button
  page1.classList.remove("hidden");
  result.classList.add("hidden");
  document.getElementById("processValue").classList.remove("hidden");
}

function generateBlueprintJsPDF() {

  // Create a new instance of jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'pt', 'a4');

  // Load the machine image
  const machineImg = new Image();
  machineImg.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = machineImg.height;
    canvas.height = machineImg.width;
    const ctx = canvas.getContext("2d");

    // Rotate the image 90 degrees counterclockwise
    // ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.rotate(-90 * (Math.PI / 180));
    // ctx.drawImage(machineImg, -machineImg.width / 2, -machineImg.height / 2);

    // Convert the rotated image on the canvas to a data URL
    // const rotatedImageDataURL = canvas.toDataURL("image/jpeg");

    // Add the rotated machine image to the first page of the PDF
    // doc.addImage(rotatedImageDataURL, 'JPEG', 20, 20, 555.276, 801.890);
    doc.text(40, 20, `Detail Spesifikasi Mesin IPAL`);
    doc.text(40, 40, `Jenis Mesin: ${machineName}`);
    // Add the machine image to the PDF
    doc.addImage(machineImg, 'JPEG', 20, 180.000,  555.276, 401.890, null, 180); // x, y, width, height
    // doc.setTextColor("#ffffff");
    // Add the calculated values on top of the image
    doc.setFont('helvetica');
    doc.setFontSize(10);
    doc.text(43, 370, `D: ${diameter}`, null);

    doc.text(90.000, 550.890, `p1: ${p1}`, null);

    doc.text(224.000, 550.890, `p2: ${p2}`, null);

    doc.text(340.000, 550.890, `p3: ${p3}`, null);

    doc.text(451.000, 550.890, `p4: ${p4}`, null);

    doc.text(290.000, 520.890, `ST: ${st}`, null);
    doc.text(451, 190, `MH: ${mh}`, null);
    doc.text(20, 225, `Pi: ${pi}`, null);
    // doc.setTextColor("#ffffff");
    // doc.text(20, 230, `Diameter: ${diameter}`, null, 90);
    // doc.text(530.000, 650.890, `p1: ${p1}`, null, 90);
    // doc.text(530.000, 530.890, `p2: ${p2}`, null, 90);
    // doc.text(530.000, 330.890, `p3: ${p3}`, null, 90);
    // doc.text(530.000, 230.890, `p4: ${p4}`, null, 90);
    // doc.text(510.000, 530.890, `ST: ${st}`, null, 90);
    // doc.text(160.000, 680.890, `MH: ${mh}`, null, 90);
    // doc.text(180.000, 90.890, `Pi: ${pi}`, null, 90);

    const frontImg = new Image();
    const backImg = new Image();

    // Save the PDF with a specified filename
    doc.save('machine_blueprint.pdf');
  };
  machineImg.src = "img/gambar_desain_aplikasi.png"; // Replace with the actual image URL
}

// function generateBlueprintJsPDF() {

//   // Create a new instance of jsPDF
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF('p', 'pt', 'a4');

//   // Load the machine image
//   const machineImg = new Image();
//   machineImg.onload = function () {
//     const canvas = document.createElement("canvas");
//     canvas.width = machineImg.height;
//     canvas.height = machineImg.width;
//     const ctx = canvas.getContext("2d");

//     // Rotate the image 90 degrees counterclockwise
//     // ctx.translate(canvas.width / 2, canvas.height / 2);
//     // ctx.rotate(-90 * (Math.PI / 180));
//     // ctx.drawImage(machineImg, -machineImg.width / 2, -machineImg.height / 2);

//     // Convert the rotated image on the canvas to a data URL
//     // const rotatedImageDataURL = canvas.toDataURL("image/jpeg");

//     // Add the rotated machine image to the first page of the PDF
//     // doc.addImage(rotatedImageDataURL, 'JPEG', 20, 20, 555.276, 801.890);
//     doc.text(20, 20, `Detail Spesifikasi Mesin IPAL`);
//     // Add the machine image to the PDF
//     doc.addImage(machineImg, 'JPEG', 20, 180.000,  555.276, 401.890, null, 180); // x, y, width, height
//     // doc.setTextColor("#ffffff");
//     // Add the calculated values on top of the image
//     doc.setFont('helvetica');
//     doc.setFontSize(10);
//     doc.text(43, 400, `D: ${diameter}`, null);
//     doc.text(57.500, 589.890, `|`, null);
//     doc.text(58.500, 585.000, `_`, null);
//     doc.text(64.000, 585.000, `_`, null);
//     doc.text(69.000, 585.000, `_`, null);
//     doc.text(74.000, 585.000, `_`, null);
//     doc.text(79.000, 585.000, `_`, null);
//     doc.text(84.000, 585.000, `_`, null);
//     doc.text(89.000, 585.000, `_`, null);
//     doc.text(94.000, 585.000, `_`, null);
//     doc.text(99.000, 585.000, `_`, null);
//     doc.text(108.000, 589.890, `p1: ${p1}`, null);
//     doc.text(146.000, 585.000, `_`, null);
//     doc.text(151.000, 585.000, `_`, null);
//     doc.text(156.000, 585.000, `_`, null);
//     doc.text(161.000, 585.000, `_`, null);
//     doc.text(166.000, 585.000, `_`, null);
//     doc.text(171.000, 585.000, `_`, null);
//     doc.text(176.000, 585.000, `_`, null);
//     doc.text(180.000, 589.890, `|`, null);
    
//     doc.text(184.000, 589.890, `|`, null);
//     doc.text(185.000, 585.000, `_`, null);
//     doc.text(190.000, 585.000, `_`, null);
//     doc.text(195.000, 585.000, `_`, null);
//     doc.text(200.000, 585.000, `_`, null);
//     doc.text(205.000, 585.000, `_`, null);
//     doc.text(210.000, 585.000, `_`, null);
//     doc.text(215.000, 585.000, `_`, null);
//     doc.text(224.000, 589.890, `p2: ${p2}`, null);
//     doc.text(263.000, 585.000, `_`, null);
//     doc.text(268.000, 585.000, `_`, null);
//     doc.text(273.000, 585.000, `_`, null);
//     doc.text(278.000, 585.000, `_`, null);
//     doc.text(283.000, 585.000, `_`, null);
//     doc.text(288.000, 585.000, `_`, null);
//     doc.text(293.000, 585.000, `_`, null);
//     doc.text(297.000, 589.890, `|`, null);

//     doc.text(301.000, 589.890, `|`, null);    
//     doc.text(302.000, 585.000, `_`, null);
//     doc.text(307.000, 585.000, `_`, null);
//     doc.text(312.000, 585.000, `_`, null);
//     doc.text(317.000, 585.000, `_`, null);
//     doc.text(322.000, 585.000, `_`, null);
//     doc.text(327.000, 585.000, `_`, null);
//     doc.text(331.000, 585.000, `_`, null);
//     doc.text(340.000, 589.890, `p3: ${p3}`, null);
//     doc.text(379.000, 585.000, `_`, null);
//     doc.text(384.000, 585.000, `_`, null);
//     doc.text(389.000, 585.000, `_`, null);
//     doc.text(394.000, 585.000, `_`, null);
//     doc.text(399.000, 585.000, `_`, null);
//     doc.text(403.000, 585.000, `_`, null);
//     doc.text(407.000, 589.890, `|`, null);

//     doc.text(411.000, 589.890, `|`, null);
//     doc.text(412.000, 585.000, `_`, null);
//     doc.text(417.000, 585.000, `_`, null);
//     doc.text(422.000, 585.000, `_`, null);
//     doc.text(427.000, 585.000, `_`, null);
//     doc.text(432.000, 585.000, `_`, null);
//     doc.text(437.000, 585.000, `_`, null);
//     doc.text(442.000, 585.000, `_`, null);
//     doc.text(451.000, 589.890, `p4: ${p4}`, null);
//     doc.text(490.000, 585.000, `_`, null);
//     doc.text(495.000, 585.000, `_`, null);
//     doc.text(500.000, 585.000, `_`, null);
//     doc.text(505.000, 585.000, `_`, null);
//     doc.text(510.000, 585.000, `_`, null);
//     doc.text(515.000, 585.000, `_`, null);
//     doc.text(520.000, 585.000, `_`, null);
//     doc.text(525.000, 585.000, `_`, null);
//     doc.text(530.000, 589.890, `|`, null);


//     doc.text(175.000, 550.890, `ST: ${st}`, null);
//     doc.text(118, 280, `MH: ${mh}`, null);
//     doc.text(40, 300, `Pi: ${pi}`, null);
//     // doc.setTextColor("#ffffff");
//     // doc.text(20, 230, `Diameter: ${diameter}`, null, 90);
//     // doc.text(530.000, 650.890, `p1: ${p1}`, null, 90);
//     // doc.text(530.000, 530.890, `p2: ${p2}`, null, 90);
//     // doc.text(530.000, 330.890, `p3: ${p3}`, null, 90);
//     // doc.text(530.000, 230.890, `p4: ${p4}`, null, 90);
//     // doc.text(510.000, 530.890, `ST: ${st}`, null, 90);
//     // doc.text(160.000, 680.890, `MH: ${mh}`, null, 90);
//     // doc.text(180.000, 90.890, `Pi: ${pi}`, null, 90);

//     const frontImg = new Image();
//     const backImg = new Image();

//     frontImg.onload = function () {
//       // Add the front and back images to the second page of the PDF
//       doc.addPage();
//       doc.setTextColor("#000000");
//       doc.text(20, 20, `TAMPAK ATAS`);
//       doc.addImage(frontImg, 'JPEG', 20, 30, 555.276, 380.945); // x, y, width, height
//       doc.text(20, 425.945 , `TAMPAK SAMPING`);
//       doc.addImage(backImg, 'JPEG', 20, 430.945, 555.276, 380.945); // x, y, width, height
      
//       doc.save('machine_blueprint.pdf');
//     };
//       frontImg.src = "img/biofilter-up.jpg"; // Replace with the actual front image URL
//       backImg.src = "img/biofilter-side.jpg";

//     // Save the PDF with a specified filename
    
//   };
//   machineImg.src = "img/ipal-biofilter.png"; // Replace with the actual image URL
// }


// Call the generateBlueprintPDF function when the "Generate Blueprint" button is clicked
document.getElementById("processValue").addEventListener("click", processValue);

// Call the resetForm function when the "Reset" button is clicked
document.getElementById("resetButton").addEventListener("click", resetForm);

// Call the generateBlueprintPDF function when the "Print to PDF" button is clicked
document.getElementById("printToPdfButton").addEventListener("click", generateBlueprintJsPDF);

// async function generateBlueprintPDF() {
//   try {
//     // Create a new PDF document with A4 size (595.276 x 841.890 points)
//     const pdfDoc = await PDFLib.PDFDocument.create();
//     const page = pdfDoc.addPage([595.276, 841.890]);

//     // Add the calculated values to the PDF
//     const volumeDesign = (volume * 1.15).toFixed(2);
//     const width = volume === 1 ? 1.3 : volume === 2 ? 1.7 : 2.2;
//     const diameter = Math.sqrt((4 * volumeDesign) / (3.14 * width)).toFixed(2);
    
//     // Embed the machine image into the PDF and rotate it 90 degrees
//     const imageBytes = await fetch("img/ipal-biofilter.jpg").then((response) => response.arrayBuffer());
//     const machineImageEmbed = await pdfDoc.embedJpg(imageBytes);
//     const { width: imgWidth, height: imgHeight } = machineImageEmbed.scaleToFit(841.890, 595.276); // Fit within A4 size

//     // Adjust the position and size of the image to fit within the rotated A4 page
//     page.drawRectangle({
//       x: 20, // Adjust the position as needed
//       y: 20,
//       z: 0, // Adjust the position as needed
//       width: imgWidth,
//       height: imgHeight,
//       color: PDFLib.rgb(1, 1, 1), // Set a white background for the image
//     });

//     page.drawImage(machineImageEmbed, {
//       x: 20, // Adjust the position as needed
//       y: 20,
//       z: 1, // Adjust the position as needed
//       width: imgWidth,
//       height: imgHeight,
//       rotate: PDFLib.degrees(180), // Rotate the image 90 degrees
//     });
//     page.drawText(`Volume Design: ${volumeDesign}`, { x: 20, y: page.getHeight() - 50, z:2 });
//     page.drawText(`Width: ${width}`, { x: 20, y: page.getHeight() - 70, z:2 });
//     page.drawText(`Diameter: ${diameter}`, { x: 20, y: page.getHeight() - 90, z:2 });

//     // Save the PDF as a Blob
//     const pdfBytes = await pdfDoc.save();

//     // Create a Blob URL for the PDF
//     const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));

//     // Trigger the download of the PDF
//     const a = document.createElement("a");
//     a.href = pdfUrl;
//     a.download = "machine_blueprint.pdf";
//     a.click();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// }

// async function generateBlueprintPDF() {
//   try {
//     // Get the machine width and height from the UI
//     const width = parseInt(document.getElementById("widthInput").value);
//     const height = parseInt(document.getElementById("heightInput").value);

//     // get volume from the UI
//     const volume = parseInt(document.getElementById("volumeInput").value);

//     if (volume == 1) {
//       const volumeDesign = 1.15 * volume;
//     } else if (volume == 2) {
//       const volumeDesign = 2.3 * volume;
//     } else if (volume == 3) {
//       const volumeDesign = 3.45 * volume;
//     } else if (volume == 4) {
//       const volumeDesign = 4.6 * volume;
//     } else if (volume == 5) {
//       const volumeDesign = 5.75 * volume;
//     } else if (volume == 6) {
//       const volumeDesign = 6.9 * volume;
//     } else if (volume == 7) {
//       const volumeDesign = 8.05 * volume;
//     } else if (volume == 8) {
//       const volumeDesign = 9.2 * volume;
//     } else if (volume == 9) {
//       const volumeDesign = 10.35 * volume;
//     } else if (volume == 10) {
//       const volumeDesign = 11.5 * volume;
//     }


//     // Create a new PDF document with A4 size (595.276 x 841.890 points)
//     const pdfDoc = await PDFLib.PDFDocument.create();
//     const page = pdfDoc.addPage([595.276, 841.890]);

//     // Draw the blueprint image on the PDF page, rotating it 90 degrees to the left
//     const imageBytes = await fetch("img/ipal-biofilter.jpg").then((response) => response.arrayBuffer());
//     const blueprintImageEmbed = await pdfDoc.embedJpg(imageBytes);
//     const { width: imgWidth, height: imgHeight } = blueprintImageEmbed.scaleToFit(595.276, 841.890); // Fit within A4 size
//     page.drawImage(blueprintImageEmbed, {
//       x: (595.276 - imgWidth) / 2, // Center horizontally
//       y: (841.890 - imgHeight) / 2, // Center vertically
//       width: imgWidth,
//       height: imgHeight,
//     });

//     // Add text showing the total measurement (length x width)
//     const totalMeasurement = `${width} x ${height}`;
//     page.drawText(totalMeasurement, {
//       x: 20, // X-coordinate of the text
//       y: 821.890, // Y-coordinate of the text (top margin of A4 page)
//       size: 12, // Font size
//       color: PDFLib.rgb(0, 0, 0), // Black color
//     });

//     // Add text showing the length on the left side
//     const textOnLeftSide = `Length: ${width}`;
//     page.drawText(textOnLeftSide, {
//       x: 20, // X-coordinate of the text on the left side
//       y: (841.890 - imgHeight) / 2 + imgHeight / 2, // Center vertically
//       size: 12, // Font size
//       color: PDFLib.rgb(0, 0, 0),
//       rotate: PDFLib.degrees(90), // Black color
//     });

//     // Add text showing the width on the bottom side with additional space (20 points) on both sides
//     const textOnBottomSide = `Width: ${height}`;
    
//     const xCoordinateForWidthText = 595.276 / 2; // Center horizontally
//     page.drawText(textOnBottomSide, {
//       x: xCoordinateForWidthText, // Adjusted X-coordinate of the text (centered)
//       y: 20, // Y-coordinate of the text (bottom margin of A4 page)
//       size: 12, // Font size
//       color: PDFLib.rgb(0, 0, 0), // Black color
//     });

//     // Save the PDF as a Blob
//     const pdfBytes = await pdfDoc.save();

//     // Create a Blob URL for the PDF
//     const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));

//     // Trigger the download of the PDF
//     const a = document.createElement("a");
//     a.href = pdfUrl;
//     a.download = "machine_blueprint.pdf";
//     a.click();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// }

// // Call the generateBlueprintPDF function when the "Print to PDF" button is clicked
// document.getElementById("printToPdfButton").addEventListener("click", generateBlueprintPDF);