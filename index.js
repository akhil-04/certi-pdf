// import { saveAs } from './FileSaver';
// console.log("hello");



const generatePDF = async (name) => {
    const {PDFDocument, rgb}= PDFLib;
      const exBytes = await fetch("./certi.pdf").then((res)=> {
      return res.arrayBuffer();
      });

      //get font
    const exFont = await fetch("./Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
    );

    
  
    const pdfDoc = await PDFDocument.load(exBytes);

    pdfDoc.registerFontkit(fontkit);

    const myFont = await pdfDoc.embedFont(exFont); 
    
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

      firstPage.drawText(name,{
          x:300,
          y:270,
          size:58,
          font: myFont,
        color: rgb(0.2, 0.84, 0.67),
      })

    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    saveAs(uri,"Mavericks Society Certificate.pdf",{autoBom : true});


    window.open(uri)

    // document.querySelector("#mypdf").src = uri;
    };

    const submitBtn = document.getElementById("submitBtn");
    const inputVal = document.getElementById("name");
   


   

    submitBtn.addEventListener("click", () => {
        const val = inputVal.value;
        generatePDF(val);
    });
    
